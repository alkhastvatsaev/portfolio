import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Hire a Fullstack JavaScript/TypeScript Developer in Paris | Alkhast Vatsaev",
  description:
    "Fullstack JavaScript/TypeScript profile in Paris: live demos, GitHub repos, stack and contact — evaluate Alkhast Vatsaev in under three minutes.",
  keywords: [
    "fullstack developer Paris",
    "hire junior fullstack",
    "React Next.js TypeScript",
    "Alkhast Vatsaev",
  ],
  alternates: {
    canonical: "/for-recruiters",
    languages: {
      en: "/for-recruiters",
      fr: "/fr/pour-recruteurs",
      "x-default": "/for-recruiters",
    },
  },
  openGraph: {
    title:
      "Hire a Fullstack JavaScript/TypeScript Developer in Paris — Alkhast Vatsaev",
    description:
      "Proof in 3 minutes: demos, GitHub, resume and contact. Fullstack React / Next.js / TypeScript in Paris.",
    url: "/for-recruiters",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Alkhast Vatsaev — Fullstack JavaScript/TypeScript Developer in Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image.png"],
  },
};

export default function ForRecruitersPage() {
  return (
    <main id="main-content" className="seo-page">
      <section className="hero" aria-labelledby="recruiter-title">
        <div className="eyebrow-row">
          <p className="eyebrow">For recruiters</p>
          <p className="availability">
            <span aria-hidden="true" />
            Paris · CDI / hybrid / remote · Available now
          </p>
        </div>
        <h1 id="recruiter-title">For recruiters</h1>
        <p className="seo-lead">
          Everything you need to evaluate this profile in under three minutes.
        </p>
        <div className="hero-actions">
          <a
            className="button button-primary"
            href="mailto:alkhastvatsaev@icloud.com"
          >
            Email me
          </a>
          <Link className="button button-secondary" href="/projects">
            Case studies
          </Link>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="short-title">
        <div className="section-heading">
          <p className="section-index">The short version</p>
          <h2 id="short-title">Level, stack, availability.</h2>
        </div>
        <div className="profile-copy single-col">
          <ul className="seo-city-list">
            <li>
              <strong>Role:</strong> fullstack JavaScript/TypeScript — React,
              Next.js, Node.js, Firebase.
            </li>
            <li>
              <strong>Level:</strong> early-career, production-focused — judge
              the shipped work below rather than a title.
            </li>
            <li>
              <strong>Experience:</strong> documented portfolio projects (demo +
              repo + tests). Before code: high-jewelry 3D design (Cartier, Van
              Cleef &amp; Arpels) via Atelier de l&apos;Objet.
            </li>
            <li>
              <strong>Location:</strong> Paris — on-site, hybrid or full remote.
            </li>
            <li>
              <strong>Contract:</strong> CDI preferred, open to freelance.
            </li>
            <li>
              <strong>Availability:</strong> immediate.
            </li>
            <li>
              <strong>Compensation:</strong> 40–45k€ depending on scope and
              remote.
            </li>
            <li>
              <strong>Response time:</strong> under 24 hours.
            </li>
          </ul>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="verify-title">
        <div className="section-heading">
          <p className="section-index">Proof</p>
          <h2 id="verify-title">Verify, don&apos;t trust</h2>
        </div>
        <div className="profile-copy single-col">
          <p>
            Four documented case studies, each with a live demo and full source
            code. Automated tests (Vitest, Playwright) and English documentation
            on every flagship repository.
          </p>
        </div>
        <div className="contact-links">
          <Link href="/projects">
            Case studies <span aria-hidden="true">→</span>
          </Link>
          <a
            href="https://github.com/alkhastvatsaev"
            target="_blank"
            rel="me noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <Link href="/resume">
            One-page resume <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="why-title">
        <div className="section-heading">
          <p className="section-index">Angle</p>
          <h2 id="why-title">
            Why an early-career profile from Place Vendôme
          </h2>
        </div>
        <div className="profile-copy single-col">
          <p>
            Many early-career applications ask you to bet on potential. This one
            asks you to review shipped work: authentication, Stripe payments,
            maps, real-time chat, PDF generation, automated tests, deployment —
            already built, already live. The obsession with detail comes from
            Place Vendôme jewelry. It transferred.
          </p>
        </div>
      </section>

      <section className="contact-section" aria-labelledby="process-title">
        <p className="section-index">Process</p>
        <h2 id="process-title">How you can evaluate me</h2>
        <p>
          Pick the format you prefer: a live code review of any of my
          repositories, a technical take-home, or a pairing session. I&apos;m
          comfortable being evaluated on real work.
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
          <Link href="/resume">
            Resume <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
