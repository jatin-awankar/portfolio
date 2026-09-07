import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRCard } from "@/components/portfolio/PRCard";
import { getOpenSourcePRs } from "@/lib/github";

export async function OpenSourcePane() {
  const prs = await getOpenSourcePRs().catch(() => null);
  return (
    <div>
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / Open source</p>
          <h2>Building in the open.</h2>
        </div>
      </div>
      <p className="mb-5 text-sm leading-relaxed text-zinc-400">
        Contributing to shared tools, working through reviews, and improving the
        details people interact with.
      </p>
      <div className="grid gap-3">
        {prs?.slice(0, 3).map((pr) => (
          <PRCard key={pr.url} {...pr} href={pr.url} />
        ))}
      </div>
      {(!prs || prs.length === 0) && (
        <p className="text-sm leading-relaxed text-zinc-400">
          {prs
            ? "Explore my contributions on GitHub."
            : "The contribution feed is temporarily unavailable. You can still view my work on GitHub."}
        </p>
      )}
      <Link
        href="https://github.com/jatin-awankar"
        target="_blank"
        rel="noopener noreferrer"
        className="text-action mt-5"
      >
        View GitHub profile <ArrowUpRight size={16} />
      </Link>
      <p className="mt-4 font-display text-xs text-zinc-400">
        Selected contributions · feed refreshes hourly
      </p>
    </div>
  );
}
