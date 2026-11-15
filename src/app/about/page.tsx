import React from "react";
import type { Metadata } from "next";
import { AboutProfileCard } from "@/components/about/about-profile-card";
import { TechStackCategories } from "@/components/about/tech-stack-categories";
import { GitHubActivitySection } from "@/components/about/github-activity-section";
import { HiringCtaBanner } from "@/components/about/hiring-cta-banner";
import { getGitHubProfileData } from "@/lib/github";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.fullName} — ${siteConfig.role}, Tech Stack, and Live GitHub Activity.`,
};

export const revalidate = 900; // Auto-sync GitHub activity every 15 minutes

export default async function AboutPage() {
  const githubData = await getGitHubProfileData(siteConfig.githubUsername);

  return (
    <div>
      <AboutProfileCard />
      <TechStackCategories />
      <GitHubActivitySection data={githubData} />
      <HiringCtaBanner />
    </div>
  );
}
