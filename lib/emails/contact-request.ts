import { SITE_NAME } from "@/config";

/**
 * Notification sent to each admin when a contact request arrives.
 *
 * Everything is a table with inline styles on purpose: email clients strip
 * <style> blocks, ignore flex and grid, and reset margins unpredictably, so the
 * layout has to be carried by attributes and inline CSS.
 */
export type ContactRequestEmailData = {
  /** Name of the admin this copy is addressed to. */
  adminName: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  imageUrl?: string | null;
  createdAt: Date;
  /** Link to the requests page, when the origin is known. */
  dashboardUrl?: string;
};

/** The message is shortened — the full text lives on the requests page. */
const MESSAGE_PREVIEW_LIMIT = 500;

const NAVY = "#1B2B45";
const INK = "#1E2733";
const SUBTLE = "#5A6472";
const FAINT = "#848C97";
const LINE = "#E1E4E0";
const PAPER = "#F7F8F6";
const GREEN = "#3D6B4F";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatReceived(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function shorten(message: string) {
  const collapsed = message.trim();

  return collapsed.length > MESSAGE_PREVIEW_LIMIT
    ? `${collapsed.slice(0, MESSAGE_PREVIEW_LIMIT).trimEnd()}…`
    : collapsed;
}

/** One label/value line inside the details table. */
function detailRow(label: string, valueHtml: string, isLast = false) {
  const border = isLast ? "none" : `1px solid ${LINE}`;

  return `
    <tr>
      <td style="padding:12px 0;border-bottom:${border};font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${SUBTLE};vertical-align:top;width:110px;">${label}</td>
      <td style="padding:12px 0;border-bottom:${border};font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${INK};vertical-align:top;">${valueHtml}</td>
    </tr>`;
}

export function contactRequestEmail(data: ContactRequestEmailData) {
  const adminName = escapeHtml(data.adminName.trim() || "there");
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone);
  const received = formatReceived(data.createdAt);
  const preview = shorten(data.message);
  const messageHtml = escapeHtml(preview).replace(/\r?\n/g, "<br />");

  const subject = `New contact request from ${data.name}`;

  const screenshotRow = data.imageUrl
    ? detailRow(
        "Screenshot",
        `<a href="${escapeHtml(data.imageUrl)}" style="color:${GREEN};text-decoration:underline;">Open the attached image</a>`,
      )
    : "";

  const dashboardButton = data.dashboardUrl
    ? `
              <tr>
                <td style="padding:24px 0 0 0;">
                  <a href="${escapeHtml(data.dashboardUrl)}" style="display:inline-block;background-color:${NAVY};color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:6px;">Open the requests page</a>
                </td>
              </tr>`
    : "";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${PAPER};">
    <div style="display:none;font-size:1px;color:${PAPER};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${name} sent a request through the contact form.</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PAPER};padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background-color:#FFFFFF;border:1px solid ${LINE};border-radius:10px;">
            <!-- header -->
            <tr>
              <td style="padding:22px 28px;background-color:${NAVY};border-radius:10px 10px 0 0;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9FC2AB;">New contact request</p>
                <p style="margin:6px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:#FFFFFF;">${escapeHtml(SITE_NAME)}</p>
              </td>
            </tr>

            <!-- body -->
            <tr>
              <td style="padding:28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${INK};line-height:1.6;">
                      <p style="margin:0 0 14px 0;">Hello ${adminName},</p>
                      <p style="margin:0;color:${SUBTLE};">Someone has just sent a request through the contact form. The details are below.</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:22px 0 0 0;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${LINE};">
                        ${detailRow("Name", name)}
                        ${detailRow("Email", `<a href="mailto:${email}" style="color:${GREEN};text-decoration:underline;">${email}</a>`)}
                        ${detailRow("Phone", `<a href="tel:${phone}" style="color:${GREEN};text-decoration:underline;">${phone}</a>`)}
                        ${detailRow("Received", escapeHtml(received))}
                        ${screenshotRow}
                        ${detailRow("Message", `<span style="color:${INK};">${messageHtml}</span>`, true)}
                      </table>
                    </td>
                  </tr>
                  ${dashboardButton}
                </table>
              </td>
            </tr>

            <!-- footer -->
            <tr>
              <td style="padding:18px 28px;background-color:${PAPER};border-top:1px solid ${LINE};border-radius:0 0 10px 10px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${FAINT};">Request ${escapeHtml(data.id)} · sent automatically by ${escapeHtml(SITE_NAME)}. Reply straight to ${email} to answer the sender.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `Hello ${data.adminName.trim() || "there"},`,
    "",
    "Someone has just sent a request through the contact form.",
    "",
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    `Phone:    ${data.phone}`,
    `Received: ${received}`,
    ...(data.imageUrl ? [`Screenshot: ${data.imageUrl}`] : []),
    "",
    "Message:",
    preview,
    "",
    ...(data.dashboardUrl ? [`Requests page: ${data.dashboardUrl}`, ""] : []),
    `Request ${data.id} · sent automatically by ${SITE_NAME}.`,
  ].join("\n");

  return { subject, html, text };
}
