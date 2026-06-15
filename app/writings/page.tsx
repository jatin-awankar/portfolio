import { Pane } from "@/components/portfolio/Pane";
import { PageIntro } from "@/components/portfolio/writings/PageIntro";
import { TerminalPostsBridge } from "@/components/portfolio/writings/TerminalPostsBridge";
import { WritingsPane } from "@/components/portfolio/writings/WritingsPane";
import { DEFAULT_POSTS } from "@/components/portfolio/writings/default-posts";
import { getMediumPosts } from "@/lib/medium";

export default async function WritingsPage() {
  let posts = DEFAULT_POSTS;

  try {
    const livePosts = await getMediumPosts();
    posts = livePosts.length ? livePosts : DEFAULT_POSTS;
  } catch {
    posts = DEFAULT_POSTS;
  }

  return (
    <>
      <TerminalPostsBridge posts={posts} />
      <PageIntro count={posts.length} />
      <Pane title="~/writings/index.tsx">
        <WritingsPane posts={posts} />
      </Pane>
    </>
  );
}
