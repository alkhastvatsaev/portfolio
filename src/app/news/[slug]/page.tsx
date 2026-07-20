import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsView } from "@/components/news-view";
import { getNewsItem, newsEn } from "@/data/news";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsEn.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug, "en");
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    alternates: {
      canonical: `/news/${item.slug}`,
      languages: {
        en: `/news/${item.slug}`,
        fr: `/fr/news/${item.slug}`,
        "x-default": `/news/${item.slug}`,
      },
    },
    openGraph: {
      title: item.title,
      description: item.description,
      url: `/news/${item.slug}`,
      type: "article",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "Alkhast Vatsaev — Fullstack JavaScript/TypeScript Developer in Paris",
        },
      ],
    },
  };
}

export default async function NewsEnPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsItem(slug, "en");
  if (!item) notFound();
  const related = newsEn.filter((entry) => entry.slug !== item.slug);

  return (
    <NewsView item={item} path={`/news/${item.slug}`} related={related} />
  );
}
