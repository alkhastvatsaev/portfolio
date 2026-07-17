import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { projectsFr, provenStack } from "@/data/projects";

export const metadata: Metadata = {
  title: "Développeur Fullstack JavaScript/TypeScript junior",
  description:
    "Portfolio d’Alkhast Vatsaev, développeur Fullstack JavaScript et TypeScript junior basé à Paris.",
  alternates: {
    canonical: "/fr",
    languages: {
      en: "/",
      fr: "/fr",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Alkhast Vatsaev — Développeur Full Stack junior à Paris",
    description:
      "Portfolio de développeur Full Stack JavaScript/TypeScript junior : React, Next.js, Firebase, tests et projets déployés.",
    url: "/fr",
    siteName: "Alkhast Vatsaev",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript junior à Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alkhast Vatsaev — Développeur Full Stack junior à Paris",
    description:
      "Projets React, Next.js, TypeScript et Firebase testés et déployés.",
    images: ["/og-image.png"],
  },
};

export default function FrenchHome() {
  return (
    <main id="main-content" lang="fr">
      <section className="hero" aria-labelledby="hero-title">
        <div className="eyebrow-row">
          <p className="eyebrow">
            Paris · Développeur Fullstack JavaScript / TypeScript junior
          </p>
          <p className="availability">
            <span aria-hidden="true" />
            Disponible pour un poste junior
          </p>
        </div>
        <h1 id="hero-title">
          Je conçois des produits web utiles, de l’interface au backend.
        </h1>
        <div className="hero-footer">
          <div className="hero-identity">
            <Image
              className="profile-photo"
              src="/profile.png"
              alt="Alkhast Vatsaev"
              width={460}
              height={460}
              priority
            />
            <p className="hero-intro">
              Je suis Alkhast Vatsaev, développeur fullstack junior spécialisé
              en React, Next.js et TypeScript. Mon portfolio présente des
              projets livrés et vérifiables.
            </p>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Voir les projets
            </a>
            <a
              className="button button-secondary"
              href="mailto:alkhastvatsaev@icloud.com"
            >
              Me contacter
            </a>
          </div>
        </div>
      </section>

      <section
        className="profile-section"
        id="about"
        aria-labelledby="profile-title"
      >
        <div className="section-heading">
          <p className="section-index">
            Profil / Développeur Full Stack à Paris
          </p>
          <h2 id="profile-title">
            Développeur Full Stack JavaScript et TypeScript junior à Paris.
          </h2>
        </div>
        <div className="profile-copy">
          <p>
            Je développe des applications web de bout en bout avec React,
            Next.js, TypeScript, Node.js et Firebase. Mon travail couvre les
            interfaces responsives, la logique backend, l’authentification, les
            bases de données, les paiements, les API tierces, les tests
            automatisés et le déploiement.
          </p>
          <p>
            Les projets ci-dessous présentent des tableaux de bord
            opérationnels, des workflows logistiques, une application de
            livraison locale et une expérience produit 3D. Chaque dépôt
            principal comprend une documentation en anglais, une démonstration
            en ligne et des contrôles qualité automatisés. Je recherche un poste
            de développeur Full Stack junior, JavaScript, TypeScript, React ou
            Next.js à Paris, en hybride ou à distance.
          </p>
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="section-index">01 / Projets sélectionnés</p>
          <h2 id="work-title">
            Quatre produits qui répondent chacun à un problème concret.
          </h2>
        </div>
        <div className="project-list">
          {projectsFr.map((project, index) => (
            <article className="project" key={project.name}>
              <div className="project-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="project-copy">
                <p className="project-label">{project.label}</p>
                <h3>{project.name}</h3>
                <p className="project-summary">{project.summary}</p>
                <p className="project-detail">{project.detail}</p>
                <ul
                  className="project-stack"
                  aria-label={`Technologies de ${project.name}`}
                >
                  {project.stack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
              <div className="project-links">
                <a href={project.live} target="_blank" rel="noreferrer">
                  Voir le projet <span aria-hidden="true">↗</span>
                </a>
                <a href={project.source} target="_blank" rel="noreferrer">
                  Code source <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stack-section" id="stack" aria-labelledby="stack-title">
        <div className="section-heading">
          <p className="section-index">02 / Stack éprouvée</p>
          <h2 id="stack-title">Les outils utilisés dans les projets présentés.</h2>
        </div>
        <div className="stack-layout">
          <p>
            J’interviens sur le frontend, les services backend et les
            intégrations, en choisissant les outils selon les besoins du
            produit.
          </p>
          <ul className="stack-list">
            {provenStack.map((technology, index) => (
              <li key={technology}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact-section" aria-labelledby="contact-title">
        <p className="section-index">03 / Contact</p>
        <h2 id="contact-title">
          Vous recherchez un développeur junior à Paris ?
        </h2>
        <p>
          Je suis disponible pour échanger sur un poste Fullstack JavaScript et
          TypeScript, une équipe produit ou un projet web concret.
        </p>
        <div className="contact-links">
          <a href="mailto:alkhastvatsaev@icloud.com">
            alkhastvatsaev@icloud.com <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/alkhastvatsaev"
            target="_blank"
            rel="noreferrer"
          >
            github.com/alkhastvatsaev <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/alkhast-vatsaev/"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/alkhast-vatsaev{" "}
            <span aria-hidden="true">↗</span>
          </a>
          <Link href="/fr/resume">
            CV en une page <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
