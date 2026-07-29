import Link from "next/link";

import {
  breadcrumbSchema,
  JsonLd,
  projectSoftwareSchema,
} from "@/components/json-ld";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  locale: "en" | "fr";
  path: string;
  allProjects: readonly Project[];
};

export function CaseStudyView({ project, locale, path, allProjects }: Props) {
  const isFr = locale === "fr";
  const home = isFr ? "/fr" : "/";
  const index = isFr ? "/fr/projets" : "/projects";
  const other = allProjects.filter((p) => p.slug !== project.slug);

  const breadcrumbs = [
    { name: isFr ? "Accueil" : "Home", path: home === "/" ? "/" : home },
    { name: isFr ? "Projets" : "Projects", path: index },
    { name: project.name, path },
  ];

  return (
    <main id="main-content" lang={locale} className="seo-page">
      <JsonLd data={projectSoftwareSchema(project, locale, path)} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <nav className="seo-breadcrumb" aria-label={isFr ? "Fil d’Ariane" : "Breadcrumb"}>
        <Link href={home}>{isFr ? "Accueil" : "Home"}</Link>
        <span aria-hidden="true"> / </span>
        <Link href={index}>{isFr ? "Projets" : "Projects"}</Link>
        <span aria-hidden="true"> / </span>
        <span>{project.name}</span>
      </nav>

      <section className="hero" aria-labelledby="case-title">
        <p className="eyebrow">{project.label}</p>
        <h1 id="case-title">{project.name}</h1>
        <p className="seo-lead">{project.summary}</p>
        {project.story ? (
          <div className="profile-copy single-col">
            <p>{project.story}</p>
          </div>
        ) : null}
        <ul className="project-stack" aria-label={isFr ? "Stack" : "Stack"}>
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="hero-actions">
          <a className="button button-primary" href={project.live} target="_blank" rel="noreferrer">
            {project.slug === "nota-crm"
              ? isFr
                ? "Voir heynota.app"
                : "Open heynota.app"
              : isFr
                ? "Voir la démo"
                : "Open live demo"}
          </a>
          {project.source ? (
            <a
              className="button button-secondary"
              href={project.source}
              target="_blank"
              rel="noreferrer"
            >
              {isFr ? "Code source" : "Source code"}
            </a>
          ) : project.slug === "nota-crm" ? (
            <a
              className="button button-secondary"
              href="https://app.heynota.app"
              target="_blank"
              rel="noreferrer"
            >
              {isFr ? "Ouvrir l’app" : "Open the app"}
            </a>
          ) : null}
        </div>
      </section>

      <section className="profile-section" aria-labelledby="problem-title">
        <div className="section-heading">
          <p className="section-index">{isFr ? "01 / Problème" : "01 / Problem"}</p>
          <h2 id="problem-title">{isFr ? "Le problème produit" : "The product problem"}</h2>
        </div>
        <div className="profile-copy single-col">
          <p>{project.problem}</p>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="approach-title">
        <div className="section-heading">
          <p className="section-index">{isFr ? "02 / Approche" : "02 / Approach"}</p>
          <h2 id="approach-title">{isFr ? "Comment je l’ai construit" : "How I built it"}</h2>
        </div>
        <div className="profile-copy single-col">
          <p>{project.approach}</p>
          <p>{project.detail}</p>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="outcome-title">
        <div className="section-heading">
          <p className="section-index">{isFr ? "03 / Résultat" : "03 / Outcome"}</p>
          <h2 id="outcome-title">{isFr ? "Ce que vous pouvez vérifier" : "What you can verify"}</h2>
        </div>
        <div className="profile-copy single-col">
          <p>{project.outcome}</p>
          <ul className="seo-city-list" aria-label={isFr ? "Points clés" : "Highlights"}>
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact-section" aria-labelledby="more-title">
        <p className="section-index">{isFr ? "Suite" : "Next"}</p>
        <h2 id="more-title">{isFr ? "Autres études de cas" : "More case studies"}</h2>
        <div className="contact-links">
          {other.map((p) => (
            <Link key={p.slug} href={`${index}/${p.slug}`}>
              {p.name} <span aria-hidden="true">→</span>
            </Link>
          ))}
          <Link href={isFr ? "/fr/articles" : "/articles"}>
            {isFr ? "Articles" : "Articles"} <span aria-hidden="true">→</span>
          </Link>
          <Link href={isFr ? "/fr/pour-recruteurs" : "/for-recruiters"}>
            {isFr ? "Page pour recruteurs" : "For recruiters"}{" "}
            <span aria-hidden="true">→</span>
          </Link>
          <Link href={home}>{isFr ? "Retour portfolio" : "Back to portfolio"}</Link>
        </div>
      </section>
    </main>
  );
}
