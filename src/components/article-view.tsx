import Link from "next/link";

import { articleSchema, JsonLd } from "@/components/json-ld";
import type { Article } from "@/data/articles";

type Props = {
  article: Article;
  path: string;
  related: readonly Article[];
};

export function ArticleView({ article, path, related }: Props) {
  const isFr = article.locale === "fr";
  const home = isFr ? "/fr" : "/";
  const index = isFr ? "/fr/articles" : "/articles";

  return (
    <main id="main-content" lang={article.locale} className="article-page">
      <JsonLd
        data={articleSchema(
          article.title,
          article.description,
          path,
          article.date,
          article.locale,
        )}
      />

      <div className="article-shell">
        <nav className="article-breadcrumb" aria-label={isFr ? "Fil d’Ariane" : "Breadcrumb"}>
          <Link href={home}>{isFr ? "Accueil" : "Home"}</Link>
          <span aria-hidden="true"> / </span>
          <Link href={index}>{isFr ? "Articles" : "Articles"}</Link>
          <span aria-hidden="true"> / </span>
          <span>{article.title}</span>
        </nav>

        <article>
          <header className="article-header">
            <p className="eyebrow">
              {article.date} · {article.tags.slice(0, 3).join(" · ")}
            </p>
            <h1 id="article-title">{article.title}</h1>
            <p className="article-lead">{article.description}</p>
          </header>

          <div className="article-body">
            {article.body.map((section, index) => (
              <section
                className="article-section"
                key={section.heading ?? `section-${index}`}
                aria-labelledby={section.heading ? `section-${index}` : undefined}
              >
                {section.heading ? (
                  <h2 id={`section-${index}`}>{section.heading}</h2>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </article>

        <section className="article-footer" aria-labelledby="related-title">
          <p className="section-index">{isFr ? "Lire aussi" : "Related"}</p>
          <h2 id="related-title">
            {isFr ? "Continuer sur le portfolio" : "Keep exploring"}
          </h2>
          <div className="contact-links">
            {related.map((item) => (
              <Link key={item.slug} href={`${index}/${item.slug}`}>
                {item.title} <span aria-hidden="true">→</span>
              </Link>
            ))}
            <Link href={isFr ? "/fr/developpeur-full-stack" : "/"}>
              {isFr ? "Profil Full Stack" : "Portfolio home"}
            </Link>
            <a href="mailto:alkhastvatsaev@icloud.com">
              {isFr ? "Me contacter" : "Contact me"}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
