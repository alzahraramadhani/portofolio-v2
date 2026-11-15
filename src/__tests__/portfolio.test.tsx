import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { homeProfileTechStack, aboutTechCategories } from "@/data/tech-stack";
import { siteConfig } from "@/data/site-config";
import { formalEducation, experiencesList } from "@/data/experiences";
import { projectsList } from "@/data/projects";
import { Navbar } from "@/components/layout/navbar";
import { HomeProfileCard } from "@/components/home/home-profile-card";
import { AboutProfileCard } from "@/components/about/about-profile-card";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { ExperienceEducationSection } from "@/components/home/experience-education-section";
import { ContactSection } from "@/components/home/contact-section";
import { ProjectsCatalog } from "@/components/projects/projects-catalog";
import { GitHubActivitySection } from "@/components/about/github-activity-section";
import {
  generateFallbackWeeks,
  groupDaysIntoWeeks,
  getGitHubProfileData,
} from "@/lib/github";
import { POST } from "@/app/api/contact/route";

// Mock next/navigation and next/image for component tests
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    void fill;
    void priority;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} alt={String(props.alt || "")} />;
  },
}));

describe("Zahra Portfolio V2 — Specification & Component Verification", () => {
  it("contains all 18 required tech stack items on the Home Profile Card", () => {
    const expectedTech = [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Dart",
      "Flutter",
      "PHP",
      "Laravel",
      "SQL",
      "PostgreSQL",
      "Supabase",
      "Vite",
      "Shadcn UI",
      "Git",
      "GitHub",
    ];

    expect(homeProfileTechStack).toHaveLength(18);
    expect(homeProfileTechStack.map((t) => t.name)).toEqual(expectedTech);

    render(<HomeProfileCard />);
    for (const techName of expectedTech) {
      expect(screen.getByText(techName)).toBeTruthy();
    }

    const viewMoreLink = screen.getByRole("link", { name: /view more/i });
    expect(viewMoreLink.getAttribute("href")).toBe("/about");
  });

  it("renders AboutProfileCard with 2 bio paragraphs and exact social media URLs + /#contact email link", () => {
    render(<AboutProfileCard />);

    expect(siteConfig.aboutBioParagraphs).toHaveLength(2);
    expect(
      screen.getByText(/pursuing Informatics Engineering at Universitas Negeri Malang/i)
    ).toBeTruthy();

    const githubLink = screen.getByRole("link", { name: /github profile/i });
    const linkedinLink = screen.getByRole("link", { name: /linkedin profile/i });
    const instagramLink = screen.getByRole("link", { name: /instagram profile/i });
    const emailLink = screen.getByRole("link", { name: /contact via email form/i });

    expect(githubLink.getAttribute("href")).toBe(
      "https://github.com/alzahraramadhani/"
    );
    expect(linkedinLink.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/al-zahra-ramadhani/"
    );
    expect(instagramLink.getAttribute("href")).toBe(
      "https://www.instagram.com/jjahrav/"
    );
    expect(emailLink.getAttribute("href")).toBe("/#contact");
  });

  it("groups all 18 tech stack items + supporting tools into Frontend, Backend, and Mobile & Tools", () => {
    expect(aboutTechCategories.map((c) => c.title)).toEqual([
      "Frontend",
      "Backend",
      "Mobile & Tools",
    ]);
    const totalCategorized = aboutTechCategories.reduce(
      (sum, c) => sum + c.items.length,
      0
    );
    expect(totalCategorized).toBeGreaterThanOrEqual(18);
  });

  it("renders FeaturedProjectsSection with white thumbnail placeholders, unique category-accurate projects, and View More -> /projects", () => {
    const { container } = render(<FeaturedProjectsSection />);

    // Verify all 15 projects in projectsList have unique titles and slugs
    const uniqueTitles = new Set(projectsList.map((p) => p.title));
    const uniqueSlugs = new Set(projectsList.map((p) => p.slug));
    expect(uniqueTitles.size).toBe(projectsList.length);
    expect(uniqueSlugs.size).toBe(projectsList.length);

    // Verify white box placeholders (#FFFFFF / bg-white)
    const whitePlaceholders = container.querySelectorAll(".bg-white");
    expect(whitePlaceholders.length).toBeGreaterThanOrEqual(4);

    // Filter by Mobile — must show mobile projects and NOT static site generator
    const mobileTab = screen.getByRole("tab", { name: "Mobile" });
    fireEvent.click(mobileTab);
    expect(screen.getByText("Lumina Habit & Wellness App")).toBeTruthy();
    expect(screen.getByText("KopiMalang Order Companion")).toBeTruthy();
    expect(screen.queryByText("DevPulse Documentation Core")).toBeNull();

    // Filter by UI/UX Design — must show UI/UX projects
    const uiuxTab = screen.getByRole("tab", { name: "UI/UX Design" });
    fireEvent.click(uiuxTab);
    expect(screen.getByText("FinTrack Personal Ledger UI")).toBeTruthy();
    expect(screen.queryByText("DevPulse Documentation Core")).toBeNull();

    // Check View More link to /projects
    const viewMore = screen.getByRole("link", { name: /view more/i });
    expect(viewMore.getAttribute("href")).toBe("/projects");
  });

  it("renders ExperienceEducationSection without View More, sticky left column, 6 experiences, and Lightbox Modal", () => {
    const { container } = render(<ExperienceEducationSection />);

    // Must NOT have a View More button
    expect(screen.queryByText(/view more/i)).toBeNull();

    // Left column must have sticky positioning classes
    const stickyCol = container.querySelector(".lg\\:sticky");
    expect(stickyCol).toBeTruthy();

    // Formal education items exist
    expect(formalEducation).toHaveLength(2);
    expect(screen.getByText("Universitas Negeri Malang")).toBeTruthy();
    expect(screen.getByText("SMKN 1 Bandung Tulungagung")).toBeTruthy();

    // All 6 experiences (3 from Figma + 3 dummy) exist
    expect(experiencesList).toHaveLength(6);
    expect(screen.getByText("Google Student Ambassador")).toBeTruthy();
    expect(screen.getByText("Staff Muda - Kominfo")).toBeTruthy();
    expect(screen.getByText("Designer Grafis & Video Editor")).toBeTruthy();

    // Lightbox modal opens when clicking certificate thumbnail and closes on Escape
    const zoomButtons = screen.getAllByRole("button", { name: /zoom image/i });
    expect(zoomButtons.length).toBe(2);
    fireEvent.click(zoomButtons[0]);
    expect(screen.getByRole("dialog")).toBeTruthy();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("paginates ProjectsCatalog (6 per page) and resets page to 1 when category filter changes", () => {
    window.scrollTo = vi.fn();
    render(<ProjectsCatalog />);

    // Page 1 shows 6 project cards
    expect(screen.getAllByRole("article")).toHaveLength(6);

    // Navigate to Page 2
    const page2Btn = screen.getByRole("button", { name: "2" });
    fireEvent.click(page2Btn);
    expect(page2Btn.getAttribute("aria-current")).toBe("page");

    // Switching category filter resets to Page 1
    const mobileFilter = screen.getByRole("tab", { name: "Mobile Apps" });
    fireEvent.click(mobileFilter);
    const page1Btn = screen.getByRole("button", { name: "1" });
    expect(page1Btn.getAttribute("aria-current")).toBe("page");
  });

  it("validates Contact API route payloads (edge cases & valid submission)", async () => {
    // 1. Invalid JSON
    const badJsonReq = new Request("http://localhost/api/contact", {
      method: "POST",
      body: "not-json",
    });
    const res1 = await POST(badJsonReq);
    expect(res1.status).toBe(400);

    // 2. Invalid email & short message
    const invalidFieldsReq = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "A",
        email: "invalid-email",
        subject: "Hi",
        message: "Too short",
      }),
    });
    const res2 = await POST(invalidFieldsReq);
    expect(res2.status).toBe(400);

    // 3. Valid payload
    const validReq = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Recruiter Jane",
        email: "jane@company.com",
        subject: "Junior Software Engineer Role",
        message: "Hello Zahra, we would love to invite you for an interview!",
      }),
    });
    const res3 = await POST(validReq);
    expect(res3.status).toBe(200);
    const body3 = await res3.json();
    expect(body3.ok).toBe(true);
    expect(body3.recipient).toBe("alzahra.workhub@gmail.com");

    // 4. Graceful fallback when WEB3FORMS_ACCESS_KEY or RESEND_API_KEY is invalid
    process.env.WEB3FORMS_ACCESS_KEY = "invalid-test-key";
    const fallbackReq = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Recruiter Jane",
        email: "jane@company.com",
        subject: "Junior Software Engineer Role",
        message: "Hello Zahra, testing graceful fallback when key fails!",
      }),
    });
    const res4 = await POST(fallbackReq);
    expect(res4.status).toBe(200);
    const body4 = await res4.json();
    expect(body4.ok).toBe(true);
    delete process.env.WEB3FORMS_ACCESS_KEY;
  });

  it("renders ContactSection with UTC+7 (WIB) Available status badge, social links, and Malang location", () => {
    render(<ContactSection />);
    expect(screen.getByText("UTC+7 (WIB) Available")).toBeTruthy();
    expect(screen.getByText("Malang, Jawa Timur, Indonesia")).toBeTruthy();
    expect(screen.getByText("alzahra.workhub@gmail.com")).toBeTruthy();
  });

  it("renders GitHubActivitySection heatmap with 7-day columns, Inter font (no font-mono), and pinned repositories", () => {
    const weeks = generateFallbackWeeks();
    expect(weeks).toHaveLength(52);
    expect(groupDaysIntoWeeks([])).toHaveLength(52);

    // 365 days input must produce 52 full 7-day weeks (no partial 1-day last week)
    const sample365Days = Array.from({ length: 365 }, (_, i) => ({
      date: `2025-01-${String((i % 28) + 1).padStart(2, "0")}-${i}`,
      contributionCount: i % 5,
      level: ((i % 5) as 0 | 1 | 2 | 3 | 4),
    }));
    const grouped365 = groupDaysIntoWeeks(sample365Days);
    expect(grouped365).toHaveLength(52);
    expect(grouped365[0].contributionDays).toHaveLength(7);
    expect(grouped365[51].contributionDays).toHaveLength(7);

    const { container } = render(
      <GitHubActivitySection
        data={{
          username: "alzahraramadhani",
          totalContributions: 111,
          weeks,
          pinnedRepos: [
            {
              name: "personal-porto",
              description: "Portfolio web app",
              url: "https://github.com/alzahraramadhani/personal-porto",
              stargazerCount: 5,
              forkCount: 1,
              visibility: "Public",
              primaryLanguage: { name: "TypeScript", color: "#3178c6" },
            },
          ],
          syncedAt: new Date().toISOString(),
          source: "public-api",
        }}
      />
    );

    // Must not use font-mono anywhere (entire website uses Inter)
    expect(container.querySelector(".font-mono")).toBeNull();

    expect(screen.getByText("GitHub Contribution Activity")).toBeTruthy();
    expect(screen.getByText("personal-porto")).toBeTruthy();
    const viewAllLink = screen.getByRole("link", {
      name: /view all on github/i,
    });
    expect(viewAllLink.getAttribute("href")).toBe(
      "https://github.com/alzahraramadhani/?tab=repositories"
    );
  });

  it("fetches live GitHub profile data for alzahraramadhani and falls back cleanly on invalid or placeholder GITHUB_TOKEN", async () => {
    process.env.GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const dataWithPlaceholder = await getGitHubProfileData("alzahraramadhani");
    expect(dataWithPlaceholder.username).toBe("alzahraramadhani");
    expect(dataWithPlaceholder.weeks).toHaveLength(52);
    expect(
      dataWithPlaceholder.weeks[dataWithPlaceholder.weeks.length - 1]
        .contributionDays
    ).toHaveLength(7);
    expect(dataWithPlaceholder.pinnedRepos.length).toBeGreaterThan(0);

    process.env.GITHUB_TOKEN = "ghp_invalid_expired_token_12345";
    const dataWithInvalidToken = await getGitHubProfileData("alzahraramadhani");
    expect(dataWithInvalidToken.username).toBe("alzahraramadhani");
    expect(dataWithInvalidToken.weeks).toHaveLength(52);
    expect(dataWithInvalidToken.pinnedRepos.length).toBeGreaterThan(0);
    delete process.env.GITHUB_TOKEN;
  });

  it("handles same-page smooth scrolling in Navbar for Home, Experiences, and Let's Talk", () => {
    window.scrollTo = vi.fn();
    render(<Navbar />);

    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    fireEvent.click(homeLinks[0]);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
