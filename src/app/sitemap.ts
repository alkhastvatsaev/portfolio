import type { MetadataRoute } from "next";

import { articlesEn, articlesFr } from "@/data/articles";
import { projects } from "@/data/projects";

const baseUrl = "https://alkhastvatsaev.dev";
const lastModified = "2026-07-18";

export const dynamic = "force-static";

function entry(
  path: string,
  priority: number,
  languages?: Record<string, string>,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority,
    ...(languages
      ? {
          alternates: {
            languages,
          },
        }
      : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    entry("/", 1, {
      en: baseUrl,
      fr: `${baseUrl}/fr`,
      "x-default": baseUrl,
    }),
    entry("/fr", 0.95, {
      en: baseUrl,
      fr: `${baseUrl}/fr`,
      "x-default": baseUrl,
    }),
    entry("/fr/developpeur-full-stack", 0.95, {
      fr: `${baseUrl}/fr/developpeur-full-stack`,
      en: baseUrl,
      "x-default": baseUrl,
    }),
    entry("/fr/pour-recruteurs", 0.94, {
      fr: `${baseUrl}/fr/pour-recruteurs`,
      en: `${baseUrl}/for-recruiters`,
      "x-default": `${baseUrl}/fr/pour-recruteurs`,
    }),
    entry("/for-recruiters", 0.9, {
      en: `${baseUrl}/for-recruiters`,
      fr: `${baseUrl}/fr/pour-recruteurs`,
      "x-default": `${baseUrl}/for-recruiters`,
    }),
    entry("/projects", 0.9, {
      en: `${baseUrl}/projects`,
      fr: `${baseUrl}/fr/projets`,
      "x-default": `${baseUrl}/projects`,
    }),
    entry("/fr/projets", 0.9, {
      en: `${baseUrl}/projects`,
      fr: `${baseUrl}/fr/projets`,
      "x-default": `${baseUrl}/projects`,
    }),
    entry("/articles", 0.85, {
      en: `${baseUrl}/articles`,
      fr: `${baseUrl}/fr/articles`,
      "x-default": `${baseUrl}/fr/articles`,
    }),
    entry("/fr/articles", 0.88, {
      en: `${baseUrl}/articles`,
      fr: `${baseUrl}/fr/articles`,
      "x-default": `${baseUrl}/fr/articles`,
    }),
    entry("/profiles", 0.7, {
      en: `${baseUrl}/profiles`,
      fr: `${baseUrl}/fr/profils`,
      "x-default": `${baseUrl}/profiles`,
    }),
    entry("/fr/profils", 0.75, {
      en: `${baseUrl}/profiles`,
      fr: `${baseUrl}/fr/profils`,
      "x-default": `${baseUrl}/fr/profils`,
    }),
    entry("/resume", 0.8, {
      en: `${baseUrl}/resume`,
      fr: `${baseUrl}/fr/resume`,
      "x-default": `${baseUrl}/resume`,
    }),
    entry("/fr/resume", 0.8, {
      en: `${baseUrl}/resume`,
      fr: `${baseUrl}/fr/resume`,
      "x-default": `${baseUrl}/resume`,
    }),
  ];

  const projectEntries = projects.flatMap((project) => [
    entry(`/projects/${project.slug}`, 0.86, {
      en: `${baseUrl}/projects/${project.slug}`,
      fr: `${baseUrl}/fr/projets/${project.slug}`,
      "x-default": `${baseUrl}/projects/${project.slug}`,
    }),
    entry(`/fr/projets/${project.slug}`, 0.86, {
      en: `${baseUrl}/projects/${project.slug}`,
      fr: `${baseUrl}/fr/projets/${project.slug}`,
      "x-default": `${baseUrl}/projects/${project.slug}`,
    }),
  ]);

  const articleEntries = [
    ...articlesFr.map((article) =>
      entry(`/fr/articles/${article.slug}`, 0.82),
    ),
    ...articlesEn.map((article) => entry(`/articles/${article.slug}`, 0.8)),
  ];

  return [...staticEntries, ...projectEntries, ...articleEntries];
}
