import Link from "next/link";

import { projects, provenStack } from "@/data/projects";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <div className="eyebrow-row">
          <p className="eyebrow">
            Paris · Junior Fullstack JavaScript / TypeScript Developer
          </p>
          <p className="availability">
            <span aria-hidden="true" />
            Open to junior opportunities
          </p>
        </div>
        <h1 id="hero-title">
          I build useful web products from interface to backend.
        </h1>
        <div className="hero-footer">
          <p className="hero-intro">
            I’m Alkhast Vatsaev, a junior fullstack developer working with
            React, Next.js and TypeScript. My portfolio is built around shipped
            projects, not inflated titles.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              View selected work
            </a>
            <a
              className="button button-secondary"
              href="mailto:alkhastvatsaev@icloud.com"
            >
              Start a conversation
            </a>
          </div>
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="section-index">01 / Selected work</p>
          <h2 id="work-title">Four products, each solving a concrete problem.</h2>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project" key={project.name}>
              <div className="project-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="project-copy">
                <p className="project-label">{project.label}</p>
                <h3>{project.name}</h3>
                <p className="project-summary">{project.summary}</p>
                <p className="project-detail">{project.detail}</p>
                <ul className="project-stack" aria-label={`${project.name} stack`}>
                  {project.stack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
              <div className="project-links">
                <a href={project.live} target="_blank" rel="noreferrer">
                  Live project <span aria-hidden="true">↗</span>
                </a>
                <a href={project.source} target="_blank" rel="noreferrer">
                  Source code <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stack-section" id="stack" aria-labelledby="stack-title">
        <div className="section-heading">
          <p className="section-index">02 / Proven stack</p>
          <h2 id="stack-title">Tools used in the projects above.</h2>
        </div>
        <div className="stack-layout">
          <p>
            I work across frontend, backend services and integrations, choosing
            tools based on the product rather than collecting labels.
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
        <h2 id="contact-title">Looking for a junior developer in Paris?</h2>
        <p>
          I’m available to discuss fullstack JavaScript and TypeScript roles,
          product teams and practical web projects.
        </p>
        <div className="contact-links">
          <a href="mailto:alkhastvatsaev@icloud.com">
            alkhastvatsaev@icloud.com <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/alkhastvatsaev"
            target="_blank"
            rel="noreferrer"
          >
            github.com/alkhastvatsaev <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/alkhast-vatsaev/"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/alkhast-vatsaev{" "}
            <span aria-hidden="true">↗</span>
          </a>
          <Link href="/resume">
            One-page resume <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
