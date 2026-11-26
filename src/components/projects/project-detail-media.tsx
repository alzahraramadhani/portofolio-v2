"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { ProjectMediaItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectDetailMediaProps {
  title: string;
  thumbnailUrl?: string;
  galleryImages?: ProjectMediaItem[];
}

export function ProjectDetailMedia({
  title,
  thumbnailUrl,
  galleryImages,
}: ProjectDetailMediaProps) {
  const images: ProjectMediaItem[] =
    galleryImages && galleryImages.length > 0
      ? galleryImages
      : thumbnailUrl
        ? [{ src: thumbnailUrl, alt: title }]
        : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  if (images.length === 0) {
    return (
      <div
        className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        aria-label={`${title} preview placeholder`}
      />
    );
  }

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label={`Zoom image: ${activeImage.alt}`}
        className="group relative block aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#18181C] text-left shadow-[0_20px_60px_rgba(0,0,0,0.45)] focus:outline-none focus:ring-2 focus:ring-[#8E8FBB]"
      >
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1120px) 100vw, 1120px"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/35 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm">
            <ZoomIn className="h-4 w-4 text-[#8E8FBB]" />
            <span>Click to Zoom</span>
          </span>
        </div>
      </button>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Select project image ${idx + 1}`}
                className={cn(
                  "relative aspect-[16/10] overflow-hidden rounded-xl border transition-all",
                  isActive
                    ? "border-[#8E8FBB] ring-2 ring-[#8E8FBB]/30"
                    : "border-white/[0.08] opacity-65 hover:opacity-100"
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </button>
            );
          })}
        </div>
      )}

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#18181C] p-3 sm:p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between gap-4 px-1">
              <p className="text-xs sm:text-sm font-medium text-zinc-200">
                {activeImage.caption || activeImage.alt}
              </p>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close preview"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] bg-[#24242B] text-zinc-300 transition-colors hover:bg-white hover:text-zinc-950"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1024px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
