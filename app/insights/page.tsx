import type { Metadata } from "next";
import Link from "next/link";
import InsightsFilter from "@/components/InsightsFilter";

const TITLE = "Insights";
const FULL_TITLE = "Insights - Hawaii Dental Wellness";
const DESCRIPTION =
  "Dental health tips and insights from Hawaii Dental Wellness in Honolulu, covering oral care, treatments, and advice for the whole ohana.";
const URL = "https://hawaiidentalwellness.com/insights";
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

export default function InsightsPage() {
  return (
    <>
      {/* Page Hero (peach background) */}
      <section className="page-hero insights-hero">
        <div className="container">
          <h1 className="page-hero-title">Deepen Your Smile IQ</h1>
          <p className="page-hero-subtitle">
            From the latest clinical innovations to caring for your Keiki&apos;s first teeth.
          </p>
        </div>
        <div className="page-hero-decoration">
          <svg viewBox="0 0 1440 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M0,55 C300,110 1140,0 1440,55 L1440,110 L0,110 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Featured Article: What is Dental Wellness? */}
      <section className="insights-featured">
        <div className="container">
          <div className="featured-article">
            <div className="featured-label">Featured</div>
            <div className="featured-content">
              <div className="featured-text">
                <span className="featured-category-tag">Wellness</span>
                <h2>What is Dental Wellness?</h2>
                <p className="featured-byline">By Dr. Chad Kawashima</p>
                <p className="featured-body">
                  Dental wellness to me means treating the whole person and not just the teeth. It&apos;s about
                  preventive care and ensuring everything is balanced so you don&apos;t have problems down the
                  road. It means not only taking care of the mouth and teeth, but also taking care of the whole
                  person, as the mouth and teeth are connected and affect the rest of the body and overall health.
                  It also means taking care of the person mentally and emotionally, as a lot of people have
                  phobias about the dentist — making sure that we take care of that aspect as well.
                </p>
                <Link href="/contact" className="btn btn-primary">
                  Book a Consultation
                </Link>
              </div>
              <div className="featured-image-placeholder">
                <div className="featured-img-block">
                  <span>Dr. Kawashima</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category filter tabs + Blog Collection Section (static pillar cards) */}
      <InsightsFilter />
    </>
  );
}
