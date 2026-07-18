import { describe, expect, it } from "vitest";

import {
  articlesEn,
  articlesFr,
  getArticle,
  allArticles,
} from "./articles";

describe("articles data contracts", () => {
  it("requires unique slugs per locale", () => {
    const frSlugs = articlesFr.map((article) => article.slug);
    const enSlugs = articlesEn.map((article) => article.slug);

    expect(new Set(frSlugs).size).toBe(frSlugs.length);
    expect(new Set(enSlugs).size).toBe(enSlugs.length);
  });

  it("keeps required SEO fields filled", () => {
    for (const article of allArticles()) {
      expect(article.title.length).toBeGreaterThan(12);
      expect(article.description.length).toBeGreaterThan(40);
      expect(article.slug).toMatch(/^[a-z0-9-]+$/);
      expect(article.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.tags.length).toBeGreaterThan(0);
      expect(article.body.length).toBeGreaterThan(0);
      expect(article.body.some((section) => section.paragraphs.length > 0)).toBe(
        true,
      );
    }
  });

  it("resolves articles by slug and locale", () => {
    expect(getArticle("developpeur-full-stack-junior-france", "fr")?.locale).toBe(
      "fr",
    );
    expect(getArticle("junior-fullstack-developer-portfolio", "en")?.locale).toBe(
      "en",
    );
    expect(getArticle("missing", "fr")).toBeUndefined();
  });
});
