import type { ProjectHighlight } from "@/lib/data/projects";

export type EngineeringHighlightProps = ProjectHighlight;

export function EngineeringHighlight({ desc }: EngineeringHighlightProps) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
      <span className="project-highlight-marker" aria-hidden="true">—</span>
      <span className="min-w-0">{desc}</span>
    </li>
  );
}
