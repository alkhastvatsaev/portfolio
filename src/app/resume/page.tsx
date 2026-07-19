import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PrintButton } from "@/components/print-button";
import { projects, provenStack } from "@/data/projects";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Project-focused resume for Alkhast Vatsaev, fullstack JavaScript and TypeScript developer in Paris.",
  alternates: {
    canonical: "/resume",
    languages: {
      en: "/resume",
      fr: "/fr/resume",
      "x-default": "/resume",
    },
  },
};

export default function ResumePage() {
  return (
    <main className="resume-shell" id="main-content">
      <div className="resume-toolbar">
        <Link href="/">← Back to portfolio</Link>
        <PrintButton />
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
                Fullstack JavaScript/TypeScript Developer
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
          <h2 id="resume-profile">Profile</h2>
          <p>
            Fullstack developer building practical web applications across user
            interfaces, backend services and third-party integrations. Project
            experience includes operations tools, logistics, local delivery and
            interactive 3D product configuration.
          </p>
        </section>

        <section className="resume-section" aria-labelledby="resume-projects">
          <h2 id="resume-projects">Selected projects</h2>
          <div className="resume-projects">
            {projects.slice(0, 3).map((project) => (
              <article key={project.name}>
                <div className="resume-project-heading">
                  <h3>{project.name}</h3>
                  <a href={project.source}>Source</a>
                  <span aria-hidden="true">·</span>
                  <a href={project.live}>Live</a>
                </div>
                <p>{project.summary}</p>
                <p className="resume-tech">{project.stack.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section resume-skills" aria-labelledby="resume-stack">
          <h2 id="resume-stack">Technical stack</h2>
          <p>{provenStack.join(" · ")}</p>
        </section>
      </article>
    </main>
  );
}
