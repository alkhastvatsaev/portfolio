import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://alkhastvatsaev.dev",
    sitemap: "https://alkhastvatsaev.dev/sitemap.xml",
  };
}
