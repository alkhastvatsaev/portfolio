import { buildOgImage, contentType, size } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt =
  "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript à Paris";
export { contentType, size };

export default function OpenGraphImage() {
  return buildOgImage({
    line2: "Développeur Full Stack JavaScript / TypeScript — Paris",
    line3: "Avant le code : haute joaillerie pour Cartier et Van Cleef & Arpels",
  });
}
