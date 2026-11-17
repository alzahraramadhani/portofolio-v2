"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectItem;
  compact?: boolean;
}

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const hasExternalUrl =
    Boolean(project.projectUrl) && project.projectUrl !== "#";

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hasExternalUrl) {
      e.preventDefault();
    }
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#1B1B1F] transition-all duration-300 hover:border-[#8E8FBB]/30 hover:bg-[#202026] hover:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.7)]",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6"
      )}
    >
      <div>
        {/* White Thumbnail Box (#FFFFFF) per user instructions until real screenshots are added */}
        <div
          className={cn(
            "relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white shadow-inner",
            compact ? "mb-4" : "mb-5"
          )}
        >
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes={
                compact
                  ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  : "(max-width: 768px) 100vw, 50vw"
              }
            />
          ) : (
            <div
              className="h-full w-full bg-white"
              aria-label={`${project.title} preview placeholder`}
            />
          )}
        </div>

        {/* Category Badge + Year */}
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-[#25252D] px-2 py-0.5 text-[11px] font-medium text-[#9EA0CD]">
            {project.categoryBadge}
          </span>
          <span className="text-[11px] font-medium text-zinc-500">
            • {project.year}
          </span>
        </div>

        {/* Project Title */}
        <h3
          className={cn(
            "mb-1.5 font-bold tracking-tight text-white transition-colors group-hover:text-white",
            compact ? "text-base sm:text-[17px]" : "mb-2 text-lg sm:text-[21px]"
          )}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "line-clamp-2 leading-relaxed text-zinc-400",
            compact ? "mb-4 text-xs sm:text-[12.5px]" : "mb-6 text-[13.5px]"
          )}
        >
          {project.description}
        </p>
      </div>

      {/* Bottom Row: Tech Tags + External Link Arrow */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "inline-flex items-center rounded-md border border-white/[0.05] bg-[#24242B] font-medium text-zinc-300",
                compact ? "px-2 py-0.5 text-[10.5px]" : "px-2.5 py-1 text-[11px]"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.projectUrl || "#"}
          target={hasExternalUrl ? "_blank" : undefined}
          rel={hasExternalUrl ? "noopener noreferrer" : undefined}
          onClick={handleLinkClick}
          aria-label={`Open ${project.title}`}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}
