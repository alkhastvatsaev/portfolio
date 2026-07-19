import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyView } from "@/components/case-study-view";
import { getProjectBySlug, projectsFr } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectsFr.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "fr");
  if (!project) return {};
  return {
    title: `${project.name} — Étude de cas Full Stack`,
    description: project.summary,
    alternates: {
      canonical: `/fr/projets/${project.slug}`,
      languages: {
        en: `/projects/${project.slug}`,
        fr: `/fr/projets/${project.slug}`,
        "x-default": `/projects/${project.slug}`,
      },
    },
    openGraph: {
      title: `${project.name} — Alkhast Vatsaev`,
      description: project.summary,
      url: `/fr/projets/${project.slug}`,
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

export default async function ProjetCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "fr");
  if (!project) notFound();

  return (
    <CaseStudyView
      project={project}
      locale="fr"
      path={`/fr/projets/${project.slug}`}
      allProjects={projectsFr}
    />
  );
}
