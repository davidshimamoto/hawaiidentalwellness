import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import AppointmentForm from "@/components/AppointmentForm";
import OfficeCarousel from "@/components/OfficeCarousel";

const TITLE = "Hawaii Dental Wellness - Your Smile, Our Aloha";
const DESCRIPTION =
  "Hawaii Dental Wellness in Honolulu offers general, cosmetic, restorative, and preventive dentistry for the whole ohana. Schedule your appointment today.";
const URL = "https://hawaiidentalwellness.com/";
const IMAGE = "https://hawaiidentalwellness.com/images/hdw-staff2.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Hawaii Dental Wellness",
    images: [{ url: IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Hawaii Dental Wellness",
  image: "https://hawaiidentalwellness.com/images/hdw-staff2.png",
  url: "https://hawaiidentalwellness.com/",
  telephone: "+1-808-533-3892",
  email: "info@hawaiidentalwellness.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1139 Bethel St Suite 1A",
    addressLocality: "Honolulu",
    addressRegion: "HI",
    postalCode: "96813",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "13:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/hdwhonolulu",
    "https://www.yelp.com/biz/hawaii-dental-wellness-honolulu",
    "https://maps.app.goo.gl/icRtzYF4RaJkVBHw7",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">Aloha</span>{" "}
              <span className="title-line highlight">in every Smile!</span>
            </h1>
            <p className="hero-subtitle">
              Serving families from Keiki to Kupuna with advanced dentistry &amp; Aloha.
              <br /> Modern Care. Healthy Smiles. Local Roots.
            </p>
            <div className="hero-buttons">
              <Link href="/contact" className="btn btn-primary">
                Schedule Visit
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Best of both worlds</h2>
            <p className="section-description">
              Step into a space where your comfort comes first. At Hawaii Dental Wellness, we believe visiting the
              dentist should feel less like a clinical obligation and more like a moment of self-care. Led by Dr.
              Chad Kawashima and Dr. Randal Motooka, our practice combines state-of-the-art technology with the
              genuine warmth of Aloha. Your comfort and health are our top priorities.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M2 12c0-3 2.5-6 5-7s5 1 5 1 2.5-2 5-1 5 4 5 7-2 7-5 8-5-1-5-1-2.5 2-5 1-5-5-5-8z" />
                  <path d="M12 6v.01" />
                  <path d="M6 12c0 2 1.5 4 3 5" />
                </svg>
              </div>
              <h3>Calming Environment</h3>
              <p>Relax in our island-inspired office designed to put you at ease from the moment you arrive.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M12 5.5c-1.5-1.5-3.5-2-5-1.5S4 6.5 4 9c0 4 5.5 8 8 10.5C14.5 17 20 13 20 9c0-2.5-1-4-2.5-4.5s-3.5 0-5 1.5z" />
                  <path d="M12 5.5v4" />
                  <path d="M10 9.5h4" />
                </svg>
              </div>
              <h3>Holistic &amp; Modern</h3>
              <p>Cutting-edge technology and techniques for comprehensive dental wellness.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Custom Smile Plans</h3>
              <p>Every patient receives individualized care tailored to their unique needs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
                  <path d="M12 8v4l2 2" />
                  <path d="M9 2h6" />
                  <path d="M12 2v2" />
                </svg>
              </div>
              <h3>Ohana Care</h3>
              <p>Dental care for the whole ohana, from keiki to kupuna.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team">
        <div className="team-decoration team-decoration-top">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title team-title">Meet your dental care providers</h2>
            <p className="section-description">
              Our experienced doctors are dedicated to providing exceptional dental care with the warmth and aloha
              spirit Hawaii is known for.
            </p>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-image">
                <Image
                  src="/images/Dr.-Chad-Kawashima-Portrait-940x400.jpg"
                  alt="Dr. Chad Kawashima"
                  width={940}
                  height={400}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="team-content">
                <h3>Dr. Chad Kawashima</h3>
                <p className="team-role">General &amp; Cosmetic Dentist</p>
                <p className="team-bio">
                  Dr. Kawashima brings years of experience and a gentle touch to every procedure. His commitment to
                  patient comfort and holistic health has made him a trusted name in Hawaii dental care.
                </p>
                <div className="team-specialties">
                  <span className="specialty-tag">Holistic Dentistry</span>
                  <span className="specialty-tag">General Care</span>
                  <span className="specialty-tag">Implants</span>
                </div>
              </div>
            </div>
            <div className="team-card">
              <div className="team-image">
                <Image
                  src="/images/Dr.-Randal-Motooka-Portrait-940x400.jpg"
                  alt="Dr. Randal Motooka"
                  width={940}
                  height={400}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="team-content">
                <h3>Dr. Randal Motooka</h3>
                <p className="team-role">Restorative &amp; Family Dentist</p>
                <p className="team-bio">
                  Dr. Motooka specializes in implant, restorative, and cosmetic dentistry, ensuring that patients of
                  all ages receive comprehensive, compassionate dental treatment in a welcoming environment.
                </p>
                <div className="team-specialties">
                  <span className="specialty-tag">Implants</span>
                  <span className="specialty-tag">Restorative Care</span>
                  <span className="specialty-tag">Cosmetic Dentistry</span>
                </div>
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

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title">Expert hands, Island hearts</h2>
              <p className="about-text">
                At Hawaii Dental Wellness, we believe that going to the dentist should be a positive, relaxing
                experience. Our team combines years of expertise with the genuine warmth and aloha spirit that
                Hawaii is known for.
              </p>
              <p className="about-text">
                We&apos;ve created a practice that reflects the natural beauty and tranquility of our island home,
                ensuring every visit feels like a breath of fresh ocean air.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">Years of Service</div>
                </div>
                <div className="stat">
                  <div className="stat-number">5000+</div>
                  <div className="stat-label">Happy Patients</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Aloha Spirit</div>
                </div>
              </div>
            </div>
            <div className="about-image">
              <Image
                src="/images/hdw-staff2.png"
                alt="Office Staff"
                width={800}
                height={500}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Lifelong care for your entire Ohana</h2>
            <p className="section-description">
              From preventive care to cosmetic enhancements, we offer a full range of services to keep your smile
              bright.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-tile">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M12 2a5 5 0 0 1 5 5c0 2-1 3.5-2 4.5L12 14l-3-2.5C8 10.5 7 9 7 7a5 5 0 0 1 5-5z" />
                  <path d="M9 14l-1 8h8l-1-8" />
                  <path d="M8 18h8" />
                </svg>
              </div>
              <h3>General Dentistry</h3>
              <p>Regular checkups, cleanings, and preventive care to maintain optimal oral health.</p>
            </div>
            <div className="service-tile">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <h3>Cosmetic Dentistry</h3>
              <p>Transform your smile with our aesthetic dental services designed to boost your confidence.</p>
            </div>
            <div className="service-tile">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3>Restorative Care</h3>
              <p>Repair and restore your smile with advanced restorative procedures.</p>
            </div>
            <div className="service-tile">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3>Preventive Care</h3>
              <p>Proactive treatments to prevent dental issues before they start.</p>
            </div>
            <div className="service-tile">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Pediatric Dentistry</h3>
              <p>Gentle, fun dental visits for your keiki in a warm and welcoming environment.</p>
            </div>
            <div className="service-tile">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3>Emergency Care</h3>
              <p>Same-day relief when you need it most — we&apos;re here for unexpected dental issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Section */}
      <section id="office" className="office" hidden>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Office</h2>
            <p className="section-description">
              Take a look inside our welcoming, island-inspired practice in the heart of downtown Honolulu.
            </p>
          </div>
          <OfficeCarousel />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why our patients Smile</h2>
          </div>
          <div className="testimonials-grid">
            <div className="yelp-embed-card">
              <span className="yelp-review" data-review-id="GwelzFvEHlT-o6Cl7PFA_g" data-hostname="www.yelp.com">
                Read{" "}
                <a href="https://www.yelp.com/user_details?userid=1Y0yBmIbELWRRM2aYeDApQ" rel="nofollow noopener">
                  James John G.
                </a>
                &apos;s{" "}
                <a
                  href="https://www.yelp.com/biz/hawaii-dental-wellness-honolulu?hrid=GwelzFvEHlT-o6Cl7PFA_g"
                  rel="nofollow noopener"
                >
                  review
                </a>{" "}
                of{" "}
                <a href="https://www.yelp.com/biz/XsOSkbFNuG44eLREMoRnXg" rel="nofollow noopener">
                  Hawaii Dental Wellness
                </a>{" "}
                on <a href="https://www.yelp.com" rel="nofollow noopener">Yelp</a>
              </span>
            </div>
            <div className="google-review-card">
              <div className="google-review-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-label="Google" role="img">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="google-review-label">Google Review</span>
              </div>
              <div className="google-review-stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#FBBC05"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="google-review-text">
                &quot;I&apos;ve been a patient at Hawaii Dental Wellness for many years and I can&apos;t recommend
                them enough. Dr. Kawashima is trustworthy, caring, and highly competent. He takes the time to
                communicate thoroughly, and explain things in a way that is easy to understand. I appreciate that I
                feel listened to and have never felt pressured into unnecessary treatments.&quot;
              </p>
              <div className="google-review-author">Nathan Hall</div>
              <a
                href="https://maps.app.goo.gl/JB5kbjKpHotStmJa9"
                target="_blank"
                rel="noopener noreferrer"
                className="google-review-link"
              >
                Read full review on Google
              </a>
            </div>
          </div>
          <Script src="https://www.yelp.com/embed/widgets.js" strategy="afterInteractive" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">Visit Us Today</h2>
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
              <AppointmentForm idSuffix="home" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
