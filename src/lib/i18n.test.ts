import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { dict, localeOf, sections, switchLocalePath } from "./i18n";

const allText = (value: unknown): string[] =>
  typeof value === "string"
    ? [value]
    : Array.isArray(value)
      ? value.flatMap(allText)
      : value && typeof value === "object"
        ? Object.values(value).flatMap(allText)
        : [];

describe("one-page site copy", () => {
  it("switches between the two languages", () => {
    expect(localeOf("/")).toBe("fr");
    expect(localeOf("/en")).toBe("en");
    expect(switchLocalePath("/")).toBe("/en");
    expect(switchLocalePath("/en")).toBe("/");
  });

  it("has one label per panel, in both languages", () => {
    expect(dict.fr.labels).toHaveLength(sections.length);
    expect(dict.en.labels).toHaveLength(sections.length);
  });

  it("keeps it short: 3 numbers, 4 projects", () => {
    for (const t of [dict.fr, dict.en]) {
      expect(t.stats).toHaveLength(3);
      expect(t.proofs).toHaveLength(4);
    }
  });

  // The site speaks to what a target company cares about, without naming it.
  // The names to avoid live in private-terms.local.txt (kept out of the repo).
  it("never names the companies listed in private-terms.local.txt", () => {
    const file = join(process.cwd(), "private-terms.local.txt");
    if (!existsSync(file)) return;
    const terms = readFileSync(file, "utf8").split("\n").map((t) => t.trim().toLowerCase()).filter(Boolean);
    const text = [...allText(dict.fr), ...allText(dict.en)].join("\n").toLowerCase();
    for (const term of terms) expect(text.includes(term), "a private term is on the site").toBe(false);
  });

  // The site talks about what visitors get, never "I / me / my".
  it("never speaks in the first person", () => {
    const fr = allText(dict.fr).join("\n");
    const en = allText(dict.en).join("\n");
    // Unicode-aware word edges, so "maîtrisé" is not read as "ma".
    expect(fr).not.toMatch(/(?<!\p{L})(je|moi|mon|ma|mes)(?!\p{L})|(?<!\p{L})j['’]/iu);
    expect(en).not.toMatch(/\b(I|I['’]m|I['’]ve|me|my|mine)\b/);
  });

  // Anti "AI-generated" guard: no em dashes, no "not X, but Y" slogans.
  it("avoids the usual AI-writing tells", () => {
    const text = [...allText(dict.fr), ...allText(dict.en)].join("\n");
    expect(text).not.toContain("—");
    expect(text).not.toMatch(/\bpas \w+, mais\b/i);
    expect(text).not.toMatch(/\bnot \w+, but\b/i);
    expect(text).not.toMatch(/pas trente|not thirty|pas des démos|not demos/i);
  });
});
