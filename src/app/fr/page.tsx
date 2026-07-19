import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { projectsFr, provenStack } from "@/data/projects";

export const metadata: Metadata = {
  title: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript",
  description:
    "Développeur full stack JavaScript et TypeScript à Paris (hybride, remote). Projets React, Next.js, Firebase et Node.js prêts pour la production — ouvert aux postes full stack junior et début de carrière.",
  keywords: [
    "Alkhast Vatsaev",
    "développeur full stack",
    "développeur fullstack junior",
    "Développeur Full Stack France",
    "Développeur Full Stack Paris",
    "développeur React Next.js",
    "Développeur JavaScript France",
    "Développeur TypeScript",
  ],
  alternates: {
    canonical: "/fr",
    languages: {
      en: "/",
      fr: "/fr",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript",
    description:
      "Portfolio orienté projets d’un développeur full stack JavaScript/TypeScript à Paris — React, Next.js, Firebase.",
    url: "/fr",
    siteName: "Alkhast Vatsaev",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/fr/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript à Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript",
    description:
      "Portfolio orienté projets d’un développeur full stack JavaScript/TypeScript à Paris — React, Next.js, Firebase.",
    images: ["/fr/twitter-image.png"],
  },
};

export default function FrenchHome() {
  return (
    <main id="main-content" lang="fr">
      <section className="hero" aria-labelledby="hero-title">
        <div className="eyebrow-row">
          <p className="eyebrow">
            Paris · Développeur Full Stack JavaScript / TypeScript
          </p>
          <p className="availability">
            <span aria-hidden="true" />
            Ouvert aux opportunités — CDI ou freelance
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
              Je suis Alkhast Vatsaev, développeur full stack (React, Next.js,
              TypeScript). Avant le code : production atelier (logiciels métier)
              à l&apos;Atelier de l&apos;Objet — maisons dont Cartier et Van Cleef
              &amp; Arpels. L&apos;exigence du détail est restée. Ce portfolio
              repose sur des projets shippés, pas sur des titres gonflés.
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
            Profil / Développeur Full Stack en France
          </p>
          <h2 id="profile-title">
            Développeur full stack JavaScript et TypeScript à Paris.
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
            en ligne et des contrôles qualité automatisés. Disponible pour des
            postes full stack, JavaScript, TypeScript, React ou Next.js à
            Paris, en hybride ou en full remote — y compris en début de
            carrière.{" "}
            <Link href="/fr/developpeur-full-stack">
              En savoir plus sur mon profil Full Stack
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="section-index">01 / Projets sélectionnés</p>
          <h2 id="work-title">
            Cinq produits qui répondent chacun à un problème concret.
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
                <h3>
                  <Link href={`/fr/projets/${project.slug}`}>{project.name}</Link>
                </h3>
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
                <Link href={`/fr/projets/${project.slug}`}>
                  Étude de cas <span aria-hidden="true">→</span>
                </Link>
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
          Vous cherchez un développeur full stack qui ship ?
        </h2>
        <p>
          Je suis disponible pour échanger sur un poste Fullstack JavaScript et
          TypeScript, une équipe produit ou un projet web concret — Paris,
          hybride ou remote.
        </p>
        <div className="contact-links">
          <a href="mailto:alkhastvatsaev@icloud.com">
            alkhastvatsaev@icloud.com <span aria-hidden="true">↗</span>
          </a>
          <Link href="/fr/pour-recruteurs">
            Page pour recruteurs <span aria-hidden="true">→</span>
          </Link>
          <Link href="/fr/developpeur-full-stack">
            Page développeur Full Stack <span aria-hidden="true">→</span>
          </Link>
          <Link href="/fr/articles">
            Articles <span aria-hidden="true">→</span>
          </Link>
          <Link href="/fr/projets">
            Études de cas <span aria-hidden="true">→</span>
          </Link>
          <a
            href="https://github.com/alkhastvatsaev"
            target="_blank"
            rel="me noreferrer"
          >
            github.com/alkhastvatsaev <span aria-hidden="true">↗</span>
          </a>
          <Link href="/fr/resume">
            CV en une page <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
