"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";

interface ProjectDetailLinksProps {
  liveUrl?: string;
  repoUrl?: string;
  title: string;
}

export function ProjectDetailLinks({
  liveUrl,
  repoUrl,
  title,
}: ProjectDetailLinksProps) {
  const hasLiveUrl = Boolean(liveUrl) && liveUrl !== "#";
  const hasRepoUrl = Boolean(repoUrl) && repoUrl !== "#";

  return (
    <div className="flex flex-col gap-2.5">
      <a
        href={liveUrl || "#"}
        target={hasLiveUrl ? "_blank" : undefined}
        rel={hasLiveUrl ? "noopener noreferrer" : undefined}
        onClick={(e) => {
          if (!hasLiveUrl) e.preventDefault();
        }}
        aria-label={`Live Demo for ${title}`}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-[13px] font-semibold text-zinc-950 shadow-[0_0_20px_rgba(255,255,255,0.14)] transition-all duration-200 hover:bg-zinc-200"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        <span>Live Demo</span>
      </a>

      {repoUrl && (
        <a
          href={repoUrl}
          target={hasRepoUrl ? "_blank" : undefined}
          rel={hasRepoUrl ? "noopener noreferrer" : undefined}
          onClick={(e) => {
            if (!hasRepoUrl) e.preventDefault();
          }}
          aria-label={`Source Code for ${title}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-[#23232A] px-5 py-2.5 text-xs sm:text-[13px] font-medium text-zinc-200 transition-all duration-200 hover:border-white/20 hover:bg-[#2B2B34] hover:text-white"
        >
          <SiGithub className="h-3.5 w-3.5 text-zinc-300" />
          <span>Source Code</span>
        </a>
      )}
    </div>
  );
}
