import type { Metadata } from "next";
import Link from "next/link";

import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Project case studies — Fullstack developer",
  description:
    "Detailed case studies from Alkhast Vatsaev: Next.js, TypeScript, Firebase and fullstack product work with live demos.",
  alternates: {
    canonical: "/projects",
    languages: {
      en: "/projects",
      fr: "/fr/projets",
      "x-default": "/projects",
    },
  },
};

export default function ProjectsIndex() {
  return (
    <main id="main-content" className="seo-page">
      <section className="hero" aria-labelledby="projects-title">
        <p className="eyebrow">Case studies</p>
        <h1 id="projects-title">Project case studies</h1>
        <p className="seo-lead">
          Each page documents the problem, approach, stack and live proof for
          recruiters evaluating a fullstack JavaScript/TypeScript developer.
        </p>
      </section>
      <section className="work-section">
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project" key={project.slug}>
              <div className="project-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="project-copy">
                <p className="project-label">{project.label}</p>
                <h2>
                  <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                </h2>
                <p className="project-summary">{project.summary}</p>
              </div>
              <div className="project-links">
                <Link href={`/projects/${project.slug}`}>
                  Case study <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
