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
  publishedAt?: string;
  featured?: boolean;
  projectNote?: string;
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
    const text = stripHtml(raw);
    const excerpt = text.length > 180
      ? text.slice(0, 180).replace(/\s+\S*$/, "") + "…"
      : text;
    const published = item.pubDate ? new Date(item.pubDate) : null;
    const validDate = published && !Number.isNaN(published.getTime());
    const date = validDate
      ? published.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })
      : "";

    return {
      // Medium titles sometimes carry a leading zero-width space
      title: (item.title ?? "").replace(/\u200B/g, "").trim(),
      link: item.link ?? "",
      date,
      publishedAt: validDate ? published.toISOString() : undefined,
      excerpt,
      tags: [...new Set(item.categories ?? [])].slice(0, 2).map((tag) =>
        tag.replace(/-/g, " ").replace(/^./, (letter) => letter.toUpperCase()),
      ),
    };
  });
}
