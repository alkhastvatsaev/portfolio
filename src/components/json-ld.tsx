import type { Project } from "@/data/projects";

const siteUrl = "https://alkhastvatsaev.dev";

export function projectSoftwareSchema(
  project: Project,
  locale: "en" | "fr",
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: project.live,
    codeRepository: project.source,
    description: `${project.summary} ${project.detail}`,
    author: {
      "@type": "Person",
      name: "Alkhast Vatsaev",
      url: siteUrl,
    },
    programmingLanguage: project.stack,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    mainEntityOfPage: `${siteUrl}${path}`,
  };
}

export function articleSchema(
  title: string,
  description: string,
  path: string,
  date: string,
  locale: "en" | "fr",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    author: {
      "@type": "Person",
      name: "Alkhast Vatsaev",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Alkhast Vatsaev",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}${path}`,
    image: `${siteUrl}${locale === "fr" ? "/fr" : ""}/opengraph-image`,
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
