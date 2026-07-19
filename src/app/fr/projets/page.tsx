import type { Metadata } from "next";
import Link from "next/link";

import { projectsFr } from "@/data/projects";

export const metadata: Metadata = {
  title: "Études de cas — Développeur Full Stack",
  description:
    "Études de cas d’Alkhast Vatsaev : projets Next.js, TypeScript, Firebase avec démos en ligne pour recruteurs.",
  alternates: {
    canonical: "/fr/projets",
    languages: {
      en: "/projects",
      fr: "/fr/projets",
      "x-default": "/projects",
    },
  },
};

export default function ProjetsIndex() {
  return (
    <main id="main-content" lang="fr" className="seo-page">
      <section className="hero" aria-labelledby="projects-title">
        <p className="eyebrow">Études de cas</p>
        <h1 id="projects-title">Projets Full Stack détaillés</h1>
        <p className="seo-lead">
          Chaque page documente le problème, l’approche, la stack et la preuve
          live — pour évaluer un développeur Full Stack JavaScript /
          TypeScript.
        </p>
      </section>
      <section className="work-section">
        <div className="project-list">
          {projectsFr.map((project, index) => (
            <article className="project" key={project.slug}>
              <div className="project-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="project-copy">
                <p className="project-label">{project.label}</p>
                <h2>
                  <Link href={`/fr/projets/${project.slug}`}>{project.name}</Link>
                </h2>
                <p className="project-summary">{project.summary}</p>
              </div>
              <div className="project-links">
                <Link href={`/fr/projets/${project.slug}`}>
                  Étude de cas <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
