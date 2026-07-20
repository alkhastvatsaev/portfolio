import type { Metadata } from "next";
import Link from "next/link";

import { newsFr } from "@/data/news";

export const metadata: Metadata = {
  title: "News — Alkhast Vatsaev",
  description:
    "Actualités : preuves produit, features shipées et expériences de candidature d’Alkhast Vatsaev.",
  alternates: {
    canonical: "/fr/news",
    languages: {
      fr: "/fr/news",
      en: "/news",
      "x-default": "/fr/news",
    },
  },
};

export default function NewsFrIndex() {
  return (
    <main id="main-content" lang="fr" className="seo-page">
      <section className="hero" aria-labelledby="news-title">
        <p className="eyebrow">Actualités</p>
        <h1 id="news-title">News</h1>
        <p className="seo-lead">
          Ce que je ship, quand je le ship — des preuves produit plutôt que des
          CVs à froid.
        </p>
      </section>
      <section className="work-section">
        <div className="project-list">
          {newsFr.map((item, index) => (
            <article className="project" key={item.slug}>
              <div className="project-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="project-copy">
                <p className="project-label">{item.date}</p>
                <h2>
                  <Link href={`/fr/news/${item.slug}`}>{item.title}</Link>
                </h2>
                <p className="project-summary">{item.description}</p>
              </div>
              <div className="project-links">
                <Link href={`/fr/news/${item.slug}`}>
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
