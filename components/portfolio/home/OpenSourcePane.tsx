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
      <div className="grid gap-3">
        {prs?.slice(0, 2).map((pr) => (
          <PRCard key={pr.url} {...pr} href={pr.url} />
        ))}
      </div>
      {(!prs || prs.length === 0) && (
        <p className="text-sm leading-relaxed text-zinc-400">
          {prs
            ? "Explore my contributions on GitHub."
            : "The feed is unavailable. View my contributions on GitHub."}
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
    </div>
  );
}
