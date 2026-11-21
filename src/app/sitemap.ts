import type { MetadataRoute } from "next";

import { site } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { fr: site.url, en: `${site.url}/en` };
  return [
    { url: site.url, lastModified: new Date("2026-11-22"), alternates: { languages } },
    { url: `${site.url}/en`, lastModified: new Date("2026-11-22"), alternates: { languages } },
    { url: `${site.url}/diagnostic-ia`, lastModified: new Date("2026-11-22") },
  ];
}
