import type { BlogPost } from "@/lib/medium";
import { PostCard } from "./PostCard";

export type WritingsPaneProps = {
  posts: BlogPost[];
};

export function WritingsPane({ posts }: WritingsPaneProps) {
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <PostCard key={post.link} post={post} />
      ))}
    </div>
  );
}
