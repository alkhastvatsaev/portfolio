import type { MetadataRoute } from "next";

const baseUrl = "https://alkhastvatsaev.dev";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: "2026-07-18",
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: baseUrl,
          fr: `${baseUrl}/fr`,
          "x-default": baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: "2026-07-18",
      changeFrequency: "monthly",
      priority: 0.95,
      alternates: {
        languages: {
          en: baseUrl,
          fr: `${baseUrl}/fr`,
          "x-default": baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/fr/developpeur-full-stack`,
      lastModified: "2026-07-18",
      changeFrequency: "monthly",
      priority: 0.95,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/developpeur-full-stack`,
          en: baseUrl,
          "x-default": baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: "2026-07-18",
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/resume`,
          fr: `${baseUrl}/fr/resume`,
          "x-default": `${baseUrl}/resume`,
        },
      },
    },
    {
      url: `${baseUrl}/fr/resume`,
      lastModified: "2026-07-18",
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/resume`,
          fr: `${baseUrl}/fr/resume`,
          "x-default": `${baseUrl}/resume`,
        },
      },
    },
  ];
}
