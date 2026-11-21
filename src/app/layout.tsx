import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin", "cyrillic"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const siteUrl = "https://alkhastvatsaev.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Alkhast Vatsaev — Fullstack JavaScript/TypeScript Developer",
    template: "%s | Alkhast Vatsaev",
  },
  description:
    "AI-native product engineer in Paris: 23 live apps, 2,278 commits and 783 test files in 10 months. Next.js, TypeScript, Swift, Firebase, OpenAI.",
  keywords: [
    "Alkhast Vatsaev",
    "développeur full stack",
    "Développeur Full Stack France",
    "Développeur Full Stack Paris",
    "Fullstack developer Paris",
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
    title: "Alkhast Vatsaev — Fullstack JavaScript/TypeScript Developer",
    description:
      "Project-focused portfolio of a fullstack JavaScript/TypeScript developer in Paris — React, Next.js, Firebase.",
    url: siteUrl,
    siteName: "Alkhast Vatsaev",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Alkhast Vatsaev — Fullstack JavaScript/TypeScript Developer in Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alkhast Vatsaev — Fullstack JavaScript/TypeScript Developer",
    description:
      "Project-focused portfolio of a fullstack JavaScript/TypeScript developer in Paris — React, Next.js, Firebase.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "msapplication-TileColor": "#08080a",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08080a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <StructuredData />
        <a className="skip-link" href="#main-content">
          Skip to content / Aller au contenu
        </a>
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <p>Alkhast Vatsaev · Paris, France</p>
          <nav className="footer-links" aria-label="Footer">
            <Link href="/fr">FR</Link>
            <Link href="/fr/projets">Projets</Link>
            <Link href="/fr/projets/nota-crm">Nota CRM</Link>
            <Link href="/fr/articles">Articles</Link>
            <Link href="/fr/news">News</Link>
            <Link href="/fr/pour-recruteurs">Recruteurs</Link>
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
            <a href="https://heynota.app" rel="noopener noreferrer">
              heynota.app
            </a>
            <a
              href="https://formations.alkhastvatsaev.dev"
              rel="noopener noreferrer"
            >
              Formations IA
            </a>
            <a href="mailto:alkhastvatsaev@icloud.com">Email</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
