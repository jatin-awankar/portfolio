import { projects } from "@/lib/data/projects";

export function StatsStrip() {
  return (
    <div className="stats-strip" aria-label="Portfolio at a glance">
      <span className="font-display text-orange-400">$ work --summary</span>
      <span>
        <strong>{projects.length}</strong> selected projects
      </span>
      <span>
        <strong>Full-stack</strong> development
      </span>
      <span>
        <strong>Open source</strong> contributor
      </span>
      <span className="flex items-center gap-2">
        <span className="status-dot" /> Open to engineering roles
      </span>
    </div>
  );
}
