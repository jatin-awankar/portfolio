import { getOpenSourcePRs } from "@/lib/github";

type Stat = {
  label: string;
  value: string;
};

const mergedContributions = await getOpenSourcePRs()
  .then((prs) => prs.filter((pr) => pr.status === "Merged").length)
  .catch(() => 0);

const activeContributions = await getOpenSourcePRs()
  .then((prs) => prs.filter((pr) => pr.status === "In review").length)
  .catch(() => 0);

const stats: Stat[] = [
  { label: "experience", value: "1+ yrs" },
  { label: "shipped", value: "4 products" },
  {
    label: "open source",
    value: `${activeContributions} ${activeContributions < 2 ? "PR" : "PRs"} active · ${mergedContributions} merged`,
  },
  { label: "status", value: "available" },
];

export function StatsStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-zinc-800/60 bg-zinc-900/20 px-4 py-3 font-display text-xs text-zinc-500">
      <span className="text-orange-400">$ stats --summary</span>
      {stats.map((stat) => (
        <span key={stat.label}>
          {stat.label}: <span className="text-zinc-200">{stat.value}</span>
        </span>
      ))}
    </div>
  );
}
