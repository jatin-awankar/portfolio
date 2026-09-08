// lib/github.ts — reference implementation for live GitHub data.
//
// Requires GITHUB_TOKEN env var (classic PAT, no special scopes needed —
// contribution + public PR data is readable by any authenticated request).
// If GITHUB_TOKEN is missing, callers should catch the error and fall back
// to the unavailable state (see ContributionGraph's `days` prop in
// components/portfolio/about/GitHubActivityPane.tsx).

const GITHUB_USERNAME = "jatin-awankar";
const FETCH_TIMEOUT_MS = 10_000;

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4, mapped to the zinc/orange palette
}

export interface ContributionGraphData {
  totalContributions: number;
  days: ContributionDay[];
}

function mapLevel(count: number, max: number): number {
  if (count === 0) return 0;
  const ratio = count / max;
  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}

export async function getContributionGraph(): Promise<ContributionGraphData> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error(
      "GITHUB_TOKEN is not set — contribution graph requires GraphQL auth",
    );
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
    // ISR: refresh hourly rather than hitting GitHub on every request
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL error: ${res.status}`);
  }

  const json = await res.json();
  const calendar = json.data.user.contributionsCollection.contributionCalendar;
  const allDays = calendar.weeks.flatMap(
    (w: { contributionDays: { date: string; contributionCount: number }[] }) =>
      w.contributionDays,
  );
  const max = Math.max(
    ...allDays.map((d: { contributionCount: number }) => d.contributionCount),
    1,
  );

  return {
    totalContributions: calendar.totalContributions,
    days: allDays.map((d: { date: string; contributionCount: number }) => ({
      date: d.date,
      count: d.contributionCount,
      level: mapLevel(d.contributionCount, max),
    })),
  };
}

export interface PullRequest {
  repo: string;
  title: string;
  status: "Merged" | "In review";
  url: string;
  description?: string;
}

const FEATURED_OPEN_SOURCE_PRS: PullRequest[] = [
  {
    repo: "openstatusHQ/openstatus #2261",
    title: "Added a loading skeleton to the status pages list",
    description:
      "Replaced the empty loading state with a table skeleton so the interface stays legible while data loads.",
    status: "Merged",
    url: "https://github.com/openstatusHQ/openstatus/pull/2261",
  },
  {
    repo: "openstatusHQ/openstatus #2276",
    title: "Added a loading state to DomainConfiguration",
    description:
      "Connected the existing loading flag to visible feedback while custom-domain data is fetched.",
    status: "Merged",
    url: "https://github.com/openstatusHQ/openstatus/pull/2276",
  },
];

type SearchItem = {
  repository_url: string;
  title: string;
  html_url: string;
  number: number;
};

async function githubFetch(path: string): Promise<Response> {
  const response = await fetch(`https://api.github.com/${path}`, {
    headers: process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {},
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`GitHub request failed: ${response.status}`);
  return response;
}

async function searchPRs(state: "merged" | "open"): Promise<PullRequest[]> {
  const results: PullRequest[] = [];
  // GitHub search exposes at most 1,000 results per query.
  for (let page = 1; page <= 10; page++) {
    const params = new URLSearchParams({
      q: `is:pr is:${state} is:public author:${GITHUB_USERNAME} -user:${GITHUB_USERNAME} -org:firstcontributions`,
      sort: "updated",
      order: "desc",
      per_page: "100",
      page: String(page),
    });
    try {
      const response = await githubFetch(`search/issues?${params}`);
      const data: { items: SearchItem[]; total_count: number } = await response.json();
      results.push(...data.items.map((item): PullRequest => ({
        repo: `${item.repository_url.replace("https://api.github.com/repos/", "")} #${item.number}`,
        title: item.title,
        status: state === "merged" ? "Merged" : "In review",
        url: item.html_url,
      })));
      if (data.items.length < 100 || page * 100 >= data.total_count) break;
    } catch {
      // Preserve earlier pages if a later request fails.
      break;
    }
  }
  return results;
}

async function fetchFeaturedPR(fallback: PullRequest): Promise<PullRequest | null> {
  try {
    const path = new URL(fallback.url).pathname.replace("/pull/", "/pulls/");
    const response = await githubFetch(`repos${path}`);
    const data: { merged: boolean; state: string; html_url: string } = await response.json();
    if (!data.merged && data.state !== "open") return null;
    return {
      ...fallback,
      url: data.html_url,
      status: data.merged ? "Merged" : "In review",
    };
  } catch {
    // These public merges were verified; keep them visible during outages.
    return { ...fallback };
  }
}

export async function getOpenSourcePRs(): Promise<PullRequest[]> {
  const [featured, merged, open] = await Promise.all([
    Promise.all(FEATURED_OPEN_SOURCE_PRS.map(fetchFeaturedPR)),
    searchPRs("merged"),
    searchPRs("open"),
  ]);
  const featuredUrls = new Set(FEATURED_OPEN_SOURCE_PRS.map((pr) => pr.url));
  const seen = new Set<string>();
  return [
    ...featured.filter((pr): pr is PullRequest => pr !== null),
    ...[...merged, ...open].filter((pr) => !featuredUrls.has(pr.url)),
  ].filter((pr) => {
    if (seen.has(pr.url)) return false;
    seen.add(pr.url);
    return true;
  });
}

export function getFeaturedOpenSourcePRs(): PullRequest[] {
  return FEATURED_OPEN_SOURCE_PRS.map((pr) => ({ ...pr }));
}
