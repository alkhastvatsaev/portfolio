import { describe, expect, it } from "vitest";

import { isFrenchPath, twinPath } from "./locale-path";

describe("twinPath", () => {
  it("maps paired marketing routes", () => {
    expect(twinPath("/", true)).toBe("/fr");
    expect(twinPath("/fr", false)).toBe("/");
    expect(twinPath("/projects", true)).toBe("/fr/projets");
    expect(twinPath("/fr/pour-recruteurs", false)).toBe("/for-recruiters");
  });

  it("keeps the same project slug across locales", () => {
    expect(twinPath("/projects/hopla", true)).toBe("/fr/projets/hopla");
    expect(twinPath("/fr/projets/hopla", false)).toBe("/projects/hopla");
  });

  it("falls back sensibly for article detail pages", () => {
    expect(twinPath("/fr/articles/foo", false)).toBe("/articles");
    expect(twinPath("/articles/foo", true)).toBe("/fr/articles");
  });

  it("keeps the same news slug across locales", () => {
    expect(twinPath("/news/preuve-42lab-validateur-saas-ia", true)).toBe(
      "/fr/news/preuve-42lab-validateur-saas-ia",
    );
    expect(twinPath("/fr/news/preuve-42lab-validateur-saas-ia", false)).toBe(
      "/news/preuve-42lab-validateur-saas-ia",
    );
  });

  it("handles the French SEO landing", () => {
    expect(twinPath("/fr/developpeur-full-stack", false)).toBe("/");
    expect(twinPath("/fr/developpeur-full-stack", true)).toBe(
      "/fr/developpeur-full-stack",
    );
  });
});

describe("isFrenchPath", () => {
  it("detects French routes", () => {
    expect(isFrenchPath("/fr")).toBe(true);
    expect(isFrenchPath("/fr/projets")).toBe(true);
    expect(isFrenchPath("/projects")).toBe(false);
  });
});
