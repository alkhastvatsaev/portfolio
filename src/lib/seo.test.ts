import { describe, expect, it } from "vitest";

import { descriptions, siteJsonLd, titles } from "./seo";

describe("SEO", () => {
  it("titles put the name first and stay under ~60 characters", () => {
    for (const title of Object.values(titles)) {
      expect(title.startsWith("Alkhast Vatsaev")).toBe(true);
      expect(title.length).toBeLessThanOrEqual(62);
      expect(title).toContain("Strasbourg");
    }
  });

  it("descriptions fit in a Google snippet (≤ 165 characters) and name the person", () => {
    for (const d of Object.values(descriptions)) {
      expect(d.length).toBeLessThanOrEqual(165);
      expect(d).toContain("Alkhast Vatsaev");
    }
  });

  it("structured data: ProfilePage whose main entity is the Person in Strasbourg", () => {
    for (const locale of ["fr", "en"] as const) {
      const graph = siteJsonLd(locale)["@graph"] as Array<Record<string, unknown>>;
      const profile = graph.find((n) => n["@type"] === "ProfilePage")!;
      const person = graph.find((n) => n["@type"] === "Person")!;
      expect(profile.mainEntity).toEqual({ "@id": person["@id"] });
      expect((person.address as { addressLocality: string }).addressLocality).toBe("Strasbourg");
      expect(person.sameAs).toContain("https://github.com/alkhastvatsaev");
      expect(graph.filter((n) => n["@type"] === "SoftwareApplication")).toHaveLength(4);
    }
  });
});
