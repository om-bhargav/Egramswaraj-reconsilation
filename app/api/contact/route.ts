import { NextRequest } from "next/server";

import { isCloudinaryConfigured, uploadImage } from "@/lib/cloudinary";
import {
  contactRequestEmail,
  type ContactRequestEmailData,
} from "@/lib/emails/contact-request";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/transporter";

/** The Cloudinary SDK needs Node APIs, so keep this off the edge runtime. */
export const runtime = "nodejs";

/** Matches the 5 MB cap the contact form validates against. */
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const LIMITS = {
  name: 120,
  email: 200,
  phone: 20,
  message: 5000,
} as const;

type Fields = {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** The picked file, still unread — it is only uploaded once the rest validates. */
  screenshot: File | null;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function bad(message: string, status = 400) {
  return Response.json({ success: false, message }, { status });
}

/**
 * Reads the submission from either a multipart form (the shape the contact page
 * sends when a screenshot is attached) or a plain JSON body.
 */
async function readFields(
  request: NextRequest,
): Promise<{ fields: Fields } | { error: string }> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();

    // The form calls the field `screenshot`; `image` is accepted as well so an
    // older client keeps working.
    const picked = form.get("screenshot") ?? form.get("image");
    let screenshot: File | null = null;

    // A file part is anything that is not a plain string. `instanceof File` is
    // avoided here because the runtime may hand back a Blob from another realm.
    if (picked !== null && typeof picked !== "string" && picked.size > 0) {
      if (!picked.type.startsWith("image/")) {
        return { error: "The attachment must be an image" };
      }
      if (picked.size > MAX_IMAGE_BYTES) {
        return { error: "The image must be 5 MB or smaller" };
      }

      screenshot = picked as File;
    }

    return {
      fields: {
        name: asString(form.get("name")),
        email: asString(form.get("email")),
        phone: asString(form.get("phone")),
        message: asString(form.get("message")),
        screenshot,
      },
    };
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return { error: "Invalid JSON body" };
  }

  return {
    fields: {
      name: asString(body.name),
      email: asString(body.email),
      phone: asString(body.phone),
      message: asString(body.message),
      screenshot: null,
    },
  };
}

/**
 * Emails every admin in the Admin table about a new request, each copy
 * addressed to that admin by name.
 *
 * Failures are logged and swallowed: the request is already saved, so a mail
 * problem must not turn into an error for the person who sent it.
 */
async function notifyAdmins(data: Omit<ContactRequestEmailData, "adminName">) {
  try {
    const admins = await prisma.admin.findMany({
      select: { name: true, email: true },
    });

    if (admins.length === 0) {
      console.warn("[contact] the Admin table is empty, nobody was emailed");
      return;
    }

    const results = await Promise.allSettled(
      admins.map(async (admin) => {
        const { subject, html, text } = contactRequestEmail({
          ...data,
          adminName: admin.name,
        });

        const sent = await sendMail({ to: admin.email, subject, html, text });

        if (!sent.success) {
          throw sent.error ?? new Error("sendMail reported a failure");
        }
      }),
    );

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(
          `[contact] could not email ${admins[index].email}`,
          result.reason,
        );
      }
    });
  } catch (error) {
    console.error("[contact] could not send the admin notifications", error);
  }
}

/** Public: save a message sent from the contact form. */
export async function POST(request: NextRequest) {
  const result = await readFields(request);

  if ("error" in result) {
    return bad(result.error);
  }

  const { name, email, phone, message, screenshot } = result.fields;

  if (!name || !email || !phone || !message) {
    return bad("Name, email, phone number and message are all required");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad("Enter a valid email address");
  }

  for (const [field, limit] of Object.entries(LIMITS)) {
    if (result.fields[field as keyof typeof LIMITS].length > limit) {
      return bad(`The ${field} is too long (limit ${limit} characters)`);
    }
  }

  // Only the URL and the public id are kept — the bytes live in Cloudinary.
  let imageUrl: string | null = null;
  let imagePublicId: string | null = null;
  let imageName: string | null = null;

  if (screenshot) {
    if (!isCloudinaryConfigured) {
      console.error(
        "[contact] a screenshot was sent but Cloudinary is not configured",
      );
      return bad("Image uploads are not configured on the server", 500);
    }

    try {
      const uploaded = await uploadImage(screenshot);
      imageUrl = uploaded.url;
      imagePublicId = uploaded.publicId;
      imageName = screenshot.name || "screenshot";
    } catch (error) {
      console.error("[contact] could not upload the screenshot", error);
      return bad("Could not upload the screenshot, please try again", 502);
    }
  }

  try {
    const created = await prisma.contactRequest.create({
      data: { name, email, phone, message, imageUrl, imagePublicId, imageName },
      select: { id: true, createdAt: true, imageUrl: true },
    });

    await notifyAdmins({
      id: created.id,
      name,
      email,
      phone,
      message,
      imageUrl,
      createdAt: created.createdAt,
      dashboardUrl: new URL("/admin/requests", request.url).toString(),
    });

    return Response.json(
      {
        success: true,
        message: "Your request has been received",
        request: created,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[contact] could not save the request", error);
    return bad("Could not save your request, please try again", 500);
  }
}
