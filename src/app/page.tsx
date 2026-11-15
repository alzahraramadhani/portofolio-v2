import React from "react";
import { HeroSection } from "@/components/home/hero-section";
import { HomeProfileCard } from "@/components/home/home-profile-card";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { ExperienceEducationSection } from "@/components/home/experience-education-section";
import { ContactSection } from "@/components/home/contact-section";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <HomeProfileCard />
      <FeaturedProjectsSection />
      <ExperienceEducationSection />
      <ContactSection />
    </div>
  );
}
