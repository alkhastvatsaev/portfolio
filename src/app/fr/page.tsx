import type { Metadata } from "next";
import { HomeView } from "@/components/home/home-view";

export const metadata: Metadata = {
  title: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript",
  description:
    "Développeur full stack et AI Product Engineer à Paris : 23 applications en ligne, 2 278 commits et 783 fichiers de tests en 10 mois. Next.js, TypeScript, Swift, Firebase, OpenAI.",
  keywords: [
    "Alkhast Vatsaev",
    "développeur full stack",
    "Développeur Full Stack France",
    "Développeur Full Stack Paris",
    "développeur React Next.js",
    "Développeur JavaScript France",
    "Développeur TypeScript",
  ],
  alternates: {
    canonical: "/fr",
    languages: {
      en: "/",
      fr: "/fr",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript",
    description:
      "Portfolio orienté projets d’un développeur full stack JavaScript/TypeScript à Paris — React, Next.js, Firebase.",
    url: "/fr",
    siteName: "Alkhast Vatsaev",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/fr/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript à Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript",
    description:
      "Portfolio orienté projets d’un développeur full stack JavaScript/TypeScript à Paris — React, Next.js, Firebase.",
    images: ["/fr/twitter-image.png"],
  },
};

export default function HomeFr() {
  return <HomeView locale="fr" />;
}
