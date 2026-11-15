import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export function AboutProfileCard() {
  return (
    <section
      aria-label="About Al Zahra Ramadhani"
      className="relative mx-auto max-w-[920px] px-5 sm:px-8 pt-10 pb-16"
    >
      {/* Top Indigo Ambient Glow matching About Page.jpg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-1/2 -z-10 h-44 w-[75%] -translate-x-1/2 rounded-full bg-[#5B5FC7]/35 blur-[65px]"
      />

      <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-b from-[#1C1C24]/95 to-[#161619]/95 p-6 sm:p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        {/* Top border highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#9EA0CD]/50 to-transparent"
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

          {/* Right: Multi-Paragraph Bio + Social Media Links */}
          <div className="flex flex-1 flex-col justify-between text-left w-full">
            <div>
              <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-white">
                {siteConfig.fullName}
              </h1>
              <p className="mt-1 text-sm sm:text-[15px] font-medium text-[#8E8FBB]">
                {siteConfig.role}
              </p>

              <div className="my-4 h-px w-full bg-white/[0.08]" />

              <div className="space-y-4">
                {siteConfig.aboutBioParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-[13.5px] sm:text-[14px] leading-relaxed text-zinc-400"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Social Media Buttons */}
            <div className="mt-6 pt-1">
              <h2 className="mb-3 text-xs sm:text-[13px] font-semibold text-white">
                Social Media
              </h2>

              <div className="flex items-center gap-2.5">
                {/* GitHub */}
                <a
                  href="https://github.com/alzahraramadhani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-[#232329] text-zinc-200 transition-all duration-200 hover:border-[#8E8FBB]/50 hover:bg-[#2C2C35] hover:text-white"
                >
                  <SiGithub className="h-4 w-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/al-zahra-ramadhani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-[#232329] text-zinc-200 transition-all duration-200 hover:border-[#8E8FBB]/50 hover:bg-[#2C2C35] hover:text-white"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/jjahrav/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-[#232329] text-zinc-200 transition-all duration-200 hover:border-[#8E8FBB]/50 hover:bg-[#2C2C35] hover:text-white"
                >
                  <SiInstagram className="h-4 w-4" />
                </a>

                {/* Email -> Redirects to Home Page Contact section (/#contact) */}
                <Link
                  href="/#contact"
                  aria-label="Contact via Email Form"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-[#232329] text-zinc-200 transition-all duration-200 hover:border-[#8E8FBB]/50 hover:bg-[#2C2C35] hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
