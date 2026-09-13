"use client";

import { useState } from "react";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "technology", label: "Technology" },
  { key: "tips", label: "Tips" },
  { key: "news", label: "News" },
];

const PILLARS = [
  {
    category: "technology",
    label: "Technology",
    background: "linear-gradient(135deg, #2AB3A6 0%, #004F59 100%)",
    title: "Modern Tools for Healthier Smiles",
    body: "Discover how cutting-edge technology is transforming the dental experience at Hawaii Dental Wellness.",
  },
  {
    category: "tips",
    label: "Tips",
    background: "linear-gradient(135deg, #FFD9C2 0%, #2AB3A6 100%)",
    title: "Daily Habits for a Lifetime of Wellness",
    body: "Simple, effective tips from our doctors to help you and your Ohana maintain optimal oral health every day.",
  },
  {
    category: "news",
    label: "News",
    background: "linear-gradient(135deg, #AAED8D 0%, #046436 100%)",
    title: "From Our Practice to Your Inbox",
    body: "Stay up to date with the latest news, events, and announcements from Hawaii Dental Wellness.",
  },
];

/**
 * Category filter tabs + static "coming soon" pillar cards, ported from the
 * inline script block in insights.html. The original also attempted to load
 * blog posts from an external RSS feed via a CORS proxy (script.js's
 * fetchBlogPosts/renderBlogPosts) and fell back to these static cards if the
 * feed failed. Since that RSS integration depends on a third-party proxy and
 * an external WordPress blog subdomain that isn't part of this port's scope,
 * we render the static "Coming Soon" pillar cards directly, matching the
 * fallback UI patients would see in the vast majority of cases anyway.
 */
export default function InsightsFilter() {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <section className="insights-filter-bar">
        <div className="container">
          <div className="filter-tabs" role="group" aria-label="Filter articles by category">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`filter-tab${filter === f.key ? " active" : ""}`}
                data-filter={f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="insights-collection">
        <div className="collection-wave-top">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M0,30 C360,0 1080,60 1440,30 L1440,0 L0,0 Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title collection-title">The Dental Wellness Collection</h2>
          </div>
          <div className="blog-pillars-grid">
            {PILLARS.filter((p) => filter === "all" || p.category === filter).map((pillar) => (
              <div className="pillar-card" data-category={pillar.category} key={pillar.title}>
                <div className="pillar-card-image" style={{ background: pillar.background }}>
                  <span className="pillar-category-badge">{pillar.label}</span>
                </div>
                <div className="pillar-card-content">
                  <p className="pillar-meta">Coming Soon</p>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                  <span className="pillar-read-more">Read More</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="collection-wave-bottom">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>
    </>
  );
}
