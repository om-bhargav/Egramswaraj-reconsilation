import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

const DEFAULT_TAKE = 50;
const MAX_TAKE = 200;

function parseCount(value: string | null, fallback: number, max: number) {
  if (value === null || value.trim() === "") return fallback;

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return Math.min(Math.trunc(parsed), max);
}

/**
 * Admin: list the contact requests, newest first.
 *
 * Query parameters:
 *   status  "new" | "replied"  — omit for everything
 *   take    how many to return (default 50, max 200)
 *   skip    how many to skip, for paging
 *
 * TODO: this is open to anyone until admin sessions exist — gate it once the
 * Admin table is actually used to sign in.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const status = params.get("status");

  if (status && status !== "new" && status !== "replied") {
    return Response.json(
      { success: false, message: "status must be 'new' or 'replied'" },
      { status: 400 },
    );
  }

  const where = status ? { replied: status === "replied" } : {};
  const take = parseCount(params.get("take"), DEFAULT_TAKE, MAX_TAKE);
  const skip = parseCount(params.get("skip"), 0, Number.MAX_SAFE_INTEGER);

  try {
    // Screenshots come back inline as base64 data URLs, which is fine at this
    // volume. Serve them from their own endpoint if the payload gets heavy.
    const [requests, total, newCount] = await Promise.all([
      prisma.contactRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take,
        skip,
      }),
      prisma.contactRequest.count({ where }),
      prisma.contactRequest.count({ where: { replied: false } }),
    ]);

    return Response.json({ success: true, total, newCount, requests });
  } catch (error) {
    console.error("[admin/requests] could not read the requests", error);
    return Response.json(
      { success: false, message: "Could not load the requests" },
      { status: 500 },
    );
  }
}
