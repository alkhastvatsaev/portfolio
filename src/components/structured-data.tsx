const siteUrl = "https://alkhastvatsaev.dev";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Alkhast Vatsaev",
      url: siteUrl,
      image: `${siteUrl}/profile.png`,
      jobTitle: "Junior Fullstack JavaScript/TypeScript Developer",
      description:
        "Paris-based junior fullstack developer building web applications with React, Next.js, TypeScript, Firebase and Node.js.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
      email: "mailto:alkhastvatsaev@icloud.com",
      sameAs: [
        "https://github.com/alkhastvatsaev",
        "https://www.linkedin.com/in/alkhast-vatsaev/",
      ],
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
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Alkhast Vatsaev — Fullstack Developer",
      inLanguage: ["en", "fr"],
      author: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: "Alkhast Vatsaev — Junior Fullstack Developer in Paris",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
      dateModified: "2026-07-17",
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
