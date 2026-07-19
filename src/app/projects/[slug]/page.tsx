import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyView } from "@/components/case-study-view";
import { getProjectBySlug, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "en");
  if (!project) return {};
  return {
    title: `${project.name} — Fullstack case study`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
      languages: {
        en: `/projects/${project.slug}`,
        fr: `/fr/projets/${project.slug}`,
        "x-default": `/projects/${project.slug}`,
      },
    },
    openGraph: {
      title: `${project.name} — Alkhast Vatsaev`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Alkhast Vatsaev — Fullstack JavaScript/TypeScript Developer in Paris",
        },
      ],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "en");
  if (!project) notFound();

  return (
    <CaseStudyView
      project={project}
      locale="en"
      path={`/projects/${project.slug}`}
      allProjects={projects}
    />
  );
}
