import {
  GitHubContributionDay,
  GitHubContributionWeek,
  GitHubPinnedRepo,
  GitHubProfileData,
} from "@/types/portfolio";
import { siteConfig } from "@/data/site-config";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const GITHUB_QUERY = `
  query GetZahraGitHubData($username: String!) {
    user(login: $username) {
      contributionsCollection {
        totalContributions
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            isPrivate
            primaryLanguage {
              name
              color
            }
          }
        }
      }
      repositories(
        first: 6
        privacy: PUBLIC
        isFork: false
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          isPrivate
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Dart: "#00B4AB",
  PHP: "#4F5D95",
  Blade: "#f7523f",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Python: "#3572A5",
  Go: "#00ADD8",
  SQL: "#e38c00",
};

function mapContributionLevel(levelStr: string | number): 0 | 1 | 2 | 3 | 4 {
  if (typeof levelStr === "number") {
    return Math.max(0, Math.min(4, levelStr)) as 0 | 1 | 2 | 3 | 4;
  }
  switch (levelStr) {
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    case "NONE":
    default:
      return 0;
  }
}

export function groupDaysIntoWeeks(
  days: GitHubContributionDay[]
): GitHubContributionWeek[] {
  if (!days || days.length === 0) return generateFallbackWeeks();

  const recentDays = days.length >= 364 ? days.slice(-364) : days;
  const weeks: GitHubContributionWeek[] = [];
  let currentWeek: GitHubContributionDay[] = [];

  for (const day of recentDays) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push({ contributionDays: currentWeek });
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    weeks.push({ contributionDays: currentWeek });
  }

  return weeks.slice(-52);
}

export function generateFallbackWeeks(): GitHubContributionWeek[] {
  const weeks: GitHubContributionWeek[] = [];
  const today = new Date();

  for (let w = 51; w >= 0; w--) {
    const contributionDays: GitHubContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const dateObj = new Date(today);
      dateObj.setDate(today.getDate() - (w * 7 + (6 - d)));
      const dateStr = dateObj.toISOString().split("T")[0];
      const seed = (w * 7 + d * 13) % 17;
      const level: 0 | 1 | 2 | 3 | 4 =
        seed === 0
          ? 4
          : seed < 3
            ? 3
            : seed < 6
              ? 2
              : seed < 10
                ? 1
                : 0;
      const count = level === 0 ? 0 : level * 2 + (w % 3);
      contributionDays.push({
        date: dateStr,
        contributionCount: count,
        level,
      });
    }
    weeks.push({ contributionDays });
  }
  return weeks;
}

const FALLBACK_PINNED_REPOS: GitHubPinnedRepo[] = [
  {
    name: "personal-porto",
    description:
      "Personal developer portfolio web application engineered with modern component architecture.",
    url: "https://github.com/alzahraramadhani/personal-porto",
    stargazerCount: 0,
    forkCount: 0,
    visibility: "Public",
    primaryLanguage: {
      name: "JavaScript",
      color: "#f1e05a",
    },
  },
  {
    name: "ecobottle",
    description:
      "Eco-conscious smart tracking and sustainability web application built with TypeScript.",
    url: "https://github.com/alzahraramadhani/ecobottle",
    stargazerCount: 0,
    forkCount: 0,
    visibility: "Public",
    primaryLanguage: {
      name: "TypeScript",
      color: "#3178c6",
    },
  },
  {
    name: "task_tide",
    description:
      "Cross-platform mobile task and workflow management application built with Flutter and Dart.",
    url: "https://github.com/alzahraramadhani/task_tide",
    stargazerCount: 0,
    forkCount: 0,
    visibility: "Public",
    primaryLanguage: {
      name: "Dart",
      color: "#00B4AB",
    },
  },
  {
    name: "Spatiom-V2",
    description:
      "Interactive spatial workspace and modern web platform crafted with TypeScript.",
    url: "https://github.com/alzahraramadhani/Spatiom-V2",
    stargazerCount: 0,
    forkCount: 0,
    visibility: "Public",
    primaryLanguage: {
      name: "TypeScript",
      color: "#3178c6",
    },
  },
  {
    name: "CraftyAi",
    description:
      "AI-assisted creative workspace and productivity tool built with clean web technologies.",
    url: "https://github.com/alzahraramadhani/CraftyAi",
    stargazerCount: 0,
    forkCount: 0,
    visibility: "Public",
    primaryLanguage: {
      name: "JavaScript",
      color: "#f1e05a",
    },
  },
  {
    name: "rodeo-laundry",
    description:
      "Laundry service management system designed for streamlined order tracking and customer workflows.",
    url: "https://github.com/alzahraramadhani/rodeo-laundry",
    stargazerCount: 0,
    forkCount: 0,
    visibility: "Public",
    primaryLanguage: {
      name: "Blade",
      color: "#f7523f",
    },
  },
];

async function fetchFromGraphQL(
  username: string,
  token: string
): Promise<GitHubProfileData | null> {
  try {
    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GITHUB_QUERY,
        variables: { username },
      }),
      next: { revalidate: 900 },
    });

    if (!response.ok) return null;

    const json = await response.json();
    const user = json?.data?.user;
    if (!user) return null;

    const rawWeeks: Array<{
      contributionDays: Array<{
        date: string;
        contributionCount: number;
        contributionLevel: string;
      }>;
    }> = user.contributionsCollection?.contributionCalendar?.weeks ?? [];

    const flatDays: GitHubContributionDay[] = rawWeeks.flatMap((week) =>
      week.contributionDays.map((d) => ({
        date: d.date,
        contributionCount: d.contributionCount,
        level: mapContributionLevel(d.contributionLevel),
      }))
    );

    const weeks =
      flatDays.length > 0
        ? groupDaysIntoWeeks(flatDays)
        : generateFallbackWeeks();

    const pinnedNodes = user.pinnedItems?.nodes ?? [];
    const fallbackRepoNodes = user.repositories?.nodes ?? [];
    const repoSource =
      pinnedNodes.length > 0 ? pinnedNodes : fallbackRepoNodes;

    const pinnedRepos: GitHubPinnedRepo[] = repoSource
      .slice(0, 6)
      .map(
        (repo: {
          name: string;
          description: string | null;
          url: string;
          stargazerCount: number;
          forkCount: number;
          isPrivate: boolean;
          primaryLanguage: { name: string; color: string } | null;
        }) => ({
          name: repo.name,
          description: repo.description,
          url: repo.url,
          stargazerCount: repo.stargazerCount ?? 0,
          forkCount: repo.forkCount ?? 0,
          visibility: repo.isPrivate ? "Private" : "Public",
          primaryLanguage: repo.primaryLanguage
            ? {
                name: repo.primaryLanguage.name,
                color:
                  repo.primaryLanguage.color ||
                  LANGUAGE_COLORS[repo.primaryLanguage.name] ||
                  "#8E8FBB",
              }
            : null,
        })
      );

    return {
      username,
      totalContributions:
        user.contributionsCollection?.totalContributions ?? 0,
      weeks: weeks.length > 0 ? weeks : generateFallbackWeeks(),
      pinnedRepos:
        pinnedRepos.length > 0 ? pinnedRepos : FALLBACK_PINNED_REPOS,
      syncedAt: new Date().toISOString(),
      source: "graphql",
    };
  } catch {
    return null;
  }
}

async function fetchPinnedReposFromProfileHtml(
  username: string
): Promise<GitHubPinnedRepo[]> {
  try {
    const res = await fetch(
      `https://github.com/${encodeURIComponent(username)}`,
      {
        next: { revalidate: 900 },
      }
    );
    if (!res.ok) return [];
    const html = await res.text();
    const itemBlocks = html.split("pinned-item-list-item-content").slice(1);
    const parsedRepos: GitHubPinnedRepo[] = [];

    for (const block of itemBlocks.slice(0, 6)) {
      const nameMatch = block.match(/<span[^>]*class="repo"[^>]*>([^<]+)<\/span>/);
      const name = nameMatch?.[1]?.trim();
      if (!name) continue;

      const hrefMatch = block.match(/<a[^>]*href="([^"]+)"[^>]*>\s*<span[^>]*class="repo"/);
      const relativeHref = hrefMatch?.[1]?.trim();
      const url = relativeHref
        ? relativeHref.startsWith("http")
          ? relativeHref
          : `https://github.com${relativeHref}`
        : `https://github.com/${username}/${name}`;

      const descMatch = block.match(
        /<p[^>]*class="[^"]*pinned-item-desc[^"]*"[^>]*>([\s\S]*?)<\/p>/
      );
      const rawDesc = descMatch?.[1]?.replace(/<[^>]+>/g, "").trim() || null;

      const langMatch = block.match(
        /<span[^>]*itemprop="programmingLanguage"[^>]*>([^<]+)<\/span>/
      );
      const langName = langMatch?.[1]?.trim() || null;

      const colorMatch = block.match(
        /repo-language-color"[^>]*style="background-color:\s*([^;"\s]+)/
      );
      const langColor =
        colorMatch?.[1]?.trim() ||
        (langName ? LANGUAGE_COLORS[langName] : undefined) ||
        "#8E8FBB";

      parsedRepos.push({
        name,
        description: rawDesc,
        url,
        stargazerCount: 0,
        forkCount: 0,
        visibility: "Public",
        primaryLanguage: langName
          ? {
              name: langName,
              color: langColor,
            }
          : null,
      });
    }

    return parsedRepos;
  } catch {
    return [];
  }
}

async function fetchFromPublicEndpoints(
  username: string
): Promise<GitHubProfileData | null> {
  try {
    const [contribRes, reposRes, htmlPinnedRepos] = await Promise.all([
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
        { next: { revalidate: 900 } }
      ).catch(() => null),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
          next: { revalidate: 900 },
        }
      ).catch(() => null),
      fetchPinnedReposFromProfileHtml(username),
    ]);

    let weeks: GitHubContributionWeek[] = [];
    let totalContributions = 0;

    if (contribRes && contribRes.ok) {
      const contribJson = await contribRes.json();
      totalContributions = contribJson?.total?.lastYear ?? 0;
      const days: GitHubContributionDay[] = (
        contribJson?.contributions ?? []
      ).map((item: { date: string; count: number; level: number }) => ({
        date: item.date,
        contributionCount: item.count ?? 0,
        level: mapContributionLevel(item.level ?? 0),
      }));
      if (days.length > 0) {
        weeks = groupDaysIntoWeeks(days);
      }
    }

    let pinnedRepos: GitHubPinnedRepo[] = [...htmlPinnedRepos];

    if (reposRes && reposRes.ok) {
      const reposJson = await reposRes.json();
      if (Array.isArray(reposJson)) {
        interface GitHubRestRepo {
          name: string;
          description: string | null;
          html_url: string;
          stargazers_count?: number;
          forks_count?: number;
          private?: boolean;
          fork?: boolean;
          language?: string | null;
        }

        const typedRepos = reposJson as GitHubRestRepo[];

        const mapRepo = (repo: GitHubRestRepo): GitHubPinnedRepo => ({
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          stargazerCount: repo.stargazers_count ?? 0,
          forkCount: repo.forks_count ?? 0,
          visibility: repo.private ? "Private" : "Public",
          primaryLanguage: repo.language
            ? {
                name: repo.language,
                color: LANGUAGE_COLORS[repo.language] || "#8E8FBB",
              }
            : null,
        });

        if (htmlPinnedRepos.length > 0) {
          const byName = new Map<string, GitHubRestRepo>(
            typedRepos.map((r) => [r.name.toLowerCase(), r])
          );
          pinnedRepos = htmlPinnedRepos
            .map((htmlRepo) => {
              const restMatch = byName.get(htmlRepo.name.toLowerCase());
              return restMatch ? mapRepo(restMatch) : htmlRepo;
            })
            .slice(0, 6);
        } else {
          pinnedRepos = typedRepos
            .filter((r) => !r.fork)
            .slice(0, 6)
            .map(mapRepo);
        }
      }
    }

    if (weeks.length === 0 && pinnedRepos.length === 0) {
      return null;
    }

    return {
      username,
      totalContributions,
      weeks: weeks.length > 0 ? weeks : generateFallbackWeeks(),
      pinnedRepos:
        pinnedRepos.length > 0 ? pinnedRepos : FALLBACK_PINNED_REPOS,
      syncedAt: new Date().toISOString(),
      source: "public-api",
    };
  } catch {
    return null;
  }
}

function isPlaceholderToken(token?: string): boolean {
  if (!token) return true;
  const trimmed = token.trim();
  if (!trimmed) return true;
  if (/^ghp_x+$/i.test(trimmed)) return true;
  if (/^(your_token|placeholder|todo)/i.test(trimmed)) return true;
  return false;
}

export async function getGitHubProfileData(
  customUsername?: string
): Promise<GitHubProfileData> {
  const username =
    customUsername ||
    process.env.GITHUB_USERNAME ||
    siteConfig.githubUsername ||
    "alzahraramadhani";
  const token = process.env.GITHUB_TOKEN?.trim();

  if (token && !isPlaceholderToken(token)) {
    const graphQLData = await fetchFromGraphQL(username, token);
    if (graphQLData) return graphQLData;
  }

  const publicData = await fetchFromPublicEndpoints(username);
  if (publicData) return publicData;

  const fallbackWeeks = generateFallbackWeeks();
  const total = fallbackWeeks.reduce(
    (acc, w) =>
      acc +
      w.contributionDays.reduce((s, d) => s + d.contributionCount, 0),
    0
  );

  return {
    username,
    totalContributions: total,
    weeks: fallbackWeeks,
    pinnedRepos: FALLBACK_PINNED_REPOS,
    syncedAt: new Date().toISOString(),
    source: "fallback",
  };
}
