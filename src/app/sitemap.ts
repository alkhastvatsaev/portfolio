import type { MetadataRoute } from "next";

const baseUrl = "https://portfolio-github-alkhast-vatsaev.vercel.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/resume`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fr`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fr/resume`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
