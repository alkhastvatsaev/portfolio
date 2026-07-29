import type { Project } from "@/data/projects";
import { personId, personName, siteUrl } from "@/lib/site";

export function personRef() {
  return { "@id": personId };
}

export function breadcrumbSchema(
  items: readonly { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

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
    ...(project.source ? { codeRepository: project.source } : {}),
    description: `${project.summary} ${project.detail}`,
    author: personRef(),
    creator: personRef(),
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
    author: personRef(),
    publisher: {
      "@id": personId,
      name: personName,
    },
    mainEntityOfPage: `${siteUrl}${path}`,
    image: `${siteUrl}${locale === "fr" ? "/fr" : ""}/opengraph-image.png`,
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
