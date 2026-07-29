import { describe, expect, it } from "vitest";

import { projects, projectsFr, provenStack, getProjectBySlug } from "./projects";

describe("portfolio data", () => {
  it("contains six verifiable case studies", () => {
    expect(projects).toHaveLength(6);

    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
      expect(project.live).toMatch(/^https:\/\//);
      expect(project.stack.length).toBeGreaterThanOrEqual(4);
      expect(project.highlights.length).toBeGreaterThanOrEqual(3);
      if (project.source) {
        expect(project.source).toMatch(
          /^https:\/\/github\.com\/alkhastvatsaev\//,
        );
      }
    }
  });

  it("lists Nota CRM first with heynota.app as live URL", () => {
    expect(projects[0]?.slug).toBe("nota-crm");
    expect(projects[0]?.live).toBe("https://heynota.app");
    expect(projects[0]?.source).toBeUndefined();
  });

  it("lists only distinct stack entries", () => {
    expect(new Set(provenStack).size).toBe(provenStack.length);
  });

  it("keeps French and English project links aligned", () => {
    expect(projectsFr).toHaveLength(projects.length);
    expect(
      projectsFr.map(({ slug, source, live }) => ({ slug, source, live })),
    ).toEqual(projects.map(({ slug, source, live }) => ({ slug, source, live })));
  });

  it("orders projects as Nota → CRM Slot → Serrurerie → Aurelia → LOGIS → Hopla", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "nota-crm",
      "crmslot",
      "serrurerie-pro",
      "atelier-aurelia",
      "logis-2030",
      "hopla",
    ]);
  });

  it("resolves projects by slug", () => {
    expect(getProjectBySlug("hopla", "fr")?.name).toBe("Hopla");
    expect(getProjectBySlug("nota-crm", "en")?.name).toBe("Nota CRM");
    expect(getProjectBySlug("missing", "en")).toBeUndefined();
  });
});
