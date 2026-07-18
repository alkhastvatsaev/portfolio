import type { Metadata } from "next";
import Link from "next/link";

import { articlesFr } from "@/data/articles";

export const metadata: Metadata = {
  title: "Articles — Développeur Full Stack junior",
  description:
    "Articles d’Alkhast Vatsaev sur le métier de développeur Full Stack junior en France, l’évaluation de portfolios et Next.js/Firebase.",
  alternates: {
    canonical: "/fr/articles",
    languages: {
      fr: "/fr/articles",
      en: "/articles",
      "x-default": "/fr/articles",
    },
  },
};

export default function ArticlesFrIndex() {
  return (
    <main id="main-content" lang="fr" className="seo-page">
      <section className="hero" aria-labelledby="articles-title">
        <p className="eyebrow">Contenu / SEO long-tail</p>
        <h1 id="articles-title">Articles pour recruteurs et candidats juniors</h1>
        <p className="seo-lead">
          Textes utiles autour du Full Stack junior en France, de la vérification
          de portfolios et de la stack Next.js / Firebase.
        </p>
      </section>
      <section className="work-section">
        <div className="project-list">
          {articlesFr.map((article, index) => (
            <article className="project" key={article.slug}>
              <div className="project-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="project-copy">
                <p className="project-label">{article.date}</p>
                <h2>
                  <Link href={`/fr/articles/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="project-summary">{article.description}</p>
              </div>
              <div className="project-links">
                <Link href={`/fr/articles/${article.slug}`}>
                  Lire <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
