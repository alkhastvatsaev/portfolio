import {
  personId,
  personJobTitle,
  personName,
  personSameAs,
  siteUrl,
} from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: personName,
      url: siteUrl,
      image: `${siteUrl}/profile.png`,
      jobTitle: personJobTitle,
      description:
        "Développeur Full Stack basé à Paris, disponible en France (hybride ou remote). Applications web avec React, Next.js, TypeScript, Firebase et Node.js.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
      email: "mailto:alkhastvatsaev@icloud.com",
      sameAs: [...personSameAs],
      knowsLanguage: ["fr", "en", "ru"],
      knowsAbout: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Firebase",
        "Stripe",
        "Three.js",
        "Vitest",
        "Playwright",
        "Full Stack Development",
        "Développement web",
        "CRM",
        "Field service software",
      ],
      workLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Paris",
          addressCountry: "FR",
        },
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Développement Full Stack — Alkhast Vatsaev",
      description:
        "Développement d’applications web Full Stack (React, Next.js, TypeScript, Node.js, Firebase) pour des équipes en France.",
      provider: {
        "@id": personId,
      },
      areaServed: {
        "@type": "Country",
        name: "France",
      },
      serviceType: [
        "Full Stack development",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
      ],
      url: `${siteUrl}/fr/developpeur-full-stack`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Alkhast Vatsaev — Développeur Full Stack",
      alternateName: "Alkhast Vatsaev — Fullstack Developer",
      description:
        "Portfolio d’Alkhast Vatsaev, développeur Full Stack JavaScript/TypeScript en France.",
      inLanguage: ["en", "fr"],
      author: {
        "@id": personId,
      },
      publisher: {
        "@id": personId,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: "Alkhast Vatsaev — Fullstack Developer in France",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      mainEntity: {
        "@id": personId,
      },
      dateModified: "2026-07-29",
      inLanguage: ["en", "fr"],
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
