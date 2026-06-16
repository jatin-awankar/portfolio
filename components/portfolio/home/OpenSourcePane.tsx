import Link from "next/link";
import { PRCard } from "@/components/portfolio/PRCard";
import { getOpenSourcePRs } from "@/lib/github";

export async function OpenSourcePane() {
  const totalContributions = await getOpenSourcePRs()
    .then((prs) => prs.length)
    .catch(() => 0);
  const contributions = await getOpenSourcePRs()
    .then((prs) => prs.slice(0, 3))
    .catch(() => []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-display text-xs text-zinc-500">
          {"// 04 - open source (" + totalContributions + " PRs)"}
        </p>
        <Link
          href="/about"
          className="rounded-sm font-display text-xs text-zinc-500 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
        >
          cd /about -&gt;
        </Link>
      </div>
      <div className="grid gap-3">
        {contributions.map((contribution) => (
          <PRCard
            key={contribution.url}
            repo={contribution.repo}
            title={contribution.title}
            status={contribution.status}
            href={contribution.url}
          />
        ))}
      </div>
    </div>
  );
}
