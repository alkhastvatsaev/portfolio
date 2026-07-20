import { describe, expect, it } from "vitest";

import { allNews, getNewsItem, newsEn, newsFr } from "./news";

describe("news data contracts", () => {
  it("requires unique slugs per locale", () => {
    const frSlugs = newsFr.map((item) => item.slug);
    const enSlugs = newsEn.map((item) => item.slug);

    expect(new Set(frSlugs).size).toBe(frSlugs.length);
    expect(new Set(enSlugs).size).toBe(enSlugs.length);
  });

  it("keeps required fields filled", () => {
    for (const item of allNews()) {
      expect(item.title.length).toBeGreaterThan(8);
      expect(item.description.length).toBeGreaterThan(30);
      expect(item.slug).toMatch(/^[a-z0-9-]+$/);
      expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.tags.length).toBeGreaterThan(0);
      expect(item.body.length).toBeGreaterThan(0);
    }
  });

  it("resolves news by slug and locale", () => {
    expect(getNewsItem("preuve-42lab-validateur-saas-ia", "fr")?.locale).toBe(
      "fr",
    );
    expect(getNewsItem("preuve-42lab-validateur-saas-ia", "en")?.locale).toBe(
      "en",
    );
    expect(getNewsItem("missing", "fr")).toBeUndefined();
  });
});
