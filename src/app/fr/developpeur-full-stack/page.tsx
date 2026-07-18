import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://alkhastvatsaev.dev";
const pagePath = "/fr/developpeur-full-stack";

export const metadata: Metadata = {
  title: "Développeur Full Stack junior en France | JavaScript & TypeScript",
  description:
    "Alkhast Vatsaev — développeur Full Stack junior JavaScript/TypeScript disponible en France (Paris, remote, hybride). React, Next.js, Node.js, Firebase. Portfolio et projets en production.",
  keywords: [
    "développeur full stack",
    "développeur fullstack junior",
    "développeur full stack France",
    "développeur JavaScript France",
    "développeur TypeScript",
    "développeur React Next.js",
    "développeur fullstack Paris",
    "développeur web junior remote France",
    "Alkhast Vatsaev",
  ],
  alternates: {
    canonical: pagePath,
    languages: {
      fr: pagePath,
      en: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Développeur Full Stack junior en France — Alkhast Vatsaev",
    description:
      "Portfolio d’un développeur Full Stack junior : React, Next.js, TypeScript, Node.js et Firebase. Disponible à Paris, en hybride ou à distance en France.",
    url: pagePath,
    siteName: "Alkhast Vatsaev",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alkhast Vatsaev — Développeur Full Stack junior en France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développeur Full Stack junior en France — Alkhast Vatsaev",
    description:
      "React, Next.js, TypeScript et Firebase. Disponible en France : Paris, hybride ou remote.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    question: "Quel type de poste recherchez-vous ?",
    answer:
      "Un poste de développeur Full Stack junior (ou frontend / React / Next.js junior) en JavaScript et TypeScript, en CDI, CDD ou stage longue durée, en France.",
  },
  {
    question: "Travaillez-vous uniquement à Paris ?",
    answer:
      "Je suis basé à Paris, mais je suis ouvert au remote et à l’hybride partout en France : Île-de-France, Lyon, Marseille, Lille, Toulouse, Nantes, Bordeaux, Strasbourg, Rennes, Montpellier, Nice, et autres villes selon le poste.",
  },
  {
    question: "Quelle est votre stack principale ?",
    answer:
      "React, Next.js, TypeScript, Node.js, Firebase, Stripe, tests (Vitest, Playwright) et déploiement (Vercel). Les projets du portfolio montrent ces outils en conditions réelles.",
  },
  {
    question: "Où voir des preuves concrètes de travail ?",
    answer:
      "Sur alkhastvatsaev.dev : démos en ligne, dépôts GitHub documentés, CV et projets sélectionnés (logistique, marketplace, opérations, produit 3D).",
  },
  {
    question: "Comment vous contacter pour un recrutement ?",
    answer:
      "Par email à alkhastvatsaev@icloud.com, via LinkedIn, ou depuis la page d’accueil du portfolio. Le CV une page est aussi disponible en français.",
  },
];

const pageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}${pagePath}#webpage`,
      url: `${siteUrl}${pagePath}`,
      name: "Développeur Full Stack junior en France — Alkhast Vatsaev",
      description:
        "Page de présentation d’Alkhast Vatsaev, développeur Full Stack junior JavaScript/TypeScript disponible en France.",
      inLanguage: "fr-FR",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
      primaryImageOfPage: `${siteUrl}/og-image.png`,
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}${pagePath}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: `${siteUrl}/fr`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Développeur Full Stack",
          item: `${siteUrl}${pagePath}`,
        },
      ],
    },
  ],
};

export default function DeveloppeurFullStackPage() {
  return (
    <main id="main-content" lang="fr" className="seo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      <nav className="seo-breadcrumb" aria-label="Fil d’Ariane">
        <Link href="/fr">Accueil</Link>
        <span aria-hidden="true"> / </span>
        <span>Développeur Full Stack</span>
      </nav>

      <section className="hero" aria-labelledby="seo-title">
        <div className="eyebrow-row">
          <p className="eyebrow">France · Paris · Remote · Hybride</p>
          <p className="availability">
            <span aria-hidden="true" />
            Ouvert aux opportunités junior
          </p>
        </div>
        <h1 id="seo-title">
          Développeur Full Stack junior en France — JavaScript & TypeScript
        </h1>
        <p className="seo-lead">
          Je suis Alkhast Vatsaev, développeur Full Stack junior. Je construis
          des applications web de bout en bout avec React, Next.js, TypeScript,
          Node.js et Firebase. Ce site regroupe mon portfolio, mon CV et des
          projets déployés — pour les recruteurs qui cherchent un profil
          Fullstack junior en France.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/fr#work">
            Voir les projets
          </Link>
          <a
            className="button button-secondary"
            href="mailto:alkhastvatsaev@icloud.com"
          >
            Me contacter
          </a>
        </div>
      </section>

      <section
        className="profile-section"
        aria-labelledby="who-title"
        id="profil"
      >
        <div className="section-heading">
          <p className="section-index">Profil / Full Stack</p>
          <h2 id="who-title">
            Un développeur Full Stack junior orienté produit et preuves.
          </h2>
        </div>
        <div className="profile-copy">
          <p>
            Quand on cherche un{" "}
            <strong>développeur full stack</strong>, un{" "}
            <strong>développeur fullstack junior</strong> ou un{" "}
            <strong>développeur JavaScript / TypeScript</strong> en France, le
            critère utile n’est pas seulement la liste de technologies : c’est
            la capacité à livrer une interface, une API, des données, des tests
            et un déploiement. C’est ce que je montre ici.
          </p>
          <p>
            Stack principale : React, Next.js, TypeScript, Node.js, Firebase,
            Stripe, Vitest, Playwright, Vercel. Les dépôts GitHub associés sont
            publics, documentés et liés à des démos en ligne.
          </p>
        </div>
      </section>

      <section
        className="profile-section"
        aria-labelledby="france-title"
        id="france"
      >
        <div className="section-heading">
          <p className="section-index">Disponibilité / France</p>
          <h2 id="france-title">
            Disponible en France : Paris, hybride ou 100&nbsp;% remote.
          </h2>
        </div>
        <div className="profile-copy">
          <p>
            Basé à Paris, je candidate sur des postes partout en France. Les
            recherches du type « développeur full stack Paris », « développeur
            React Lyon », « développeur Next.js remote France » ou « junior
            TypeScript Marseille » peuvent toutes aboutir ici : un seul profil,
            un seul site, des preuves vérifiables.
          </p>
          <p>
            Zones concernées notamment : Paris et Île-de-France, Lyon,
            Marseille, Lille, Toulouse, Nantes, Bordeaux, Strasbourg, Rennes,
            Montpellier, Nice, Grenoble, et toute équipe en télétravail en
            France.
          </p>
        </div>
        <ul className="seo-city-list" aria-label="Villes et modes de travail">
          {[
            "Paris",
            "Lyon",
            "Marseille",
            "Lille",
            "Toulouse",
            "Nantes",
            "Bordeaux",
            "Strasbourg",
            "Rennes",
            "Montpellier",
            "Nice",
            "Remote France",
          ].map((city) => (
            <li key={city}>{city}</li>
          ))}
        </ul>
      </section>

      <section
        className="profile-section"
        aria-labelledby="proof-title"
        id="preuves"
      >
        <div className="section-heading">
          <p className="section-index">Preuves / Portfolio</p>
          <h2 id="proof-title">
            Des projets Full Stack déjà en ligne, pas seulement des exercices.
          </h2>
        </div>
        <div className="profile-copy">
          <p>
            Sur la{" "}
            <Link href="/fr#work">page d’accueil du portfolio</Link>, vous
            trouverez des produits concrets : opérations et serrurerie,
            workflows logistiques, marketplace de livraison locale, configurateur
            3D. Chaque projet principal expose une démo, le code source et une
            stack lisible pour un recruteur technique.
          </p>
          <p>
            Le{" "}
            <Link href="/fr/resume">CV en une page</Link> résume le parcours et
            la stack. GitHub :{" "}
            <a
              href="https://github.com/alkhastvatsaev"
              target="_blank"
              rel="noreferrer"
            >
              github.com/alkhastvatsaev
            </a>
            . LinkedIn :{" "}
            <a
              href="https://www.linkedin.com/in/alkhast-vatsaev/"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/alkhast-vatsaev
            </a>
            .
          </p>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title" id="faq">
        <div className="section-heading">
          <p className="section-index">FAQ / Recruteurs</p>
          <h2 id="faq-title">Questions fréquentes</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact-section" aria-labelledby="seo-contact-title">
        <p className="section-index">Contact</p>
        <h2 id="seo-contact-title">
          Vous recrutez un développeur Full Stack junior en France ?
        </h2>
        <p>
          Écrivons-nous. Je suis disponible pour un échange sur un poste
          JavaScript, TypeScript, React, Next.js ou Full Stack junior.
        </p>
        <div className="contact-links">
          <a href="mailto:alkhastvatsaev@icloud.com">
            alkhastvatsaev@icloud.com <span aria-hidden="true">↗</span>
          </a>
          <Link href="/fr">
            Portfolio complet <span aria-hidden="true">→</span>
          </Link>
          <Link href="/fr/resume">
            CV en une page <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
