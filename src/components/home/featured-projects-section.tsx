"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsList } from "@/data/projects";
import { ProjectCategory } from "@/types/portfolio";
import { ProjectCard } from "@/components/shared/project-card";
import { cn } from "@/lib/utils";

type FilterValue = "all" | ProjectCategory;

const FILTER_TABS: { label: string; value: FilterValue }[] = [
  { label: "All Projects", value: "all" },
  { label: "Mobile", value: "mobile" },
  { label: "Website", value: "website" },
  { label: "UI/UX Design", value: "ui-ux" },
];

export function FeaturedProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const displayedProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projectsList.filter((p) => p.featured).slice(0, 4);
    }
    return projectsList
      .filter((p) => p.category === activeFilter)
      .slice(0, 4);
  }, [activeFilter]);

  return (
    <section
      id="featured-projects"
      className="mx-auto max-w-[1120px] px-5 sm:px-8 py-16 sm:py-20"
    >
      {/* Header + Filter Bar */}
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl sm:text-[38px] font-bold tracking-tight text-white">
            Featured Projects
          </h2>
          <p className="mt-2 text-xs sm:text-[13.5px] text-zinc-400">
            Selected showcase of my recent production systems and client work.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter featured projects by category"
          className="inline-flex flex-wrap items-center gap-1 self-start md:self-auto rounded-full border border-white/[0.08] bg-[#16161A] p-1"
        >
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(tab.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200",
                  active
                    ? "bg-white font-semibold text-zinc-950 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2x2 Project Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* View More -> /projects */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-zinc-300 transition-colors hover:text-white"
        >
          <span>View More</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
