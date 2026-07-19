import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alkhast Vatsaev — Fullstack Developer",
    short_name: "Alkhast Vatsaev",
    description:
      "Portfolio of a Fullstack JavaScript/TypeScript developer in Paris.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f0e8",
    theme_color: "#f3f0e8",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
