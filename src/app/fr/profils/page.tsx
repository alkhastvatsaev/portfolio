import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profils publics — Alkhast Vatsaev",
  description:
    "Tous les profils publics d’Alkhast Vatsaev : portfolio, GitHub, LinkedIn, démos projets. Une page pour le graphe d’identité SEO.",
  alternates: {
    canonical: "/fr/profils",
    languages: {
      fr: "/fr/profils",
      en: "/profiles",
      "x-default": "/fr/profils",
    },
  },
};

const links = [
  { name: "Portfolio", href: "https://alkhastvatsaev.dev/fr", me: true },
  {
    name: "Développeur Full Stack (FR)",
    href: "https://alkhastvatsaev.dev/fr/developpeur-full-stack",
    me: true,
  },
  {
    name: "Pour recruteurs",
    href: "https://alkhastvatsaev.dev/fr/pour-recruteurs",
    me: true,
  },
  { name: "GitHub", href: "https://github.com/alkhastvatsaev", me: true },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/alkhast-vatsaev/",
    me: true,
  },
  { name: "Dev.to", href: "https://dev.to/alkhastvatsaev", me: true },
  {
    name: "Malt",
    href: "https://www.malt.fr/profile/alkhastvatsaev",
    me: true,
  },
  { name: "Email", href: "mailto:alkhastvatsaev@icloud.com", me: false },
  { name: "Serrurerie Pro (démo)", href: "https://serrure.vercel.app", me: false },
  {
    name: "LOGIS. 2030 (démo)",
    href: "https://reach-logistics.vercel.app",
    me: false,
  },
  { name: "Hopla (démo)", href: "https://hopla-one.vercel.app", me: false },
  {
    name: "Atelier Aurelia (démo)",
    href: "https://atelier-aurelia-ring.vercel.app",
    me: false,
  },
];

export default function ProfilsPage() {
  return (
    <main id="main-content" lang="fr" className="seo-page">
      <section className="hero" aria-labelledby="profiles-title">
        <p className="eyebrow">Identité publique</p>
        <h1 id="profiles-title">Tous les profils et preuves au même endroit</h1>
        <p className="seo-lead">
          Une page crawlable qui agrège les présences publiques. Les liens
          principaux utilisent <code>rel=&quot;me&quot;</code> pour le graphe
          d’identité.
        </p>
      </section>
      <section className="contact-section">
        <div className="contact-links">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              rel={
                link.me
                  ? "me noreferrer"
                  : link.href.startsWith("http")
                    ? "noreferrer"
                    : undefined
              }
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.name} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
