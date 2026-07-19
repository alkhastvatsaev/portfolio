import type { Metadata } from "next";
import Link from "next/link";

import { articlesEn } from "@/data/articles";

export const metadata: Metadata = {
  title: "Articles — Fullstack developer",
  description:
    "Articles by Alkhast Vatsaev on fullstack portfolios and how recruiters can verify developer work.",
  alternates: {
    canonical: "/articles",
    languages: {
      en: "/articles",
      fr: "/fr/articles",
      "x-default": "/articles",
    },
  },
};

export default function ArticlesEnIndex() {
  return (
    <main id="main-content" className="seo-page">
      <section className="hero" aria-labelledby="articles-title">
        <p className="eyebrow">Long-tail content</p>
        <h1 id="articles-title">Articles for recruiters and builders</h1>
        <p className="seo-lead">
          Practical writing on fullstack proof, portfolio review and recruiter
          evaluation.
        </p>
      </section>
      <section className="work-section">
        <div className="project-list">
          {articlesEn.map((article, index) => (
            <article className="project" key={article.slug}>
              <div className="project-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="project-copy">
                <p className="project-label">{article.date}</p>
                <h2>
                  <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="project-summary">{article.description}</p>
              </div>
              <div className="project-links">
                <Link href={`/articles/${article.slug}`}>
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
