import type { Metadata } from "next";
import Link from "next/link";

import { newsEn } from "@/data/news";

export const metadata: Metadata = {
  title: "News — Alkhast Vatsaev",
  description:
    "Updates on product proofs, shipped features and job-search experiments by Alkhast Vatsaev.",
  alternates: {
    canonical: "/news",
    languages: {
      en: "/news",
      fr: "/fr/news",
      "x-default": "/news",
    },
  },
};

export default function NewsEnIndex() {
  return (
    <main id="main-content" className="seo-page">
      <section className="hero" aria-labelledby="news-title">
        <p className="eyebrow">Updates</p>
        <h1 id="news-title">News</h1>
        <p className="seo-lead">
          What I ship, when I ship it — product proofs instead of cold CVs.
        </p>
      </section>
      <section className="work-section">
        <div className="project-list">
          {newsEn.map((item, index) => (
            <article className="project" key={item.slug}>
              <div className="project-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="project-copy">
                <p className="project-label">{item.date}</p>
                <h2>
                  <Link href={`/news/${item.slug}`}>{item.title}</Link>
                </h2>
                <p className="project-summary">{item.description}</p>
              </div>
              <div className="project-links">
                <Link href={`/news/${item.slug}`}>
                  Read <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
