import { describe, expect, it } from "vitest";

import { franceCities, getFranceCity } from "@/data/france-cities";

describe("franceCities", () => {
  it("covers major metros without exploding into thin doorway pages", () => {
    expect(franceCities.length).toBeGreaterThanOrEqual(25);
    expect(franceCities.length).toBeLessThanOrEqual(40);
  });

  it("has unique slugs and local hooks", () => {
    const slugs = franceCities.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    const hooks = franceCities.map((c) => c.localHook);
    expect(new Set(hooks).size).toBe(hooks.length);
  });

  it("resolves Strasbourg and Paris", () => {
    expect(getFranceCity("strasbourg")?.name).toBe("Strasbourg");
    expect(getFranceCity("paris")?.modes).toContain("présentiel");
  });
});
