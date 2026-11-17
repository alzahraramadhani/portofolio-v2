"use client";

import React, { useState } from "react";
import {
  GitCommitHorizontal,
  Info,
  Folder,
  Star,
  GitFork,
  ArrowRight,
} from "lucide-react";
import { GitHubProfileData } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const LEVEL_COLOR_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-[#1E1E24]",
  1: "bg-[#252554]",
  2: "bg-[#2A2A8E]",
  3: "bg-[#8E8FBB]",
  4: "bg-[#FFFFFF]",
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_ROW_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

interface GitHubActivitySectionProps {
  data: GitHubProfileData;
}

export function GitHubActivitySection({ data }: GitHubActivitySectionProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
  } | null>(null);

  return (
    <section className="mx-auto max-w-[1120px] px-5 sm:px-8 py-6">
      <div className="rounded-[24px] border border-white/[0.07] bg-[#18181C] p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2.5">
            <GitCommitHorizontal className="h-5 w-5 text-[#8E9DF5]" />
            <h2 className="text-lg sm:text-[21px] font-bold tracking-tight text-white">
              GitHub Contribution Activity
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-[13px] text-zinc-400">
            Continuous shipping velocity across open-source and proprietary
            enterprise repositories.
          </p>
        </div>

        {/* Contribution Heatmap Matrix */}
        <div className="mt-7 overflow-x-auto pb-2">
          <div className="min-w-[740px]">
            {/* Month Labels */}
            <div className="mb-2 grid grid-cols-12 pl-9 text-[11px] font-medium text-zinc-400">
              {MONTHS.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>

            <div className="flex items-stretch gap-2">
              {/* Day of Week Labels (7 rows aligned 1:1 with the 7 aspect-square day cells per week) */}
              <div className="grid grid-rows-7 gap-[4px] self-stretch pr-1.5 text-[10px] font-medium leading-none text-zinc-400">
                {DAY_ROW_LABELS.map((label, idx) => (
                  <span
                    key={idx}
                    className="flex items-center"
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* 52 Weeks Grid — Exact 1:1 Squares (aspect-square) */}
              <div
                className="grid flex-1 gap-[4px]"
                style={{
                  gridTemplateColumns: `repeat(${Math.max(1, data.weeks.slice(-52).length)}, minmax(0, 1fr))`,
                }}
              >
                {data.weeks.slice(-52).map((week, wIdx) => (
                  <div key={wIdx} className="grid grid-rows-7 gap-[4px]">
                    {week.contributionDays.slice(0, 7).map((day) => (
                      <button
                        key={day.date}
                        type="button"
                        onMouseEnter={() =>
                          setHoveredDay({
                            date: day.date,
                            count: day.contributionCount,
                          })
                        }
                        onMouseLeave={() => setHoveredDay(null)}
                        onFocus={() =>
                          setHoveredDay({
                            date: day.date,
                            count: day.contributionCount,
                          })
                        }
                        onBlur={() => setHoveredDay(null)}
                        aria-label={`${day.contributionCount} contributions on ${day.date}`}
                        className={cn(
                          "aspect-square w-full rounded-[3px] transition-transform duration-150 hover:scale-125 focus:outline-none",
                          LEVEL_COLOR_CLASSES[day.level]
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar & Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-medium text-zinc-400">
          <div className="flex items-center gap-2">
            <Info className="h-3.5 w-3.5 text-zinc-400" />
            {hoveredDay ? (
              <span className="text-zinc-200">
                {hoveredDay.count} contributions on {hoveredDay.date}
              </span>
            ) : (
              <span>
                Updated via live GitHub sync (@{data.username} ·{" "}
                {data.totalContributions} contributions in the last year)
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span>Less</span>
            {([0, 1, 2, 3, 4] as const).map((lvl) => (
              <span
                key={lvl}
                className={cn(
                  "inline-block aspect-square h-3 w-3 rounded-[2.5px]",
                  LEVEL_COLOR_CLASSES[lvl]
                )}
              />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Pinned Repositories Section */}
        <div className="mt-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
              PINNED REPOSITORIES &amp; CORE PACKAGES
            </h3>

            <a
              href={`https://github.com/${data.username}/?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-zinc-300 transition-colors hover:text-white"
            >
              <span>VIEW ALL ON GITHUB</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {data.pinnedRepos.slice(0, 6).map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#201F24] p-5 transition-all duration-200 hover:border-[#8E8FBB]/40 hover:bg-[#25252D]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Folder className="h-4 w-4 shrink-0 text-[#8E9DF5]" />
                      <span className="truncate text-xs sm:text-[13px] font-semibold text-white group-hover:text-[#B4B6FF]">
                        {repo.name}
                      </span>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#2B2B34] px-2.5 py-0.5 text-[10px] font-medium text-zinc-400">
                      {repo.visibility}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-zinc-400">
                    {repo.description ||
                      `Open-source repository maintained by @${data.username} on GitHub.`}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between pt-2 text-[11px] font-medium text-zinc-300">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          repo.primaryLanguage?.color || "#8E8FBB",
                      }}
                    />
                    <span>{repo.primaryLanguage?.name || "TypeScript"}</span>
                  </div>

                  <div className="flex items-center gap-3 text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stargazerCount}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {repo.forkCount}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
