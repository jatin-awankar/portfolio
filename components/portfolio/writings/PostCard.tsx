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
      className="writing-card group block rounded-md border bg-zinc-950/30 p-4 sm:p-5 transition-colors motion-reduce:transition-none"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-xs text-zinc-400">
          {post.featured ? <span className="writing-accent">Start here</span> : null}
          {post.date ? <time dateTime={post.publishedAt}>{post.date}</time> : null}
        </div>
        <ArrowUpRight aria-hidden="true" className="writing-arrow h-4 w-4 shrink-0 text-zinc-400" />
      </div>
      <h2 className="mb-2 max-w-[65ch] font-display text-base font-medium leading-snug text-zinc-100 sm:text-lg">
        {post.title}
      </h2>
      <p className="mb-3 max-w-[75ch] text-sm leading-relaxed text-zinc-400">
        {post.excerpt}
      </p>
      {post.tags.length > 0 ? (
        <div className="flex flex-wrap gap-x-3 gap-y-1 font-display text-xs text-zinc-400">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="break-words"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {post.projectNote ? <p className="writing-accent mt-3 font-display text-xs">{post.projectNote}</p> : null}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
