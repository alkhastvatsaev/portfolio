import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Recruter un développeur full stack JavaScript/TypeScript à Paris — Profil junior | Alkhast Vatsaev",
  description:
    "Profil junior full stack JavaScript/TypeScript à Paris : démos, repos, stack et contact — évaluez Alkhast Vatsaev en moins de trois minutes.",
  alternates: {
    canonical: "/fr/pour-recruteurs",
    languages: {
      fr: "/fr/pour-recruteurs",
      en: "/for-recruiters",
      "x-default": "/fr/pour-recruteurs",
    },
  },
  openGraph: {
    title:
      "Recruter un développeur full stack JavaScript/TypeScript à Paris — Profil junior",
    description:
      "Profil junior full stack à Paris : preuves, démos, GitHub, CV et contact en moins de trois minutes.",
    url: "/fr/pour-recruteurs",
    locale: "fr_FR",
    images: [
      {
        url: "/fr/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript à Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/fr/twitter-image"],
  },
};

export default function PourRecruteursPage() {
  return (
    <main id="main-content" lang="fr" className="seo-page">
      <section className="hero" aria-labelledby="recruiter-title">
        <div className="eyebrow-row">
          <p className="eyebrow">Pour les recruteurs</p>
          <p className="availability">
            <span aria-hidden="true" />
            Profil junior · Paris · Remote OK
          </p>
        </div>
        <h1 id="recruiter-title">Pour les recruteurs</h1>
        <p className="seo-lead">
          Tout ce qu&apos;il faut pour évaluer ce profil en moins de trois minutes.
        </p>
        <div className="hero-actions">
          <a
            className="button button-primary"
            href="mailto:alkhastvatsaev@icloud.com"
          >
            Écrire un email
          </a>
          <Link className="button button-secondary" href="/fr/projets">
            Études de cas
          </Link>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="short-title">
        <div className="section-heading">
          <p className="section-index">L&apos;essentiel</p>
          <h2 id="short-title">Niveau, stack, disponibilité.</h2>
        </div>
        <div className="profile-copy single-col">
          <ul className="seo-city-list">
            <li>
              <strong>Poste :</strong> développeur full stack
              JavaScript/TypeScript — React, Next.js, Node.js, Firebase.
            </li>
            <li>
              <strong>Niveau :</strong> début de carrière, et je l&apos;assume —
              je vise des postes junior, avec le niveau de production listé
              ci-dessous.
            </li>
            <li>
              <strong>Expérience :</strong> 15 mois de freelance, une quinzaine
              de produits shippés de bout en bout. Avant : trois ans à dessiner
              de la haute joaillerie pour Cartier, Van Cleef &amp; Arpels et JAR.
            </li>
            <li>
              <strong>Localisation :</strong> Paris — sur site, hybride ou full
              remote.
            </li>
            <li>
              <strong>Contrat :</strong> CDI de préférence, ouvert au freelance.
            </li>
            <li>
              <strong>Disponibilité :</strong> immédiate.
            </li>
            <li>
              <strong>Rémunération :</strong> 40–45 k€ selon périmètre et
              remote.
            </li>
            <li>
              <strong>Délai de réponse :</strong> moins de 24 h.
            </li>
          </ul>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="verify-title">
        <div className="section-heading">
          <p className="section-index">Preuves</p>
          <h2 id="verify-title">Vérifiez, ne croyez pas sur parole</h2>
        </div>
        <div className="profile-copy single-col">
          <p>
            Quatre case studies documentées, chacune avec démo live et code
            source complet. Tests automatisés (Vitest, Playwright) et
            documentation en anglais sur chaque repo phare.
          </p>
        </div>
        <div className="contact-links">
          <Link href="/fr/projets">
            Case studies <span aria-hidden="true">→</span>
          </Link>
          <a
            href="https://github.com/alkhastvatsaev"
            target="_blank"
            rel="me noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <Link href="/fr/resume">
            CV une page <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="why-title">
        <div className="section-heading">
          <p className="section-index">Angle</p>
          <h2 id="why-title">
            Pourquoi un profil début de carrière venu de la place Vendôme
          </h2>
        </div>
        <div className="profile-copy single-col">
          <p>
            La plupart des candidatures junior vous demandent de parier sur un
            potentiel. Celle-ci vous demande d&apos;auditer du travail livré :
            authentification, paiements Stripe, cartographie, chat temps réel,
            génération de PDF, tests automatisés, déploiement — déjà construits,
            déjà en ligne. L&apos;obsession du détail vient de trois ans passés
            à dessiner pour les maisons les plus exigeantes du monde. Elle a
            survécu au changement de matière.
          </p>
        </div>
      </section>

      <section className="contact-section" aria-labelledby="process-title">
        <p className="section-index">Déroulé</p>
        <h2 id="process-title">Comment m&apos;évaluer</h2>
        <p>
          Choisissez le format qui vous convient : code review en live sur
          n&apos;importe lequel de mes repos, exercice technique à distance, ou
          session de pairing. Être évalué sur du travail réel me va très bien.
        </p>
        <div className="contact-links">
          <a href="mailto:alkhastvatsaev@icloud.com">
            Email <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/alkhast-vatsaev/"
            target="_blank"
            rel="me noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/alkhastvatsaev"
            target="_blank"
            rel="me noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <Link href="/fr/resume">
            CV <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
