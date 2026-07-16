import { describe, expect, it } from "vitest";

import { projects, provenStack } from "./projects";

describe("portfolio data", () => {
  it("contains four verifiable case studies", () => {
    expect(projects).toHaveLength(4);

    for (const project of projects) {
      expect(project.source).toMatch(
        /^https:\/\/github\.com\/alkhastvatsaev\//,
      );
      expect(project.live).toMatch(/^https:\/\/.+\.vercel\.app$/);
      expect(project.stack.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("lists only distinct stack entries", () => {
    expect(new Set(provenStack).size).toBe(provenStack.length);
  });
});
