// lib/medium.ts — reference implementation for live Medium posts.
//
// Requires the `rss-parser` package: npm install rss-parser
// No auth needed — Medium's per-user RSS feed is public.

import Parser from "rss-parser";

const MEDIUM_FEED_URL = "https://medium.com/feed/@jatinawankar02";
const FETCH_TIMEOUT_MS = 10_000;
const parser = new Parser();

export interface BlogPost {
  title: string;
  link: string;
  date: string; // formatted, e.g. "Mar 17, 2026"
  excerpt: string;
  tags: string[];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function getMediumPosts(): Promise<BlogPost[]> {
  const res = await fetch(MEDIUM_FEED_URL, {
    // ISR: refresh hourly rather than hitting Medium on every request
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`Medium feed error: ${res.status}`);
  }

  const xml = await res.text();
  const feed = await parser.parseString(xml);

  return feed.items.map((item) => {
    const raw =
      item.contentSnippet || item.summary || item["content:encoded"] || "";
    const excerpt = stripHtml(raw).slice(0, 180);
    const date = item.pubDate
      ? new Date(item.pubDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";

    return {
      // Medium titles sometimes carry a leading zero-width space
      title: (item.title ?? "").replace(/\u200B/g, "").trim(),
      link: item.link ?? "",
      date,
      excerpt: excerpt + (excerpt.length === 180 ? "…" : ""),
      tags: item.categories ?? [],
    };
  });
}
