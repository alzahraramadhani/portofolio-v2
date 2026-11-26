import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  projectsList,
  getProjectBySlug,
  getCategoryDisplayName,
} from "@/data/projects";
import { TechBadge } from "@/components/shared/tech-badge";
import { ProjectDetailMedia } from "@/components/projects/project-detail-media";
import { ProjectDetailLinks } from "@/components/projects/project-detail-links";
import { HiringCtaBanner } from "@/components/about/hiring-cta-banner";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectsList.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const techItems = project.technologies ?? project.techTags;
  const categoryLabel =
    project.categoryDetail ||
    `${getCategoryDisplayName(project.category)} · ${project.categoryBadge}`;

  const detailSections = [
    { id: "my-role", title: "My Role", items: project.myRole },
    { id: "features", title: "Features", items: project.features },
    { id: "impact", title: "Impact", items: project.impact },
  ];

  return (
    <div>
      <article className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-8 pb-6">
        {/* Back to Projects Link */}
        <div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#16161A] px-4 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-[#8E8FBB]/40 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Centered Title & Description */}
        <header className="mt-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white">
            {project.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[660px] text-sm sm:text-[15px] leading-relaxed text-zinc-400">
            {project.description}
          </p>
        </header>

        {/* Project Photo / White Placeholder + Lightbox */}
        <div className="mt-10">
          <ProjectDetailMedia
            title={project.title}
            thumbnailUrl={project.thumbnailUrl}
            galleryImages={project.galleryImages}
          />
        </div>

        {/* 3-Column Metadata Bar: TECHNOLOGIES | DETAILS | PROJECT LINKS */}
        <section
          aria-label="Project Metadata"
          className="mt-6 rounded-[24px] border border-white/[0.07] bg-[#18181C] p-6 sm:p-7"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-0 md:divide-x md:divide-white/[0.08]">
            {/* Column 1: TECHNOLOGIES */}
            <div className="md:col-span-5 md:pr-6">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                TECHNOLOGIES
              </h2>
              <div className="flex flex-wrap gap-2">
                {techItems.map((tech) => (
                  <TechBadge key={tech} name={tech} size="sm" />
                ))}
              </div>
            </div>

            {/* Column 2: DETAILS */}
            <div className="md:col-span-4 md:px-6">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                DETAILS
              </h2>
              <dl className="space-y-2 text-xs sm:text-[13px]">
                <div className="flex flex-wrap gap-x-1.5">
                  <dt className="text-zinc-400">Category:</dt>
                  <dd className="font-medium text-zinc-200">{categoryLabel}</dd>
                </div>
                <div className="flex flex-wrap gap-x-1.5">
                  <dt className="text-zinc-400">Year:</dt>
                  <dd className="font-medium text-zinc-200">{project.year}</dd>
                </div>
              </dl>
            </div>

            {/* Column 3: PROJECT LINKS */}
            <div className="flex flex-col justify-between md:col-span-3 md:pl-6">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                PROJECT LINKS
              </h2>
              <ProjectDetailLinks
                liveUrl={project.liveUrl ?? project.projectUrl}
                repoUrl={project.repoUrl}
                title={project.title}
              />
            </div>
          </div>
        </section>

        {/* 3 Minimalist Stacked Cards: My Role, Features, Impact */}
        <div className="mt-6 space-y-6">
          {detailSections.map((section) => (
            <section
              key={section.id}
              aria-labelledby={`heading-${section.id}`}
              className="rounded-[24px] border border-white/[0.07] bg-[#18181C] p-6 sm:p-8"
            >
              <h2
                id={`heading-${section.id}`}
                className="text-xl sm:text-[22px] font-bold tracking-tight text-white"
              >
                {section.title}
              </h2>

              <ul className="mt-4 space-y-3">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8E8FBB]"
                    />
                    <span className="text-sm sm:text-[15px] leading-relaxed text-zinc-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>

      {/* Collaboration CTA Banner matching About Page before Footer */}
      <HiringCtaBanner />
    </div>
  );
}
