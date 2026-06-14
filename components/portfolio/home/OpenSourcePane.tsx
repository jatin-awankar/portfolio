import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  openSourceProjects,
  type Contribution,
  type ContributionStatus,
} from "@/lib/portfolio-data";

const statusLabels: Record<ContributionStatus, string> = {
  merged: "Merged",
  "in-review": "In Review",
};

function StatusPill({ status }: { status: ContributionStatus }) {
  const merged = status === "merged";

  return (
    <span
      className={cn(
        "rounded border px-2 py-0.5 font-display text-xs uppercase tracking-normal",
        merged
          ? "border-orange-400/40 bg-orange-400/10 text-orange-400"
          : "border-zinc-700 text-zinc-500",
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

function PRCard({ contribution }: { contribution: Contribution }) {
  return (
    <Link
      href={contribution.pr}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-md border border-zinc-800/60 bg-zinc-950/30 p-5 transition-colors hover:border-orange-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-display text-xs text-zinc-500">
          openstatusHQ/openstatus {contribution.prNumber}
        </span>
        <StatusPill status={contribution.status} />
      </div>
      <p className="text-sm text-zinc-200">{contribution.title}</p>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">
        {contribution.description}
      </p>
    </Link>
  );
}

export function OpenSourcePane() {
  const contributions = openSourceProjects.flatMap(
    (project) => project.contributions,
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-display text-xs text-zinc-500">// 04 - open source</p>
        <Link
          href="/open-source"
          className="rounded-sm font-display text-xs text-zinc-500 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
        >
          cd /open-source -&gt;
        </Link>
      </div>
      <div className="grid gap-3">
        {contributions.map((contribution) => (
          <PRCard key={contribution.pr} contribution={contribution} />
        ))}
      </div>
    </div>
  );
}
