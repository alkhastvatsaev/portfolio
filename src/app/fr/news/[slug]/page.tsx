import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsView } from "@/components/news-view";
import { getNewsItem, newsFr } from "@/data/news";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsFr.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug, "fr");
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    alternates: {
      canonical: `/fr/news/${item.slug}`,
      languages: {
        fr: `/fr/news/${item.slug}`,
        en: `/news/${item.slug}`,
        "x-default": `/fr/news/${item.slug}`,
      },
    },
    openGraph: {
      title: item.title,
      description: item.description,
      url: `/fr/news/${item.slug}`,
      type: "article",
      locale: "fr_FR",
      images: [
        {
          url: "/fr/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "Alkhast Vatsaev — Développeur Full Stack JavaScript/TypeScript à Paris",
        },
      ],
    },
  };
}

export default async function NewsFrPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsItem(slug, "fr");
  if (!item) notFound();
  const related = newsFr.filter((entry) => entry.slug !== item.slug);

  return (
    <NewsView
      item={item}
      path={`/fr/news/${item.slug}`}
      related={related}
    />
  );
}
