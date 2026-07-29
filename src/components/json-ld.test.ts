import { describe, expect, it } from "vitest";

import {
  articleSchema,
  breadcrumbSchema,
  projectSoftwareSchema,
} from "@/components/json-ld";
import { personId } from "@/lib/site";
import { getProjectBySlug, projects } from "@/data/projects";

describe("structured data builders", () => {
  it("builds SoftwareApplication schema for a project with Person @id", () => {
    const project = projects[0];
    const schema = projectSoftwareSchema(project, "en", `/projects/${project.slug}`);

    expect(schema["@type"]).toBe("SoftwareApplication");
    expect(schema.name).toBe(project.name);
    expect(schema.url).toBe(project.live);
    expect(schema.author).toEqual({ "@id": personId });
    expect(schema.mainEntityOfPage).toContain(project.slug);
    expect(schema).not.toHaveProperty("codeRepository");
  });

  it("includes codeRepository when source exists", () => {
    const project = getProjectBySlug("crmslot", "en")!;
    const schema = projectSoftwareSchema(project, "en", `/projects/${project.slug}`);
    expect(schema.codeRepository).toBe(project.source);
  });

  it("builds Article schema with Person @id author", () => {
    const schema = articleSchema(
      "Title",
      "Description long enough",
      "/fr/articles/demo",
      "2026-07-18",
      "fr",
    );

    expect(schema["@type"]).toBe("Article");
    expect(schema.inLanguage).toBe("fr-FR");
    expect(schema.author).toEqual({ "@id": personId });
    expect(schema.publisher).toMatchObject({ "@id": personId });
    expect(schema.datePublished).toBe("2026-07-18");
  });

  it("builds BreadcrumbList schema", () => {
    const schema = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: "Nota CRM", path: "/projects/nota-crm" },
    ]);
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[2]).toMatchObject({
      position: 3,
      name: "Nota CRM",
      item: "https://alkhastvatsaev.dev/projects/nota-crm",
    });
  });
});
