"use client";

import Link from "next/link";
import { useState } from "react";

interface AccordionItem {
  icon: JSX.Element;
  title: string;
  tagline: string;
  body: string;
  services: string[];
  ctaLabel: string;
}

const ITEMS: AccordionItem[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "General & Preventive Wellness",
    tagline: "The foundation of a lifelong, healthy smile.",
    body: "We believe the best dental care is proactive. Our general and preventive services are designed to protect your natural teeth and catch potential issues before they become problems. With gentle cleanings and comprehensive exams, we keep your smile bright, healthy, and feeling fresh.",
    services: [
      "Routine Ohana Exams & Gentle Cleanings",
      "Oral Cancer Screenings",
      "Fluoride & Protective Sealants",
      "Custom Night Guards",
    ],
    ctaLabel: "Schedule a Cleaning",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "Cosmetic Artistry",
    tagline: "Reveal your brightest smile.",
    body: "Your smile is your signature. If you're looking to enhance its natural beauty, our cosmetic treatments combine advanced dental artistry with personalized design. Whether you want a subtle refresh or a complete smile makeover, we tailor every detail so you can share your Aloha with total confidence.",
    services: [
      "Professional Teeth Whitening",
      "Custom Porcelain Veneers",
      "Aesthetic Bonding",
      "Complete Smile Makeovers",
    ],
    ctaLabel: "Book a Smile Consult",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Restorative Dentistry & Implants",
    tagline: "Rebuilding strength, function, and harmony.",
    body: "Life happens, and sometimes your smile needs a little extra support. Dr. Kawashima and Dr. Motooka utilize state-of-the-art technology and high-quality materials to seamlessly repair and replace damaged or missing teeth. We restore your smile's natural strength so you can eat, speak, and laugh without hesitation.",
    services: [
      "Precision Dental Implants",
      "Natural-Looking Crowns & Bridges",
      "Tooth-Colored Fillings",
      "Gentle Root Canal Therapy",
    ],
    ctaLabel: "Learn About Implants",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Keiki & Family Care",
    tagline: "Setting up the next generation for a lifetime of healthy habits.",
    body: "Going to the dentist should be a positive experience from the very first visit. We warmly welcome the youngest members of your Ohana, providing a fun, educational, and completely fear-free environment. Our gentle approach ensures your keiki actually look forward to taking care of their teeth.",
    services: [
      "First-Visit Acclimation",
      "Gentle Pediatric Cleanings",
      "Cavity Prevention & Education",
      "Growth & Development Monitoring",
    ],
    ctaLabel: "Book a Keiki Visit",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M2 12c0-3 2.5-6 5-7s5 1 5 1 2.5-2 5-1 5 4 5 7-2 7-5 8-5-1-5-1-2.5 2-5 1-5-5-5-8z" />
        <path d="M12 6v.01" />
        <path d="M6 12c0 2 1.5 4 3 5" />
      </svg>
    ),
    title: "Holistic Dentistry",
    tagline: "Caring for your smile, minding your whole-body health.",
    body: "Your oral health is deeply connected to your overall physical wellness. We take a holistic, biocompatible approach to your care, using safe materials and techniques that support your body's natural harmony. It's dentistry that respects the big picture of your well-being.",
    services: ["Biocompatible Materials", "Wellness-Focused Treatment Plans", "Safe Amalgam Removal"],
    ctaLabel: "Explore Holistic Care",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Emergency Relief",
    tagline: "Fast care when you need it most.",
    body: "Dental emergencies rarely happen on a convenient schedule. If you are experiencing sudden pain, a broken tooth, or any urgent dental issue, our team is here to provide immediate, calming relief. We prioritize getting you out of pain and back to enjoying your day as quickly as possible.",
    services: ["Same-Day Emergency Appointments", "Toothache Relief", "Repair for Chipped or Broken Teeth"],
    ctaLabel: "Get Emergency Help",
  },
];

export default function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="accordion">
      {ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div className={`accordion-item${isOpen ? " is-open" : ""}`} data-index={index} key={item.title}>
            <button
              className="accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <div className="accordion-trigger-left">
                <span className="accordion-icon">{item.icon}</span>
                <span className="accordion-title">{item.title}</span>
              </div>
              <span className="accordion-chevron">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
            <div
              className="accordion-panel"
              style={{ maxHeight: isOpen ? "1000px" : undefined }}
            >
              <div className="accordion-panel-inner">
                <p className="accordion-tagline">{item.tagline}</p>
                <p className="accordion-body">{item.body}</p>
                <ul className="accordion-services-list">
                  {item.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <Link href="/contact" className="accordion-cta">
                  {item.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
