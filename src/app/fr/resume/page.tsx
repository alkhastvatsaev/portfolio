import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PrintButton } from "@/components/print-button";
import { projectsFr, provenStack } from "@/data/projects";

export const metadata: Metadata = {
  title: "CV",
  description:
    "CV d’Alkhast Vatsaev, développeur Fullstack JavaScript et TypeScript à Paris.",
  alternates: {
    canonical: "/fr/resume",
    languages: {
      en: "/resume",
      fr: "/fr/resume",
      "x-default": "/resume",
    },
  },
};

export default function FrenchResumePage() {
  return (
    <main className="resume-shell" id="main-content" lang="fr">
      <div className="resume-toolbar">
        <Link href="/fr">← Retour au portfolio</Link>
        <PrintButton label="Imprimer / enregistrer en PDF" />
      </div>

      <article className="resume" aria-labelledby="resume-name">
        <header className="resume-header">
          <div className="resume-identity">
            <Image
              className="resume-photo"
              src="/profile.png"
              alt=""
              width={460}
              height={460}
            />
            <div>
              <p className="resume-kicker">
                Développeur Fullstack JavaScript / TypeScript
              </p>
              <h1 id="resume-name">Alkhast Vatsaev</h1>
            </div>
          </div>
          <address>
            Paris, France
            <br />
            <a href="mailto:alkhastvatsaev@icloud.com">
              alkhastvatsaev@icloud.com
            </a>
            <br />
            <a href="https://github.com/alkhastvatsaev">
              github.com/alkhastvatsaev
            </a>
            <br />
            <a href="https://www.linkedin.com/in/alkhast-vatsaev/">
              linkedin.com/in/alkhast-vatsaev
            </a>
          </address>
        </header>

        <section className="resume-section" aria-labelledby="resume-profile">
          <h2 id="resume-profile">Profil</h2>
          <p>
            Développeur fullstack créant des applications web concrètes, des
            interfaces utilisateur aux services backend et intégrations
            tierces. Mes projets couvrent les outils opérationnels, la
            logistique, la livraison locale et la configuration 3D.
          </p>
        </section>

        <section className="resume-section" aria-labelledby="resume-projects">
          <h2 id="resume-projects">Projets sélectionnés</h2>
          <div className="resume-projects">
            {projectsFr.slice(0, 3).map((project) => (
              <article key={project.name}>
                <div className="resume-project-heading">
                  <h3>{project.name}</h3>
                  <a href={project.source}>Source</a>
                  <span aria-hidden="true">·</span>
                  <a href={project.live}>Démo</a>
                </div>
                <p>{project.summary}</p>
                <p className="resume-tech">{project.stack.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="resume-section resume-skills"
          aria-labelledby="resume-stack"
        >
          <h2 id="resume-stack">Stack technique</h2>
          <p>{provenStack.join(" · ")}</p>
        </section>
      </article>
    </main>
  );
}
