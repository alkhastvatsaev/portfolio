import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For recruiters — Junior Fullstack developer in 60 seconds",
  description:
    "Recruiter page for Alkhast Vatsaev: proof, stack, demos, GitHub, resume and contact for junior fullstack JavaScript/TypeScript roles.",
  alternates: {
    canonical: "/for-recruiters",
    languages: {
      en: "/for-recruiters",
      fr: "/fr/pour-recruteurs",
      "x-default": "/for-recruiters",
    },
  },
};

const proofs = [
  {
    title: "Portfolio + case studies",
    href: "/projects",
    text: "Problem, approach, stack, live demo and repo for each flagship project.",
  },
  {
    title: "One-page resume",
    href: "/resume",
    text: "Condensed experience and stack, print-ready.",
  },
  {
    title: "GitHub",
    href: "https://github.com/alkhastvatsaev",
    text: "Public documented repositories with CI on main projects.",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/alkhast-vatsaev/",
    text: "Public profile aligned with the same positioning.",
  },
];

export default function ForRecruitersPage() {
  return (
    <main id="main-content" className="seo-page">
      <section className="hero" aria-labelledby="recruiter-title">
        <div className="eyebrow-row">
          <p className="eyebrow">Recruiters · 60 seconds</p>
          <p className="availability">
            <span aria-hidden="true" />
            Junior · France · Remote OK
          </p>
        </div>
        <h1 id="recruiter-title">
          Alkhast Vatsaev — junior fullstack developer, proof first.
        </h1>
        <p className="seo-lead">
          JavaScript / TypeScript · React · Next.js · Node.js · Firebase.
          Based in Paris, open to hybrid or fully remote roles in France.
        </p>
        <div className="hero-actions">
          <a
            className="button button-primary"
            href="mailto:alkhastvatsaev@icloud.com"
          >
            Email me
          </a>
          <Link className="button button-secondary" href="/projects">
            View case studies
          </Link>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="proof-title">
        <div className="section-heading">
          <p className="section-index">Proof</p>
          <h2 id="proof-title">Four links to validate the profile.</h2>
        </div>
        <ul className="recruiter-proof-list">
          {proofs.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                rel={item.href.startsWith("http") ? "noreferrer me" : undefined}
              >
                {item.title}
              </a>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="contact-section" aria-labelledby="next-title">
        <p className="section-index">Next</p>
        <h2 id="next-title">Evaluation checklist</h2>
        <div className="contact-links">
          <Link href="/articles/recruiter-checklist-junior-developer">
            Recruiter checklist <span aria-hidden="true">→</span>
          </Link>
          <Link href="/profiles">
            Public profiles hub <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
