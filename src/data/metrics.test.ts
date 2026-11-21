import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { commitsByMonth, metrics, showcase } from "./metrics";
import { projects } from "./projects";

describe("metrics data contract", () => {
  it("monthly commits add up to the headline commit count", () => {
    const sum = commitsByMonth.reduce((total, month) => total + month.commits, 0);
    expect(sum).toBe(metrics.commits);
  });

  it("showcase ids are unique", () => {
    const ids = showcase.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("case-study links point to existing project pages", () => {
    const slugs = new Set(projects.map((project) => project.slug));
    for (const project of showcase) {
      if (project.caseStudy) expect(slugs.has(project.caseStudy)).toBe(true);
    }
  });

  it("every screenshot exists in /public", () => {
    for (const project of showcase) {
      if (project.image) {
        expect(existsSync(join(process.cwd(), "public", project.image))).toBe(true);
      }
    }
  });
});
