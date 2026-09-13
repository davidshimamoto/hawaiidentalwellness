import { NextRequest, NextResponse } from "next/server";

// TODO: Wire up real email delivery before production use.
//
// This route currently only validates the submission (mirroring the rules
// from the legacy send-appointment.php) and logs it to the server console.
// No email is actually sent yet. To complete this:
//
//   1. Choose an email provider/service (e.g. Resend - https://resend.com,
//      Postmark, SendGrid, or AWS SES).
//   2. Install its SDK (e.g. `npm install resend`) and add the API key as a
//      Vercel/Next.js environment variable (e.g. RESEND_API_KEY).
//   3. In the try block below, send two emails:
//        - Notification to the practice, from "appointments@hawaiidentalwellness.com"
//          to "info@hawaiidentalwellness.com" (the legacy PHP script also
//          Bcc'd hidentalwellness@gmail.com — confirm with the practice
//          whether that Bcc should be kept).
//        - Confirmation email to the patient's submitted email address, also
//          from "appointments@hawaiidentalwellness.com".
//      See send-appointment.php in the repo root for the original HTML email
//      templates/copy if you want to preserve that exact wording/branding.
//   4. Return the same { success, message, errors? } JSON shape this route
//      already returns so the frontend (components/AppointmentForm.tsx)
//      doesn't need to change.

const VALID_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const VALID_TIMES = ["Morning", "Afternoon"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return value.trim();
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

  // TODO: send the actual emails here once a provider is wired up (see the
  // TODO block at the top of this file). For now, just log the submission.
  console.log("New appointment request:", {
    name,
    email,
    phone,
    service,
    preferredDay,
    preferredTime,
    message,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json(
    {
      success: true,
      message: "Thank you for your appointment request! We will contact you within 24 hours. Mahalo!",
    },
    { status: 200 }
  );
}
