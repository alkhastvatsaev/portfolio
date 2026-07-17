import type { Metadata, Viewport } from "next";
import Link from "next/link";

import "./globals.css";

const siteUrl = "https://portfolio-github-alkhast-vatsaev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Alkhast Vatsaev — Junior Fullstack JavaScript/TypeScript Developer",
    template: "%s | Alkhast Vatsaev",
  },
  description:
    "Paris-based junior fullstack JavaScript and TypeScript developer building practical web products with React and Next.js.",
  keywords: [
    "Alkhast Vatsaev",
    "Fullstack developer Paris",
    "JavaScript developer",
    "TypeScript developer",
    "React developer",
    "Next.js developer",
  ],
  authors: [{ name: "Alkhast Vatsaev", url: siteUrl }],
  creator: "Alkhast Vatsaev",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Alkhast Vatsaev — Junior Fullstack JavaScript/TypeScript Developer",
    description:
      "Project-focused portfolio of a junior fullstack developer based in Paris.",
    url: siteUrl,
    siteName: "Alkhast Vatsaev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alkhast Vatsaev — Junior Fullstack JavaScript/TypeScript Developer",
    description:
      "Project-focused portfolio of a junior fullstack developer based in Paris.",
  },
  robots: {
    index: true,
    follow: true,
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
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header">
          <Link className="wordmark" href="/" aria-label="Alkhast Vatsaev, home">
            AV<span aria-hidden="true">.</span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/#work">Work</Link>
            <Link href="/#stack">Stack</Link>
            <Link href="/resume">Resume</Link>
            <a href="mailto:alkhastvatsaev@icloud.com">Email</a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p>Alkhast Vatsaev · Paris, France</p>
          <div>
            <a
              href="https://github.com/alkhastvatsaev"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a href="mailto:alkhastvatsaev@icloud.com">Email</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
