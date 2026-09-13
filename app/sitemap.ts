import type { MetadataRoute } from "next";

const SITE_URL = "https://hawaiidentalwellness.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/meet-the-ohana`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/insights`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
