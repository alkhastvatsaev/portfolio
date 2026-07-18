import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleView } from "@/components/article-view";
import { articlesEn, getArticle } from "@/data/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articlesEn.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug, "en");
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/articles/${article.slug}`,
      languages: {
        en: `/articles/${article.slug}`,
        "x-default": `/articles/${article.slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/articles/${article.slug}`,
      type: "article",
      images: ["/og-image.png"],
    },
  };
}

export default async function ArticleEnPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug, "en");
  if (!article) notFound();
  const related = articlesEn.filter((item) => item.slug !== article.slug);

  return (
    <ArticleView
      article={article}
      path={`/articles/${article.slug}`}
      related={related}
    />
  );
}
