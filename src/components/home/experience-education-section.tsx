"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { formalEducation, experiencesList } from "@/data/experiences";
import { ExperienceMediaItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export function ExperienceEducationSection() {
  const [selectedMedia, setSelectedMedia] =
    useState<ExperienceMediaItem | null>(null);

  useEffect(() => {
    if (!selectedMedia) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMedia(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMedia]);

  return (
    <section
      id="experiences"
      className="relative mx-auto max-w-[1120px] px-5 sm:px-8 py-20 sm:py-24"
    >
      {/* Important: items-start ensures the left column can be sticky while the right column scrolls */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12">
        {/* LEFT COLUMN — STICKY ON DESKTOP */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <h2 className="text-3xl sm:text-[40px] font-bold tracking-tight leading-[1.12] text-white">
            Experience,
            <br />
            Education
            <br />
            &amp; Milestones
          </h2>

          <p className="mt-4 text-xs sm:text-[13.5px] leading-relaxed text-zinc-400">
            From rigorous computer science foundations to crafting production
            applications for active startups. I merge software architecture with
            expressive interface aesthetics.
          </p>

          {/* Formal Education Block */}
          <div className="mt-10">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
              <span>FORMAL EDUCATION</span>
              <span className="font-normal normal-case tracking-normal text-zinc-500">
                2022 — Present
              </span>
            </div>

            <div className="mt-2.5 mb-4 h-px w-full bg-white/[0.07]" />

            <div className="space-y-3">
              {formalEducation.map((edu) => (
                <div
                  key={edu.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#18181C] px-5 py-4 transition-colors hover:border-white/[0.14]"
                >
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-white">
                      {edu.institution}
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-400">{edu.major}</p>
                  </div>

                  <span className="shrink-0 rounded-full border border-white/[0.06] bg-[#232329] px-3 py-1 text-[11px] font-medium text-zinc-300">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — SCROLLABLE TIMELINE (No View More, Full List) */}
        <div className="lg:col-span-7 relative pl-6 sm:pl-9">
          {/* Vertical Timeline Line */}
          <div
            aria-hidden="true"
            className="absolute left-[5px] top-3 bottom-3 w-px bg-white/[0.1]"
          />

          <div className="space-y-6">
            {experiencesList.map((exp) => (
              <div key={exp.id} className="relative">
                {/* Timeline Node Dot */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-6 sm:-left-9 top-2.5 h-[11px] w-[11px] rounded-full transition-all",
                    exp.isCurrent
                      ? "bg-[#C1C1FF] shadow-[0_0_12px_#C1C1FF] ring-4 ring-[#C1C1FF]/20"
                      : "bg-zinc-600 ring-4 ring-[#131315]"
                  )}
                />

                {/* Experience Card */}
                <article className="rounded-2xl border border-white/[0.07] bg-[#18181C] p-5 sm:p-6 transition-all duration-200 hover:border-white/[0.15] hover:bg-[#1B1B20]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[#8E8FBB]">
                      {exp.period}
                    </span>

                    <span className="inline-flex items-center rounded-md border border-white/[0.06] bg-[#24242B] px-2.5 py-0.5 text-[11px] font-medium text-zinc-300">
                      {exp.badgeType}
                    </span>
                  </div>

                  <h3 className="mt-1.5 text-base sm:text-[18px] font-bold text-white">
                    {exp.role}
                  </h3>

                  {exp.organization && (
                    <p className="mt-0.5 text-xs font-medium text-zinc-400">
                      {exp.organization}
                    </p>
                  )}

                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-zinc-400">
                    {exp.description}
                  </p>

                  {/* Tools Pills */}
                  {exp.tools && exp.tools.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center rounded-md border border-white/[0.06] bg-[#23232A] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Media Attachments (Clickable for Lightbox Modal Zoom) */}
                  {exp.mediaUrls && exp.mediaUrls.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {exp.mediaUrls.map((media) => (
                        <button
                          key={media.src}
                          type="button"
                          onClick={() => setSelectedMedia(media)}
                          aria-label={`Zoom image: ${media.alt}`}
                          className="group/media relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-white/[0.1] bg-zinc-900 text-left focus:outline-none focus:ring-2 focus:ring-[#8E8FBB]"
                        >
                          <Image
                            src={media.src}
                            alt={media.alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover/media:scale-105"
                            sizes="(max-width: 640px) 100vw, 280px"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover/media:bg-black/45 group-hover/media:opacity-100">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
                              <ZoomIn className="h-3.5 w-3.5 text-[#8E8FBB]" />
                              <span>Click to Zoom</span>
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Experience Certificates & Documentation Photos */}
      {selectedMedia && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedMedia.alt}
          onClick={() => setSelectedMedia(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#18181C] p-3 sm:p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between gap-4 px-1">
              <p className="text-xs sm:text-sm font-medium text-zinc-200">
                {selectedMedia.caption || selectedMedia.alt}
              </p>
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                aria-label="Close preview"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] bg-[#24242B] text-zinc-300 transition-colors hover:bg-white hover:text-zinc-950"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-black">
              <Image
                src={selectedMedia.src}
                alt={selectedMedia.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
