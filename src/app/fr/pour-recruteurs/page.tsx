import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Recruter un développeur Fullstack JavaScript/TypeScript à Paris | Alkhast Vatsaev",
  description:
    "Profil Fullstack JavaScript/TypeScript à Paris : démos live, repos GitHub, stack et contact — évaluez Alkhast Vatsaev en moins de trois minutes.",
  keywords: [
    "développeur full stack",
    "développeur fullstack Paris",
    "React Next.js TypeScript",
    "recruter développeur junior",
    "Alkhast Vatsaev",
  ],
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
      "Recruter un développeur Fullstack JavaScript/TypeScript à Paris — Alkhast Vatsaev",
    description:
      "Preuves en 3 minutes : démos, GitHub, CV et contact. Fullstack React / Next.js / TypeScript à Paris.",
    url: "/fr/pour-recruteurs",
    locale: "fr_FR",
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
    images: ["/fr/twitter-image.png"],
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
            Paris · CDI / hybride / remote · Dispo immédiate
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
              <strong>Poste :</strong> développeur Fullstack
              JavaScript/TypeScript — React, Next.js, Node.js, Firebase.
            </li>
            <li>
              <strong>Niveau :</strong> début de carrière, orienté production —
              évaluez le travail livré ci-dessous plutôt qu&apos;un titre.
            </li>
            <li>
              <strong>Expérience :</strong> projets portfolio documentés (démo +
              repo + tests). Avant le code : production atelier — logiciels
              métier à l&apos;Atelier de l&apos;Objet (maisons dont Cartier, Van
              Cleef &amp; Arpels).
            </li>
            <li>
              <strong>Formation :</strong> diplôme d&apos;études supérieures —
              production &amp; logiciels métier (Haute École de Joaillerie,
              Paris) · autoformation fullstack (projets déployés).
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
            Cinq case studies documentées — produit phare{" "}
            <Link href="/fr/projets/crmslot">CRM Slot</Link> — chacune avec
            démo live et code source. Tests automatisés (Vitest, Playwright) et
            documentation sur chaque repo phare.
          </p>
          <p>
            <strong>Preuve 42Lab — validateur SaaS IA :</strong>{" "}
            <a
              href="https://validateur-saas-42lab.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              validateur-saas-42lab.vercel.app
            </a>{" "}
            (démo) ·{" "}
            <a
              href="https://github.com/alkhastvatsaev/validateur-saas-42lab"
              target="_blank"
              rel="noopener noreferrer"
            >
              code source
            </a>{" "}
            — pitch vocal, diagnostic fit sprint 42 jours, CTA Calendly.
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
            Pourquoi un profil début de carrière avec une culture produit atelier
          </h2>
        </div>
        <div className="profile-copy single-col">
          <p>
            Beaucoup de candidatures début de carrière demandent de parier sur
            un potentiel. Celle-ci demande d&apos;auditer du travail livré :
            authentification, paiements Stripe, cartographie, chat temps réel,
            génération de PDF, tests automatisés, déploiement — déjà construits,
            déjà en ligne. L&apos;exigence du détail vient d&apos;un parcours
            atelier (production &amp; logiciels métier). Elle a survécu au
            changement de matière.
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
