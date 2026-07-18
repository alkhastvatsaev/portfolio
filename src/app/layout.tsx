import type { Metadata, Viewport } from "next";

import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const siteUrl = "https://alkhastvatsaev.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Alkhast Vatsaev — Junior Fullstack JavaScript/TypeScript Developer",
    template: "%s | Alkhast Vatsaev",
  },
  description:
    "Junior Fullstack JavaScript and TypeScript developer in France (Paris, hybrid, remote). Explore production-ready React, Next.js, Firebase and Node.js projects.",
  keywords: [
    "Alkhast Vatsaev",
    "développeur full stack",
    "développeur fullstack junior",
    "Développeur Full Stack France",
    "Développeur Full Stack Paris",
    "Junior Fullstack developer Paris",
    "Fullstack developer France",
    "Développeur JavaScript France",
    "Développeur TypeScript",
    "développeur React Next.js",
    "JavaScript developer",
    "TypeScript developer",
    "React developer",
    "Next.js developer",
  ],
  applicationName: "Alkhast Vatsaev Portfolio",
  category: "technology",
  manifest: "/manifest.webmanifest",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Alkhast Vatsaev", url: siteUrl }],
  creator: "Alkhast Vatsaev",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fr: "/fr",
      "x-default": "/",
    },
    types: {
      "application/rss+xml": "https://alkhastvatsaev.dev/rss.xml",
    },
  },
  openGraph: {
    title:
      "Alkhast Vatsaev — Junior Fullstack JavaScript/TypeScript Developer",
    description:
      "Project-focused portfolio of a junior Fullstack JavaScript/TypeScript developer based in Paris.",
    url: siteUrl,
    siteName: "Alkhast Vatsaev",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alkhast Vatsaev — Junior Fullstack JavaScript/TypeScript Developer in Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alkhast Vatsaev — Junior Fullstack JavaScript/TypeScript Developer",
    description:
      "React, Next.js, TypeScript and Firebase projects from a junior fullstack developer in Paris.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "msapplication-TileColor": "#f3f0e8",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f0e8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        <a className="skip-link" href="#main-content">
          Skip to content / Aller au contenu
        </a>
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <p>Alkhast Vatsaev · Paris, France</p>
          <div>
            <a href="/fr/pour-recruteurs">Recruteurs</a>
            <a href="/rss.xml">RSS</a>
            <a
              href="https://github.com/alkhastvatsaev"
              target="_blank"
              rel="me noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alkhast-vatsaev/"
              target="_blank"
              rel="me noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:alkhastvatsaev@icloud.com">Email</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
