"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projectsList } from "@/data/projects";
import { ProjectCategory } from "@/types/portfolio";
import { ProjectCard } from "@/components/shared/project-card";
import { cn } from "@/lib/utils";

type CatalogFilter = "all" | ProjectCategory;

const CATALOG_TABS: { label: string; value: CatalogFilter }[] = [
  { label: "All Projects", value: "all" },
  { label: "Web Applications", value: "website" },
  { label: "Mobile Apps", value: "mobile" },
  { label: "UI/UX Design", value: "ui-ux" },
];

const ITEMS_PER_PAGE = 6;

export function ProjectsCatalog() {
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projectsList;
    return projectsList.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedProjects = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, safePage]);

  const handleFilterChange = (nextFilter: CatalogFilter) => {
    setActiveFilter(nextFilter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    const clamped = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative mx-auto max-w-[1120px] px-5 sm:px-8 pt-12 pb-20">
      {/* Top Header + Filter Tabs */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] text-white">
          All Projects<span className="text-[#8E8FBB]">.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-[540px] text-xs sm:text-[14px] leading-relaxed text-zinc-400">
          A showcase of web applications, mobile apps, and UI/UX projects
          developed with a strong focus on precise typography, high performance,
          and seamless developer experience.
        </p>

        {/* Centered Filter Capsule */}
        <div className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-white/[0.06] bg-[#16161A] p-1.5"
          >
            {CATALOG_TABS.map((tab) => {
              const active = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleFilterChange(tab.value)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200",
                    active
                      ? "bg-white font-semibold text-zinc-950 shadow-sm"
                      : "bg-[#1F1F25] text-zinc-400 hover:bg-[#26262E] hover:text-white"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2-Column x 3-Row Grid (6 Cards per Page) */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {paginatedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Pagination Bar matching Project Page.jpg */}
      <div className="mt-14 flex justify-center">
        <nav
          aria-label="Projects Pagination"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-[#16161A] px-3 py-1.5"
        >
          <button
            type="button"
            onClick={() => handlePageChange(safePage - 1)}
            disabled={safePage <= 1}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-zinc-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Prev</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const active = page === safePage;
            return (
              <button
                key={page}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => handlePageChange(page)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs transition-all",
                  active
                    ? "bg-white font-bold text-zinc-950 shadow-sm"
                    : "font-medium text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handlePageChange(safePage + 1)}
            disabled={safePage >= totalPages}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>Next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </nav>
      </div>
    </section>
  );
}
