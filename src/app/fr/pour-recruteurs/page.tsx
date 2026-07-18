import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pour recruteurs — Développeur Full Stack junior en 60 secondes",
  description:
    "Page recruteur : preuves, stack, démos, GitHub, CV et contact d’Alkhast Vatsaev, développeur Full Stack junior JavaScript/TypeScript en France.",
  alternates: {
    canonical: "/fr/pour-recruteurs",
    languages: {
      fr: "/fr/pour-recruteurs",
      en: "/for-recruiters",
      "x-default": "/fr/pour-recruteurs",
    },
  },
  openGraph: {
    title: "Pour recruteurs — Alkhast Vatsaev",
    description:
      "Scan 60 secondes : preuves fullstack junior, stack, liens et contact.",
    url: "/fr/pour-recruteurs",
    locale: "fr_FR",
    images: ["/og-image.png"],
  },
};

const proofs = [
  {
    title: "Portfolio + études de cas",
    href: "/fr/projets",
    text: "Problème, approche, stack, démo et repo pour chaque projet flagship.",
  },
  {
    title: "CV une page",
    href: "/fr/resume",
    text: "Parcours et stack condensés, imprimables.",
  },
  {
    title: "GitHub",
    href: "https://github.com/alkhastvatsaev",
    text: "Dépôts publics documentés, CI sur les projets principaux.",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/alkhast-vatsaev/",
    text: "Profil public aligné sur le même positionnement.",
  },
];

export default function PourRecruteursPage() {
  return (
    <main id="main-content" lang="fr" className="seo-page">
      <section className="hero" aria-labelledby="recruiter-title">
        <div className="eyebrow-row">
          <p className="eyebrow">Recruteurs · 60 secondes</p>
          <p className="availability">
            <span aria-hidden="true" />
            Junior · France · Remote OK
          </p>
        </div>
        <h1 id="recruiter-title">
          Alkhast Vatsaev — développeur Full Stack junior, preuves d’abord.
        </h1>
        <p className="seo-lead">
          JavaScript / TypeScript · React · Next.js · Node.js · Firebase.
          Disponible à Paris, en hybride ou 100&nbsp;% remote en France. Cette
          page concentre tout ce qu’il faut pour décider d’un premier échange.
        </p>
        <div className="hero-actions">
          <a
            className="button button-primary"
            href="mailto:alkhastvatsaev@icloud.com"
          >
            Écrire un email
          </a>
          <Link className="button button-secondary" href="/fr/projets">
            Voir les études de cas
          </Link>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="proof-title">
        <div className="section-heading">
          <p className="section-index">Preuves</p>
          <h2 id="proof-title">Quatre liens pour valider le profil.</h2>
        </div>
        <ul className="recruiter-proof-list">
          {proofs.map((item) => (
            <li key={item.href}>
              <a href={item.href} rel={item.href.startsWith("http") ? "noreferrer me" : undefined}>
                {item.title}
              </a>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="stack-section" aria-labelledby="stack-title">
        <div className="section-heading">
          <p className="section-index">Stack</p>
          <h2 id="stack-title">Ce que je livre réellement.</h2>
        </div>
        <div className="profile-copy single-col">
          <p>
            Interfaces React/Next.js, logique backend, auth, données Firebase,
            paiements Stripe, tests (Vitest/Playwright) et déploiement Vercel.
            Les projets ne sont pas des landings : ce sont des parcours produit
            utilisables en démo.
          </p>
        </div>
      </section>

      <section className="contact-section" aria-labelledby="next-title">
        <p className="section-index">Suite</p>
        <h2 id="next-title">Checklist d’évaluation</h2>
        <p>
          Une méthode courte pour vérifier n’importe quel junior — y compris
          moi.
        </p>
        <div className="contact-links">
          <Link href="/fr/articles/comment-verifier-le-travail-dun-developpeur-junior">
            Checklist recruteur <span aria-hidden="true">→</span>
          </Link>
          <Link href="/fr/developpeur-full-stack">
            Page Full Stack France <span aria-hidden="true">→</span>
          </Link>
          <Link href="/fr/profils">
            Tous les profils publics <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
