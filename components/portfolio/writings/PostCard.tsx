import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/medium";

export type PostCardProps = {
  post: BlogPost;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-md border border-zinc-800/60 bg-zinc-950/30 p-5 transition-colors hover:border-orange-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
    >
      <span className="sr-only">(opens in a new tab)</span>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-display text-xs text-zinc-500">{post.date}</span>
        <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-orange-400 motion-reduce:transition-none" />
      </div>
      <h3 className="mb-2 font-display text-sm font-medium leading-snug text-zinc-100">
        {post.title}
      </h3>
      <p className="mb-3 text-sm leading-relaxed text-zinc-400">
        {post.excerpt}
      </p>
      {post.tags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-zinc-800 px-2 py-0.5 font-display text-xs text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </a>
  );
}
