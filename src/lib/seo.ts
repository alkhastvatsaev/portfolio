import type { Metadata } from "next";

import { metrics } from "@/data/metrics";
import { dict, site, type Locale } from "@/lib/i18n";

/** Name first, then the role recruiters search for, then the city (≈ 55 characters). */
export const titles = {
  fr: "Alkhast Vatsaev · Développeur Full Stack & IA, Strasbourg",
  en: "Alkhast Vatsaev · Full-Stack & AI Developer, Strasbourg",
} as const;

/** 150–160 characters: name, role, city, proof, availability. */
export const descriptions = {
  fr: `Alkhast Vatsaev, développeur full-stack TypeScript et IA à Strasbourg : ${metrics.liveApps} applications en production, ${metrics.testFiles} tests. Next.js, React, Swift. Disponible en CDI.`,
  en: `Alkhast Vatsaev, full-stack TypeScript and AI developer in Strasbourg: ${metrics.liveApps} apps in production, ${metrics.testFiles} tests. Next.js, React, Swift. Open to full-time roles.`,
} as const;

const keywords = {
  fr: [
    "Alkhast Vatsaev",
    "développeur full-stack Strasbourg",
    "développeur TypeScript Strasbourg",
    "développeur Next.js",
    "développeur React",
    "développeur IA",
    "intégration IA",
    "automatisation",
    "développeur Swift",
  ],
  en: [
    "Alkhast Vatsaev",
    "full-stack developer Strasbourg",
    "TypeScript developer",
    "Next.js developer",
    "React developer",
    "AI developer",
    "AI integration",
    "automation",
    "Swift developer",
  ],
};

/** Base metadata for a root layout. */
export function baseMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: { default: titles[locale], template: `%s · ${site.name}` },
    description: descriptions[locale],
    keywords: keywords[locale],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    robots: { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type: "profile",
      firstName: "Alkhast",
      lastName: "Vatsaev",
      siteName: site.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      title: titles[locale],
      description: descriptions[locale],
      url: locale === "fr" ? "/" : "/en",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: titles[locale] }],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: ["/og.png"],
    },
    // Google shows a square icon whose size is a multiple of 48 px: 48 (ico) and 96 (png).
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
        { url: "/icon-96.png", type: "image/png", sizes: "96x96" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
  };
}

/** Per-page metadata with canonical + hreflang alternates. */
export function pageMetadata(fr: string, en: string, locale: Locale, extra: Metadata = {}): Metadata {
  return {
    ...extra,
    alternates: {
      canonical: locale === "fr" ? fr : en,
      languages: { fr, en, "x-default": fr },
    },
  };
}

/**
 * schema.org graph: ProfilePage → Person (the main entity) + WebSite + the
 * featured apps, each credited to the Person. Same @id everywhere.
 */
export function siteJsonLd(locale: Locale) {
  const t = dict[locale];
  const pageUrl = locale === "fr" ? site.url : `${site.url}/en`;
  const personId = `${site.url}/#person`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        name: titles[locale],
        description: descriptions[locale],
        inLanguage: locale,
        dateModified: "2026-11-22",
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ["fr", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        givenName: "Alkhast",
        familyName: "Vatsaev",
        url: site.url,
        image: `${site.url}/profile.png`,
        email: `mailto:${site.email}`,
        jobTitle: locale === "fr" ? "Développeur full-stack TypeScript et IA" : "Full-stack TypeScript and AI developer",
        description: descriptions[locale],
        address: { "@type": "PostalAddress", addressLocality: "Strasbourg", addressRegion: "Grand Est", addressCountry: "FR" },
        alumniOf: { "@type": "EducationalOrganization", name: "Haute École de Joaillerie", address: "Paris" },
        knowsLanguage: ["fr", "ru", "en"],
        knowsAbout: [
          "TypeScript",
          "JavaScript",
          "Next.js",
          "React",
          "Node.js",
          "Swift",
          "SwiftUI",
          "Python",
          "PostgreSQL",
          "Firebase",
          "OpenAI API",
          "LLM integration",
          "Automation",
          "Playwright",
          "CI/CD",
          "Three.js",
        ],
        sameAs: [site.github, site.linkedin, "https://dev.to/alkhastvatsaev"],
      },
      ...t.proofs.map((p) => ({
        "@type": "SoftwareApplication",
        "@id": `${site.url}/#${p.id}`,
        name: p.label.split(" · ")[0],
        description: p.title,
        applicationCategory: "BusinessApplication",
        ...(p.link ? { url: p.link.href } : {}),
        image: `${site.url}${p.image}`,
        creator: { "@id": personId },
      })),
    ],
  };
}
