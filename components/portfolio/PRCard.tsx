import Link from "next/link";
import { StatusPill, type PRStatus } from "@/components/portfolio/StatusPill";

export type PRCardProps = {
  repo: string;
  title: string;
  status: PRStatus;
  href?: string;
  description?: string;
};

export function PRCard({ repo, title, status, href, description }: PRCardProps) {
  const content = (
    <>
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="font-display text-xs text-zinc-500">{repo}</span>
        <StatusPill status={status} />
      </div>
      <p className="text-sm text-zinc-200">{title}</p>
      {description ? (
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          {description}
        </p>
      ) : null}
    </>
  );

  const className =
    "rounded-md border border-zinc-800/60 bg-zinc-950/30 p-5 transition-colors hover:border-orange-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none";

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
