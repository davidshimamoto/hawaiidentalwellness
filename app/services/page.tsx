import type { Metadata } from "next";
import ServicesAccordion from "@/components/ServicesAccordion";

const TITLE = "Our Services";
const FULL_TITLE = "Our Services - Hawaii Dental Wellness";
const DESCRIPTION =
  "Explore our dental services in Honolulu: general dentistry, cosmetic dentistry, restorative care, preventive care, pediatric dentistry, and emergency care.";
const URL = "https://hawaiidentalwellness.com/services";
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

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="services-hero-bg"></div>
        <div className="services-hero-content">
          <div className="container">
            <h1 className="services-hero-title">
              Complete Care
              <br />
              for Every Smile
            </h1>
          </div>
        </div>
        <div className="services-hero-decoration">
          <svg viewBox="0 0 1440 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M0,55 C300,110 1140,0 1440,55 L1440,110 L0,110 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Services Intro Section */}
      <section className="services-intro">
        <div className="container">
          <div className="services-intro-inner">
            <h2 className="services-intro-title">A New Standard of Dental Wellness</h2>
            <p className="services-intro-body">
              At Hawaii Dental Wellness, we believe a healthy smile is the foundation for your overall well-being.
              From your child&apos;s first checkup to advanced restorative implants and cosmetic makeovers, our
              comprehensive services are thoughtfully designed to support your entire Ohana at every stage of life.
              We blend state-of-the-art dental technology with the calming Aloha spirit, ensuring that every
              treatment not only enhances your smile, but also elevates your peace of mind.
            </p>
          </div>
        </div>
        <div className="services-intro-divider">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#2AB3A6" opacity="0.18" />
            <path d="M0,28 C480,8 960,40 1440,28 L1440,40 L0,40 Z" fill="#2AB3A6" opacity="0.12" />
          </svg>
        </div>
      </section>

      {/* Services Accordion Section */}
      <section className="services-accordion-section">
        <div className="container">
          <ServicesAccordion />
        </div>
      </section>
    </>
  );
}
