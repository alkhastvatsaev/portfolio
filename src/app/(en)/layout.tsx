import type { Viewport } from "next";

import { RootShell } from "@/components/root-shell";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata("en");
export const viewport: Viewport = { themeColor: "#ffffff" };

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
