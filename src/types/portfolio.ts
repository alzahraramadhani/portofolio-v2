export type ProjectCategory = "website" | "mobile" | "ui-ux";

export interface SocialLink {
  id: "github" | "linkedin" | "instagram" | "email";
  label: string;
  handle: string;
  href: string;
  isExternal: boolean;
}

export interface TechStackItem {
  id: string;
  name: string;
  iconKey: string;
  category: "frontend" | "backend" | "mobile-tools";
  showOnHomeProfile: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryBadge: string;
  year: string;
  description: string;
  techTags: string[];
  thumbnailUrl?: string;
  projectUrl?: string;
  featured: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  major: string;
  period: string;
}

export interface ExperienceMediaItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  badgeType:
    | "Milestone"
    | "Internship"
    | "Part Time"
    | "Full Time"
    | "Organization";
  role: string;
  organization?: string;
  location?: string;
  description: string;
  tools?: string[];
  mediaUrls?: ExperienceMediaItem[];
  isCurrent?: boolean;
}

export interface GitHubPinnedRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  visibility: "Public" | "Private";
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

export interface GitHubProfileData {
  username: string;
  totalContributions: number;
  weeks: GitHubContributionWeek[];
  pinnedRepos: GitHubPinnedRepo[];
  syncedAt: string;
  source: "graphql" | "public-api" | "fallback";
}
