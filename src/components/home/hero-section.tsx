"use client";

import React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export function HeroSection() {
  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("featured-projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-12 pb-12 sm:pt-16 sm:pb-14 text-center">
      <div className="mx-auto max-w-[820px] px-5 sm:px-8">
        <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.08] text-white">
          <span className="block">{siteConfig.hero.titleLine1}</span>
          <span className="block bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 bg-clip-text text-transparent">
            {siteConfig.hero.titleLine2}
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-[540px] text-[13.5px] sm:text-[15px] leading-relaxed text-zinc-400">
          {siteConfig.hero.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#featured-projects"
            onClick={handleExploreClick}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-[13px] font-semibold text-zinc-950 shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-zinc-200"
          >
            <span>Explore Projects</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </a>

          <a
            href={siteConfig.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-[#17171C]/90 px-5 py-2.5 text-xs sm:text-[13px] font-medium text-zinc-200 transition-all duration-200 hover:border-white/20 hover:bg-[#222229] hover:text-white"
          >
            <span>Download CV</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
