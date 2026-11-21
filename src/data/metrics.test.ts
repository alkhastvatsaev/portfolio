import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { commitsByMonth, metrics, projects } from "./metrics";

describe("metrics data contract", () => {
  it("monthly commits add up to the headline commit count", () => {
    expect(commitsByMonth.reduce((sum, m) => sum + m.commits, 0)).toBe(metrics.commits);
  });


  it("project slugs are unique and URL-safe", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("every project has FR and EN copy", () => {
    for (const p of projects) {
      expect(p.tagline.fr && p.tagline.en).toBeTruthy();
      expect(p.details.fr.length).toBe(p.details.en.length);
    }
  });

  it("every screenshot exists in /public", () => {
    for (const p of projects) {
      if (p.image) expect(existsSync(join(process.cwd(), "public", p.image))).toBe(true);
    }
  });
});
