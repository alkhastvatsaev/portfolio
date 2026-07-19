import { buildOgImage, contentType, size } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt =
  "Alkhast Vatsaev — Fullstack JavaScript/TypeScript Developer in Paris";
export { contentType, size };

export default function TwitterImage() {
  return buildOgImage({
    line2: "Fullstack JavaScript / TypeScript Developer — Paris",
    line3: "Before code: high jewelry for Cartier and Van Cleef & Arpels",
  });
}
