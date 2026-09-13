"use client";

import { FormEvent, useState } from "react";

interface AppointmentFormProps {
  /** Suffix appended to field ids/names so multiple instances of the form can
   * appear on the same page without id collisions (mirrors the original
   * `name-home` / `name-contact` pattern). */
  idSuffix?: string;
}

type FormStatus =
  | { state: "idle" }
  | { state: "success"; message: string }
  | { state: "error"; message: string; errors?: string[] };

export default function AppointmentForm({ idSuffix = "form" }: AppointmentFormProps) {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });
  const [submitting, setSubmitting] = useState(false);

  const id = (base: string) => `${base}-${idSuffix}`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    setSubmitting(true);
    setStatus({ state: "idle" });

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ state: "success", message: result.message });
        form.reset();
        setTimeout(() => {
          setStatus({ state: "idle" });
        }, 10000);
      } else {
        setStatus({
          state: "error",
          message: result.message,
          errors: result.errors,
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        state: "error",
        message:
          "There was a problem submitting your request. Please call us at (808) 533-3892 or email info@hawaiidentalwellness.com",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form" id={id("appointment-form")} onSubmit={handleSubmit}>
      <h3>Book an Appointment</h3>
      <p>Input your information below and we&apos;ll get back to you.</p>

      <div className="form-group">
        <label htmlFor={id("name")}>Your Name</label>
        <input type="text" id={id("name")} name="name" placeholder="Your Name" required aria-required="true" />
      </div>

      <div className="form-group">
        <label htmlFor={id("email")}>Your Email</label>
        <input type="email" id={id("email")} name="email" placeholder="Your Email" required aria-required="true" />
      </div>

      <div className="form-group">
        <label htmlFor={id("phone")}>Your Phone</label>
        <input type="tel" id={id("phone")} name="phone" placeholder="Your Phone" required aria-required="true" />
      </div>

      <div className="form-group">
        <label htmlFor={id("service")}>Select Service</label>
        <select id={id("service")} name="service" required aria-required="true" defaultValue="">
          <option value="">Select Service</option>
          <option value="New Patient">New Patient</option>
          <option value="Routine Cleaning">Routine Cleaning</option>
          <option value="Emergency">Emergency</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor={id("preferred-day")}>Preferred Day</label>
        <select id={id("preferred-day")} name="preferred_day" required aria-required="true" defaultValue="">
          <option value="">Preferred Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor={id("preferred-time")}>Preferred Time</label>
        <select id={id("preferred-time")} name="preferred_time" required aria-required="true" defaultValue="">
          <option value="">Preferred Time</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor={id("message")}>Message (Optional)</label>
        <textarea id={id("message")} name="message" placeholder="Message (Optional)" rows={4}></textarea>
      </div>

      {/* Honeypot field for spam protection (hidden from users) */}
      <div className="form-group" style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary btn-full" id={id("submit-btn")} disabled={submitting}>
        {submitting ? "Sending..." : "Send Request"}
      </button>

      {status.state !== "idle" && (
        <div
          id={id("form-message")}
          role="alert"
          aria-live="polite"
          style={{
            marginTop: 15,
            padding: 15,
            borderRadius: 8,
            display: "block",
            background: status.state === "success" ? "#e0f5f3" : "#fee2e2",
            color: status.state === "success" ? "#004F59" : "#991b1b",
            border: status.state === "success" ? "2px solid #2AB3A6" : "2px solid #ef4444",
          }}
        >
          {status.state === "success" ? (
            <>
              <strong>&#10003; Success!</strong>
              <br />
              {status.message}
            </>
          ) : (
            <>
              <strong>&#10007; Error</strong>
              <br />
              {status.message}
              {status.errors && status.errors.length > 0 && (
                <>
                  <br />
                  <br />
                  {status.errors.map((err, i) => (
                    <span key={err}>
                      {err}
                      {i < status.errors!.length - 1 && <br />}
                    </span>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}
    </form>
  );
}
