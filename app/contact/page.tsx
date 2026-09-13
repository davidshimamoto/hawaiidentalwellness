import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";

const TITLE = "Contact";
const FULL_TITLE = "Contact - Hawaii Dental Wellness";
const DESCRIPTION =
  "Contact Hawaii Dental Wellness in Honolulu, HI to book an appointment. Call (808) 533-3892 or request a visit online — we'll get back to you within 24 hours.";
const URL = "https://hawaiidentalwellness.com/contact";
const IMAGE = "https://hawaiidentalwellness.com/images/hdw-staff2.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
  },
  openGraph: {
    type: "website",
    title: FULL_TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Hawaii Dental Wellness",
    images: [{ url: IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: FULL_TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero contact-hero">
        <div className="container">
          <h1 className="page-hero-title">Visit Us Today</h1>
          <p className="page-hero-subtitle">
            Ready to experience dental care with Aloha? We&apos;d love to welcome you to our practice.
          </p>
        </div>
        <div className="page-hero-decoration">
          <svg viewBox="0 0 1440 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M0,55 C300,110 1140,0 1440,55 L1440,110 L0,110 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">Get In Touch</h2>
              <p className="contact-text">
                Ready to experience dental care with Aloha? We&apos;d love to welcome you to our practice.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon" aria-hidden="true">
                    📍
                  </div>
                  <div className="contact-detail">
                    <h4>Location</h4>
                    <p>
                      1139 Bethel St Suite 1A
                      <br />
                      Honolulu, HI 96813
                    </p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon" aria-hidden="true">
                    📞
                  </div>
                  <div className="contact-detail">
                    <h4>Phone</h4>
                    <p>(808) 533-3892</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon" aria-hidden="true">
                    ⏰
                  </div>
                  <div className="contact-detail">
                    <h4>Hours</h4>
                    <p>
                      Monday - Friday: 8am - 5pm
                      <br />
                      Saturday: 8am - 1pm
                    </p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon" aria-hidden="true">
                    ✉️
                  </div>
                  <div className="contact-detail">
                    <h4>Email</h4>
                    <p>info@hawaiidentalwellness.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper">
              <AppointmentForm idSuffix="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
