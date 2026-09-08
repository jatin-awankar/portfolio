import type { Metadata } from "next";
import { Pane } from "@/components/portfolio/Pane";
import { PageIntro } from "@/components/portfolio/writings/PageIntro";
import { TerminalPostsBridge } from "@/components/portfolio/writings/TerminalPostsBridge";
import { WritingsPane } from "@/components/portfolio/writings/WritingsPane";
import { DEFAULT_POSTS, curatePosts } from "@/components/portfolio/writings/default-posts";
import { getMediumPosts } from "@/lib/medium";

export const metadata: Metadata = {
  title: "Engineering notes | Jatin Awankar",
  description: "Notes on backend architecture, payment reliability, and concurrency, grounded in the systems I build.",
  alternates: { canonical: "/writings" },
  openGraph: {
    title: "Engineering notes | Jatin Awankar",
    description: "Notes on backend architecture, payment reliability, and concurrency, grounded in the systems I build.",
    url: "/writings",
  },
  twitter: {
    title: "Engineering notes | Jatin Awankar",
    description: "Notes on backend architecture, payment reliability, and concurrency, grounded in the systems I build.",
  },
};

export default async function WritingsPage() {
  let posts = DEFAULT_POSTS;

  try {
    const livePosts = await getMediumPosts();
    posts = livePosts.length ? curatePosts(livePosts) : DEFAULT_POSTS;
  } catch {
    posts = DEFAULT_POSTS;
  }

  return (
    <>
      <TerminalPostsBridge posts={posts} />
      <PageIntro count={posts.length} />
      <Pane title="~/writings/index.tsx" className="writings-pane">
        <WritingsPane posts={posts} />
      </Pane>
    </>
  );
}
