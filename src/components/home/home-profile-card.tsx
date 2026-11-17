import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { homeProfileTechStack } from "@/data/tech-stack";
import { TechBadge } from "@/components/shared/tech-badge";

export function HomeProfileCard() {
  return (
    <section
      aria-label="Profile Summary"
      className="relative mx-auto max-w-[960px] px-5 sm:px-8 pb-20"
    >
      {/* Curved Blue Horizon glow behind the top border of the Profile Card (matching Figma) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-32 w-[74%] -translate-x-1/2 rounded-full bg-[#5860C8]/40 blur-[50px]"
      />

      {/* Left & Right Overlay+Blur accents flanking the Profile Card (Figma: W 600, H 500, #C4E7FF 10%) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[340px] top-10 -z-10 h-[500px] w-[600px] rounded-full bg-[#C4E7FF]/[0.10] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[340px] -top-6 -z-10 h-[500px] w-[600px] rounded-full bg-[#C4E7FF]/[0.10] blur-[120px]"
      />

      <div className="profile-card-gradient relative mx-auto max-w-[896px] overflow-hidden rounded-[16px] border border-white/[0.08] p-6 sm:p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        {/* Horizontal Divider — Top edge highlight matching Figma */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#A5B4FC]/55 to-transparent"
        />

        <div className="flex flex-col items-center gap-7 md:flex-row md:items-start md:gap-9">
          {/* Left: Portrait Image */}
          <div className="relative aspect-[3/4] w-full max-w-[240px] md:w-[245px] shrink-0 overflow-hidden rounded-2xl border-2 border-zinc-400/50 bg-zinc-900 shadow-xl">
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.fullName}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 240px, 245px"
            />
          </div>

          {/* Right: Details + 18 Tech Stack Badges + View More */}
          <div className="flex flex-1 flex-col justify-between text-left w-full">
            <div>
              <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">
                {siteConfig.fullName}
              </h2>
              <p className="mt-1 text-sm sm:text-[15px] font-medium text-[#8E8FBB]">
                {siteConfig.role}
              </p>

              <div className="my-4 h-px w-full bg-white/[0.08]" />

              <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-zinc-400">
                {siteConfig.homeBio}
              </p>

              {/* 18 Tech Stack Items */}
              <div className="mt-5">
                <h3 className="mb-2.5 text-xs sm:text-[13px] font-semibold text-white">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {homeProfileTechStack.map((tech) => (
                    <TechBadge
                      key={tech.id}
                      name={tech.name}
                      iconKey={tech.iconKey}
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-1">
              <Link
                href="/about"
                className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-white transition-colors hover:text-[#8E8FBB]"
              >
                <span>View More</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
