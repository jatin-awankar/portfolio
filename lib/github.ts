// lib/github.ts — reference implementation for live GitHub data.
//
// Requires GITHUB_TOKEN env var (classic PAT, no special scopes needed —
// contribution + public PR data is readable by any authenticated request).
// If GITHUB_TOKEN is missing, callers should catch the error and fall back
// to the placeholder UI (see ContributionGraph's `days` prop in
// components/portfolio/about/GitHubActivityPane.tsx).

const GITHUB_USERNAME = "jatin-awankar";

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
}

export async function getOpenSourcePRs(): Promise<PullRequest[]> {
  const headers: HeadersInit = process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {};

  const [mergedRes, openRes] = await Promise.all([
    fetch(
      `https://api.github.com/search/issues?q=type:pr+author:${GITHUB_USERNAME}+is:merged+is:public&sort=updated&order=desc&per_page=10`,
      { headers, next: { revalidate: 3600 } },
    ),
    fetch(
      `https://api.github.com/search/issues?q=type:pr+author:${GITHUB_USERNAME}+is:open+is:public&sort=updated&order=desc&per_page=10`,
      { headers, next: { revalidate: 3600 } },
    ),
  ]);

  if (!mergedRes.ok || !openRes.ok) {
    throw new Error(
      `GitHub search error: ${mergedRes.status} / ${openRes.status}`,
    );
  }

  const [mergedJson, openJson] = await Promise.all([
    mergedRes.json(),
    openRes.json(),
  ]);

  const merged = (mergedJson.items ?? [])
    .filter(
      (item: { repository_url: string }) =>
        !item.repository_url.includes(`/repos/${GITHUB_USERNAME}/`) &&
        !item.repository_url.includes('/repos/firstcontributions/')
    )
    .map(
      (item: {
        repository_url: string;
        title: string;
        html_url: string;
      }) => ({
        repo: item.repository_url.replace("https://api.github.com/repos/", ""),
        title: item.title,
        status: "Merged" as const,
        url: item.html_url,
      }),
    );

  const open = (openJson.items ?? [])
    .filter(
      (item: { repository_url: string }) =>
        !item.repository_url.includes(`/repos/${GITHUB_USERNAME}/`) &&
        !item.repository_url.includes('/repos/firstcontributions/')
    )
    .map(
      (item: {
        repository_url: string;
        title: string;
        html_url: string;
      }) => ({
        repo: item.repository_url.replace("https://api.github.com/repos/", ""),
        title: item.title,
        status: "In review" as const,
        url: item.html_url,
      }),
    );

  const seen = new Set<string>();
  return [...merged, ...open].filter(({ url }) => {
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}
