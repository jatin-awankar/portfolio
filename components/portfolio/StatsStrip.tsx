type Stat = {
  label: string;
  value: string;
};

const stats: Stat[] = [
  { label: "experience", value: "3+ yrs" },
  { label: "shipped", value: "4 products" },
  { label: "open source", value: "2 PRs active" },
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
