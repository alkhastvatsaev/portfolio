import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alkhast Vatsaev · Développeur Full Stack & IA",
    short_name: "Alkhast Vatsaev",
    description: "Développeur full-stack TypeScript et IA à Strasbourg.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#161513",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
