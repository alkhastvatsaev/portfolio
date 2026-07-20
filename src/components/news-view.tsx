import Link from "next/link";

import { articleSchema, JsonLd } from "@/components/json-ld";
import type { NewsItem } from "@/data/news";

type Props = {
  item: NewsItem;
  path: string;
  related: readonly NewsItem[];
};

export function NewsView({ item, path, related }: Props) {
  const isFr = item.locale === "fr";
  const home = isFr ? "/fr" : "/";
  const index = isFr ? "/fr/news" : "/news";

  return (
    <main id="main-content" lang={item.locale} className="article-page">
      <JsonLd
        data={articleSchema(
          item.title,
          item.description,
          path,
          item.date,
          item.locale,
        )}
      />

      <div className="article-shell">
        <nav className="article-breadcrumb" aria-label={isFr ? "Fil d’Ariane" : "Breadcrumb"}>
          <Link href={home}>{isFr ? "Accueil" : "Home"}</Link>
          <span aria-hidden="true"> / </span>
          <Link href={index}>News</Link>
          <span aria-hidden="true"> / </span>
          <span>{item.title}</span>
        </nav>

        <article>
          <header className="article-header">
            <p className="eyebrow">
              {item.date} · {item.tags.slice(0, 3).join(" · ")}
            </p>
            <h1 id="news-title">{item.title}</h1>
            <p className="article-lead">{item.description}</p>
            {item.links && item.links.length > 0 ? (
              <div className="contact-links">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            ) : null}
          </header>

          <div className="article-body">
            {item.body.map((section, index) => (
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
          <p className="section-index">{isFr ? "Voir aussi" : "Also see"}</p>
          <h2 id="related-title">
            {isFr ? "Autres news et preuves" : "More news and proof"}
          </h2>
          <div className="contact-links">
            {related.map((entry) => (
              <Link key={entry.slug} href={`${index}/${entry.slug}`}>
                {entry.title} <span aria-hidden="true">→</span>
              </Link>
            ))}
            <Link href={isFr ? "/fr/pour-recruteurs" : "/for-recruiters"}>
              {isFr ? "Page recruteurs" : "Recruiter page"}
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
