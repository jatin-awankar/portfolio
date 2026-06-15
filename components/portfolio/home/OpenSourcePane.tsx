import Link from "next/link";
import { PRCard } from "@/components/portfolio/PRCard";
import { openSourceProjects, type ContributionStatus } from "@/lib/portfolio-data";

const statusLabels: Record<ContributionStatus, "Merged" | "In review"> = {
  merged: "Merged",
  "in-review": "In review",
};

export function OpenSourcePane() {
  const contributions = openSourceProjects.flatMap(
    (project) => project.contributions,
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-display text-xs text-zinc-500">// 04 - open source</p>
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
            key={contribution.pr}
            repo={`openstatusHQ/openstatus ${contribution.prNumber}`}
            title={contribution.title}
            status={statusLabels[contribution.status]}
            href={contribution.pr}
            description={contribution.description}
          />
        ))}
      </div>
    </div>
  );
}
