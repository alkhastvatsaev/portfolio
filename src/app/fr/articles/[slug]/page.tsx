import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleView } from "@/components/article-view";
import { articlesFr, getArticle } from "@/data/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articlesFr.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug, "fr");
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/fr/articles/${article.slug}`,
      languages: {
        fr: `/fr/articles/${article.slug}`,
        "x-default": `/fr/articles/${article.slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/fr/articles/${article.slug}`,
      type: "article",
      locale: "fr_FR",
      images: [
        {
          url: "/fr/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript à Paris",
        },
      ],
    },
  };
}

export default async function ArticleFrPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug, "fr");
  if (!article) notFound();
  const related = articlesFr.filter((item) => item.slug !== article.slug);

  return (
    <ArticleView
      article={article}
      path={`/fr/articles/${article.slug}`}
      related={related}
    />
  );
}
