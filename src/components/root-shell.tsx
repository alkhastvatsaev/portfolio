import { Libre_Franklin } from "next/font/google";

import { SiteHeader } from "@/components/site-chrome";
import { siteJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

import "@/styles/globals.css";

/** One classic typeface (Franklin Gothic family) for the whole site. */
const sans = Libre_Franklin({ subsets: ["latin"], variable: "--font-sans-face", display: "swap" });

export function RootShell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    <html lang={lang} className={sans.variable}>
      <body className="h-dvh overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd(lang)) }}
        />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
