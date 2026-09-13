import type { Metadata } from "next";
import Image from "next/image";

const TITLE = "Meet Our Ohana";
const FULL_TITLE = "Meet Our Ohana - Hawaii Dental Wellness";
const DESCRIPTION =
  "Meet the ohana behind Hawaii Dental Wellness, led by Dr. Chad Kawashima and Dr. Randal Motooka, bringing expert, compassionate dental care to Honolulu.";
const URL = "https://hawaiidentalwellness.com/meet-the-ohana";
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

export default function MeetTheOhanaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="ohana-hero">
        <div className="ohana-hero-bg"></div>
        <div className="ohana-hero-overlay"></div>
        <div className="ohana-hero-content">
          <div className="container">
            <h1 className="ohana-hero-title">
              Our Ohana,
              <br />
              Caring for Yours.
            </h1>
          </div>
        </div>
        <div className="ohana-hero-decoration">
          <svg viewBox="0 0 1440 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M0,55 C300,110 1140,0 1440,55 L1440,110 L0,110 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Intro Section */}
      <section className="ohana-intro">
        <div className="container">
          <div className="ohana-intro-inner">
            <h2 className="section-title">Where Expertise Meets Aloha</h2>
            <p className="ohana-intro-body">
              At Hawaii Dental Wellness, we believe that world-class dentistry is built on a foundation of trust and
              genuine connection. Our team is more than just a group of dental professionals — we are a family
              dedicated to yours. Led by Dr. Kawashima and Dr. Motooka, our practitioners combine decades of
              clinical experience with a deep-rooted love for the islands. We don&apos;t just treat teeth; we care
              for the people behind the smiles, ensuring every visit feels like coming home to Ohana.
            </p>
          </div>
        </div>
      </section>

      {/* Doctor Profiles Section */}
      <section className="ohana-doctors">
        <div className="team-decoration team-decoration-top">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title team-title">Meet the Experts</h2>
          </div>

          {/* Dr. Kawashima */}
          <div className="doctor-profile">
            <div className="doctor-portrait">
              <Image
                src="/images/Dr.-Chad-Kawashima-Portrait-940x400.jpg"
                alt="Dr. Chad Kawashima, DDS"
                width={940}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="doctor-bio">
              <div className="doctor-header">
                <h3>Dr. Chad Kawashima, DDS</h3>
                <p className="doctor-title">Founder &amp; Holistic Restorative Expert</p>
              </div>

              <div className="doctor-section">
                <h4>The Heart Behind the Practice</h4>
                <p>
                  With over 20 years of experience serving the Honolulu community, Dr. Kawashima founded Hawaii
                  Dental Wellness with a singular vision: to create a dental experience that feels like a breath of
                  fresh ocean air. He believes that dentistry is more than just fixing teeth; it&apos;s about
                  supporting the total well-being of every person who walks through our doors.
                </p>
              </div>

              <div className="doctor-section">
                <h4>Expertise &amp; Philosophy</h4>
                <p>
                  Dr. Kawashima is a leader in holistic and restorative dentistry, specializing in complex smile
                  makeovers and biocompatible treatments. His approach combines state-of-the-art technology with a
                  &quot;wellness-first&quot; philosophy, ensuring that every restoration is as healthy for the body
                  as it is beautiful for the smile.
                </p>
              </div>

              <div className="doctor-section">
                <h4>Outside the Office</h4>
                <p>
                  When he isn&apos;t helping patients achieve their best smiles, Dr. Kawashima enjoys spending time
                  with his family and embracing the island lifestyle. For him, &quot;Aloha&quot; isn&apos;t just a
                  slogan; it&apos;s a way of life that he brings to every patient interaction.
                </p>
              </div>

              <div className="doctor-specialties">
                <span className="specialty-tag">Holistic Dentistry</span>
                <span className="specialty-tag">Smile Makeovers</span>
                <span className="specialty-tag">Biocompatible Treatments</span>
                <span className="specialty-tag">Implants</span>
              </div>
            </div>
          </div>

          {/* Dr. Motooka */}
          <div className="doctor-profile doctor-profile-reverse">
            <div className="doctor-portrait">
              <Image
                src="/images/Dr.-Randal-Motooka-Portrait-940x400.jpg"
                alt="Dr. Randal Motooka, DDS"
                width={940}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="doctor-bio">
              <div className="doctor-header">
                <h3>Dr. Randal Motooka, DDS</h3>
                <p className="doctor-title">General &amp; Cosmetic Specialist</p>
              </div>

              <div className="doctor-section">
                <h4>A Passion for Precision</h4>
                <p>
                  Dr. Motooka brings a meticulous eye to the Hawaii Dental Wellness team. Known for his calming
                  chairside manner, he excels at making even the most nervous patients feel right at home. He is
                  dedicated to the idea that everyone — from Keiki to Kupuna — deserves a smile they are proud to
                  show off.
                </p>
              </div>

              <div className="doctor-section">
                <h4>Focus on Artistry</h4>
                <p>
                  With a deep focus on general and cosmetic dentistry, Dr. Motooka specializes in creating
                  natural-looking results that enhance each patient&apos;s unique features. He stays at the
                  forefront of dental innovation, ensuring our Ohana always has access to the most comfortable and
                  effective treatments available.
                </p>
              </div>

              <div className="doctor-section">
                <h4>Island Roots</h4>
                <p>
                  As a local practitioner, Dr. Motooka is deeply committed to giving back to the community that
                  raised him. He views his patients as neighbors and friends, treating every smile with the care and
                  respect it deserves.
                </p>
              </div>

              <div className="doctor-specialties">
                <span className="specialty-tag">General Dentistry</span>
                <span className="specialty-tag">Cosmetic Dentistry</span>
                <span className="specialty-tag">Restorative Care</span>
                <span className="specialty-tag">Implants</span>
              </div>
            </div>
          </div>
        </div>
        <div className="team-decoration team-decoration-bottom">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
      </section>

      {/* Staff Grid Section */}
      <section className="ohana-staff">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-description ohana-staff-sub">
              The hands and hearts that make your journey possible
            </p>
            <p className="ohana-staff-body">
              From the moment you step into our office, our dedicated team is here to ensure your visit is
              seamless, relaxing, and tailored to your needs. Our hygienists, assistants, and front-office
              specialists are more than just welcoming — they are the heart of our hospitality.
            </p>
          </div>
          <div className="staff-grid">
            <div className="staff-card">
              <div className="staff-card-inner">
                <div className="staff-avatar" style={{ background: "linear-gradient(135deg, #2AB3A6 0%, #004F59 100%)" }}>
                  <span aria-hidden="true">🦷</span>
                </div>
                <div className="staff-info">
                  <h4>Dental Hygienists</h4>
                  <p>Expert cleanings delivered with a gentle, caring touch.</p>
                </div>
              </div>
            </div>
            <div className="staff-card">
              <div className="staff-card-inner">
                <div className="staff-avatar" style={{ background: "linear-gradient(135deg, #FFD9C2 0%, #2AB3A6 100%)" }}>
                  <span aria-hidden="true">🩺</span>
                </div>
                <div className="staff-info">
                  <h4>Dental Assistants</h4>
                  <p>Skilled hands ensuring every procedure runs smoothly.</p>
                </div>
              </div>
            </div>
            <div className="staff-card">
              <div className="staff-card-inner">
                <div className="staff-avatar" style={{ background: "linear-gradient(135deg, #AAED8D 0%, #046436 100%)" }}>
                  <span aria-hidden="true">🌺</span>
                </div>
                <div className="staff-info">
                  <h4>Front Office Team</h4>
                  <p>Friendly faces ready to welcome and assist you from arrival.</p>
                </div>
              </div>
            </div>
            <div className="staff-card">
              <div className="staff-card-inner">
                <div className="staff-avatar" style={{ background: "linear-gradient(135deg, #004F59 0%, #2AB3A6 100%)" }}>
                  <span aria-hidden="true">💛</span>
                </div>
                <div className="staff-info">
                  <h4>Patient Care Coordinators</h4>
                  <p>Guiding you through every step of your dental journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
