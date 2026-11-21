import type { Viewport } from "next";

import { RootShell } from "@/components/root-shell";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata("fr");
export const viewport: Viewport = { themeColor: "#ffffff" };

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="fr">{children}</RootShell>;
}
