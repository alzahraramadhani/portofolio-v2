import React from "react";
import type { Metadata } from "next";
import { ProjectsCatalog } from "@/components/projects/projects-catalog";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "All Projects",
  description: `Explore web applications, mobile apps, and UI/UX design projects by ${siteConfig.fullName}.`,
};

export default function ProjectsPage() {
  return (
    <div>
      <ProjectsCatalog />
    </div>
  );
}
