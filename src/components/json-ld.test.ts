import { describe, expect, it } from "vitest";

import {
  articleSchema,
  projectSoftwareSchema,
} from "@/components/json-ld";
import { projects } from "@/data/projects";

describe("structured data builders", () => {
  it("builds SoftwareApplication schema for a project", () => {
    const project = projects[0];
    const schema = projectSoftwareSchema(project, "en", `/projects/${project.slug}`);

    expect(schema["@type"]).toBe("SoftwareApplication");
    expect(schema.name).toBe(project.name);
    expect(schema.url).toBe(project.live);
    expect(schema.codeRepository).toBe(project.source);
    expect(schema.mainEntityOfPage).toContain(project.slug);
  });

  it("builds Article schema with author and dates", () => {
    const schema = articleSchema(
      "Title",
      "Description long enough",
      "/fr/articles/demo",
      "2026-07-18",
      "fr",
    );

    expect(schema["@type"]).toBe("Article");
    expect(schema.inLanguage).toBe("fr-FR");
    expect(schema.author).toMatchObject({ name: "Alkhast Vatsaev" });
    expect(schema.datePublished).toBe("2026-07-18");
  });
});
