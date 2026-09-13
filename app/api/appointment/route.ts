import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Requires RESEND_API_KEY to be set (Vercel project settings, or .env.local
// for local testing). Sign up at https://resend.com and verify the
// hawaiidentalwellness.com domain before sending in production.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = "Hawaii Dental Wellness Appointments <appointments@hawaiidentalwellness.com>";
const CONFIRMATION_FROM_EMAIL = "Hawaii Dental Wellness <appointments@hawaiidentalwellness.com>";

// Only the real production deployment (custom domain, VERCEL_ENV="production")
// notifies the practice's Gmail. Preview deployments and local dev always
// notify info@ only, so testing never pages the office's real inbox.
const IS_PRODUCTION = process.env.VERCEL_ENV === "production";
const NOTIFY_TO = ["info@hawaiidentalwellness.com"];
const NOTIFY_BCC = IS_PRODUCTION ? ["hidentalwellness@gmail.com"] : undefined;

const VALID_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const VALID_TIMES = ["Morning", "Afternoon"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function notificationEmailHtml(fields: {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
}): string {
  const { name, email, phone, service, preferredDay, preferredTime, message } = fields;
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "Pacific/Honolulu",
    dateStyle: "long",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; }
        .field-label { font-weight: bold; color: #0ea5e9; margin-bottom: 5px; }
        .field-value { background: white; padding: 10px 15px; border-left: 3px solid #0ea5e9; border-radius: 5px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 14px; }
        .priority { background: #fef3c7; padding: 15px; border-left: 4px solid #fb923c; margin: 20px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🦷 New Appointment Request</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Hawaii Dental Wellness</p>
        </div>
        <div class="content">
            <div class="priority">
                <strong>⚠️ Action Required:</strong> New appointment request received. Please respond within 24 hours.
            </div>

            <div class="field">
                <div class="field-label">👤 Patient Name</div>
                <div class="field-value">${escapeHtml(name)}</div>
            </div>

            <div class="field">
                <div class="field-label">📧 Email Address</div>
                <div class="field-value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
            </div>

            <div class="field">
                <div class="field-label">📞 Phone Number</div>
                <div class="field-value"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></div>
            </div>

            <div class="field">
                <div class="field-label">🏥 Service Requested</div>
                <div class="field-value">${escapeHtml(service)}</div>
            </div>

            <div class="field">
                <div class="field-label">📅 Preferred Day</div>
                <div class="field-value">${escapeHtml(preferredDay)}</div>
            </div>

            <div class="field">
                <div class="field-label">🕐 Preferred Time</div>
                <div class="field-value">${escapeHtml(preferredTime)}</div>
            </div>

            <div class="field">
                <div class="field-label">💬 Additional Message</div>
                <div class="field-value">${escapeHtml(message).replace(/\n/g, "<br>")}</div>
            </div>

            <div class="footer">
                <p><strong>Submitted:</strong> ${submittedAt} HST</p>
                <p style="margin-top: 10px;">This appointment request was submitted through the Hawaii Dental Wellness website contact form.</p>
                <p style="margin-top: 5px;">Please contact the patient within 24 hours to schedule their appointment.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}

function notificationEmailText(fields: {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
}): string {
  const { name, email, phone, service, preferredDay, preferredTime, message } = fields;
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "Pacific/Honolulu",
    dateStyle: "long",
    timeStyle: "short",
  });

  return `NEW APPOINTMENT REQUEST
Hawaii Dental Wellness
==================================================

PATIENT INFORMATION:
Name: ${name}
Email: ${email}
Phone: ${phone}
Service Requested: ${service}
Preferred Day: ${preferredDay}
Preferred Time: ${preferredTime}

MESSAGE:
${message}

==================================================
Submitted: ${submittedAt} HST

This appointment request was submitted through the
Hawaii Dental Wellness website contact form.
Please contact the patient within 24 hours.`;
}

function confirmationEmailHtml(fields: {
  name: string;
  service: string;
  preferredDay: string;
  preferredTime: string;
}): string {
  const { name, service, preferredDay, preferredTime } = fields;

  return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🌺 Mahalo, ${escapeHtml(name)}!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Hawaii Dental Wellness</p>
        </div>
        <div class="content">
            <p>Thank you for your appointment request for <strong>${escapeHtml(service)}</strong>.</p>

            <p>We have received your preference for a <strong>${escapeHtml(preferredTime)}</strong> appointment on <strong>${escapeHtml(preferredDay)}</strong> and will contact you within 24 hours to confirm your appointment.</p>

            <div style="background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #0ea5e9; border-radius: 5px;">
                <p style="margin: 0;"><strong>📍 Our Location:</strong></p>
                <p style="margin: 5px 0;">1139 Bethel St Suite 1A<br>Honolulu, HI 96813</p>

                <p style="margin: 15px 0 0 0;"><strong>📞 Phone:</strong></p>
                <p style="margin: 5px 0;">(808) 533-3892</p>

                <p style="margin: 15px 0 0 0;"><strong>⏰ Hours:</strong></p>
                <p style="margin: 5px 0;">Monday - Friday: 8am - 5pm<br>Saturday: 8am - 1pm</p>
            </div>

            <p>If you have any immediate questions or need to reach us sooner, please call us at <a href="tel:8085333892">(808) 533-3892</a>.</p>

            <div class="footer">
                <p>Your Smile, Our Aloha 🌺</p>
                <p style="margin-top: 5px;">Hawaii Dental Wellness</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid form submission." },
      { status: 400 }
    );
  }

  // Honeypot field for spam protection — if filled, silently pretend success
  // failed without revealing why, matching send-appointment.php's behavior.
  const honeypot = sanitize(formData.get("website"));
  if (honeypot) {
    return NextResponse.json(
      { success: false, message: "Spam detected" },
      { status: 200 }
    );
  }

  const name = sanitize(formData.get("name"));
  const email = sanitize(formData.get("email"));
  const phone = sanitize(formData.get("phone"));
  const service = sanitize(formData.get("service"));
  const preferredDay = sanitize(formData.get("preferred_day"));
  const preferredTime = sanitize(formData.get("preferred_time"));
  const message = sanitize(formData.get("message")) || "No additional message provided";

  const errors: string[] = [];

  if (!name) {
    errors.push("Name is required");
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push("Valid email is required");
  }

  if (!phone) {
    errors.push("Phone number is required");
  }

  if (!service) {
    errors.push("Service selection is required");
  }

  if (!preferredDay || !VALID_DAYS.includes(preferredDay)) {
    errors.push("Preferred day is required");
  }

  if (!preferredTime || !VALID_TIMES.includes(preferredTime)) {
    errors.push("Preferred time is required");
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { success: false, message: "Validation failed", errors },
      { status: 400 }
    );
  }

  if (!resend) {
    console.error(
      "RESEND_API_KEY is not set — appointment email was not sent. Submission:",
      { name, email, phone, service, preferredDay, preferredTime, message }
    );
    return NextResponse.json(
      {
        success: false,
        message: "There was an error sending your request. Please call us at (808) 533-3892.",
      },
      { status: 500 }
    );
  }

  const fields = { name, email, phone, service, preferredDay, preferredTime, message };

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_TO,
      bcc: NOTIFY_BCC,
      replyTo: `${name} <${email}>`,
      subject: `New Appointment Request from ${name}`,
      html: notificationEmailHtml(fields),
      text: notificationEmailText(fields),
    });

    if (error) {
      throw error;
    }
  } catch (err) {
    console.error("Failed to send appointment notification email:", err);
    return NextResponse.json(
      {
        success: false,
        message: "There was an error sending your request. Please call us at (808) 533-3892.",
      },
      { status: 500 }
    );
  }

  // Best-effort patient confirmation — if this fails, the practice still
  // received the notification above, so the request itself succeeded.
  try {
    await resend.emails.send({
      from: CONFIRMATION_FROM_EMAIL,
      to: [email],
      subject: "Appointment Request Received - Hawaii Dental Wellness",
      html: confirmationEmailHtml({ name, service, preferredDay, preferredTime }),
    });
  } catch (err) {
    console.error("Failed to send patient confirmation email:", err);
  }

  return NextResponse.json(
    {
      success: true,
      message: "Thank you for your appointment request! We will contact you within 24 hours. Mahalo!",
    },
    { status: 200 }
  );
}
