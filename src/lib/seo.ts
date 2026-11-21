import type { Metadata } from "next";

import { metrics } from "@/data/metrics";
import { site, type Locale } from "@/lib/i18n";

const titles = {
  fr: "Alkhast Vatsaev, développeur full-stack · outils IA pour les équipes support",
  en: "Alkhast Vatsaev, full-stack developer · AI tools for support teams",
};

const descriptions = {
  fr: `Développeur full-stack TypeScript. Depuis février 2026, ${metrics.liveApps} applications en production, dont NOTA (819 commits, 630 fichiers de tests). Disponible tout de suite.`,
  en: `Full-stack TypeScript developer. Since February 2026, ${metrics.liveApps} applications in production, including NOTA (819 commits, 630 test files). Available now.`,
};

/** Base metadata for a root layout. */
export function baseMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: { default: titles[locale], template: `%s · ${site.name}` },
    description: descriptions[locale],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      title: titles[locale],
      description: descriptions[locale],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: titles[locale] }],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: ["/og.png"],
    },
    icons: { icon: "/icon.svg" },
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

export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: locale === "fr" ? "Développeur full-stack" : "Full-stack developer",
    address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
    knowsLanguage: ["fr", "ru", "en"],
    knowsAbout: ["Next.js", "TypeScript", "React", "Swift", "Python", "Firebase", "PostgreSQL", "OpenAI", "Three.js"],
    sameAs: [site.github, site.linkedin],
  };
}
