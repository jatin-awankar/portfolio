import type { BlogPost } from "@/lib/medium";

export const DEFAULT_POSTS: BlogPost[] = [
  {
    title: "Why I Moved from Next.js API Routes to a Dedicated Node.js Backend",
    date: "Mar 17, 2026",
    publishedAt: "2026-03-17",
    excerpt:
      "Why Petrol Partner outgrew Next.js API routes, and what changed when I moved its backend to Node.js.",
    link: "https://medium.com/backenders-club/why-i-moved-from-next-js-api-routes-to-a-dedicated-node-js-backend-13739c61dd68",
    tags: ["Architecture"],
    featured: true,
    projectNote: "Behind the build · Petrol Partner",
  },
  {
    title:
      "Designing Backend Systems That Survive Concurrency, Retries, and Real-World Failures",
    date: "Mar 3, 2026",
    publishedAt: "2026-03-03",
    excerpt:
      "How concurrency and retries challenge backend correctness, even when individual queries are atomic.",
    link: "https://medium.com/@jatinawankar02/designing-backend-systems-that-survive-concurrency-retries-and-real-world-failures-a0a3bba9323b",
    tags: ["Backend Systems"],
  },
  {
    title:
      "Designing Payment Systems That Survive Retries, Crashes, and Race Conditions",
    date: "Feb 25, 2026",
    publishedAt: "2026-02-25",
    excerpt:
      "How to reason about payment reliability when retries, crashes, and race conditions interrupt the happy path.",
    link: "https://medium.com/@jatinawankar02/designing-payment-systems-that-survive-retries-crashes-and-race-conditions-be9718de5654",
    tags: ["Payments"],
  },
  {
    title: "What Actually Breaks in Real-World Payment Systems (And How to Design for It)",
    date: "Feb 21, 2026",
    publishedAt: "2026-02-21",
    excerpt:
      "How database constraints help protect payment flows from duplicate requests and webhook replays.",
    link: "https://medium.com/@jatinawankar02/what-actually-breaks-in-real-world-payment-systems-and-how-to-design-for-it-fb5138a4fcf6",
    tags: ["Payments"],
  },
  {
    title: "Preventing Double Booking: Understanding Race Conditions in Real Systems",
    date: "Feb 18, 2026",
    publishedAt: "2026-02-18",
    excerpt:
      "Why concurrent booking requests can claim the same seat, and how to reason about preventing double bookings.",
    link: "https://medium.com/@jatinawankar02/preventing-double-booking-understanding-race-conditions-in-real-systems-76e92094dee8",
    tags: ["Concurrency"],
  },
];

// Medium publication domains and tracking queries can change; the article ID stays stable.
function articleId(link: string): string | undefined {
  return link.match(/-([a-f0-9]{12})(?:[?#/]|$)/i)?.[1];
}

export function curatePosts(posts: BlogPost[]): BlogPost[] {
  return posts.map((post) => {
    const id = articleId(post.link);
    const curated = id && DEFAULT_POSTS.find((entry) => articleId(entry.link) === id);
    return curated ? {
      ...post,
      excerpt: curated.excerpt,
      tags: curated.tags,
      featured: curated.featured,
      projectNote: curated.projectNote,
    } : post;
  });
}
