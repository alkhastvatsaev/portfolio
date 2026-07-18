import { describe, expect, it } from "vitest";

import { projects, projectsFr, provenStack } from "./projects";

describe("portfolio data", () => {
  it("contains four verifiable case studies", () => {
    expect(projects).toHaveLength(4);

    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
      expect(project.source).toMatch(
        /^https:\/\/github\.com\/alkhastvatsaev\//,
      );
      expect(project.live).toMatch(/^https:\/\/.+\.vercel\.app$/);
      expect(project.stack.length).toBeGreaterThanOrEqual(4);
      expect(project.highlights.length).toBeGreaterThanOrEqual(3);
    }
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
});
