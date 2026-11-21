import { describe, expect, it } from "vitest";

import { decodeAnswers, diagnose, encodeAnswers, hoursPerMonth, useCases, type Answers } from "./diagnostic";

const base: Answers = {
  employees: 20,
  suite: "m365",
  copilot: "aucune",
  tasks: ["emails", "support", "reunions", "documents"],
  sensitive: ["clients"],
  sharepointOrdre: "nsp",
  mfa: "non",
};

describe("diagnostic engine", () => {
  it("computes hours from a stated assumption (people × minutes × 4.33 weeks)", () => {
    // emails: 80 % of 20 = 16 people × 60 min × 4.33 / 60 ≈ 69 h
    expect(hoursPerMonth(useCases.emails, 20)).toEqual({ people: 16, hours: 69 });
  });

  it("keeps the 3 most valuable use cases, sorted", () => {
    const r = diagnose(base);
    expect(r.top).toHaveLength(3);
    expect(r.top[0].hoursPerMonth).toBeGreaterThanOrEqual(r.top[1].hoursPerMonth);
    expect(r.totalHoursPerMonth).toBe(r.top.reduce((s, u) => s + u.hoursPerMonth, 0));
  });

  it("asks to fix access rights and MFA before Copilot when they are not in place", () => {
    const titles = diagnose(base).precautions.map((p) => p.title).join(" ");
    expect(titles).toMatch(/droits d'accès/);
    expect(titles).toMatch(/double authentification/);
  });

  it("scores readiness higher when the basics are in place", () => {
    const ready = diagnose({ ...base, copilot: "deploye", sharepointOrdre: "oui", mfa: "oui" });
    expect(ready.readiness).toBeGreaterThan(diagnose(base).readiness);
    expect(ready.readinessLabel).toBe("Prête à déployer");
  });

  it("round-trips answers through the share link", () => {
    expect(decodeAnswers("#" + encodeAnswers(base))).toEqual(base);
    expect(decodeAnswers("#junk")).toBeNull();
  });
});
