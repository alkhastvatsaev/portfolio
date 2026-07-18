import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public profiles — Alkhast Vatsaev",
  description:
    "All public profiles for Alkhast Vatsaev: portfolio, GitHub, LinkedIn and project demos in one crawlable identity hub.",
  alternates: {
    canonical: "/profiles",
    languages: {
      en: "/profiles",
      fr: "/fr/profils",
      "x-default": "/profiles",
    },
  },
};

const links = [
  { name: "Portfolio", href: "https://alkhastvatsaev.dev", me: true },
  {
    name: "For recruiters",
    href: "https://alkhastvatsaev.dev/for-recruiters",
    me: true,
  },
  { name: "GitHub", href: "https://github.com/alkhastvatsaev", me: true },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/alkhast-vatsaev/",
    me: true,
  },
  { name: "Email", href: "mailto:alkhastvatsaev@icloud.com", me: false },
  { name: "Serrurerie Pro demo", href: "https://serrure.vercel.app", me: false },
  {
    name: "LOGIS. 2030 demo",
    href: "https://reach-logistics.vercel.app",
    me: false,
  },
  { name: "Hopla demo", href: "https://hopla-one.vercel.app", me: false },
  {
    name: "Atelier Aurelia demo",
    href: "https://atelier-aurelia-ring.vercel.app",
    me: false,
  },
];

export default function ProfilesPage() {
  return (
    <main id="main-content" className="seo-page">
      <section className="hero" aria-labelledby="profiles-title">
        <p className="eyebrow">Public identity</p>
        <h1 id="profiles-title">Every public profile and proof in one place</h1>
        <p className="seo-lead">
          A crawlable hub of public presence. Primary identity links use{" "}
          <code>rel=&quot;me&quot;</code>.
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
