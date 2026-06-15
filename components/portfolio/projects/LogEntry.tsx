import type { ProjectLogEntry } from "@/lib/data/projects";

export type LogEntryProps = ProjectLogEntry;

export function LogEntry({ hash, type, desc }: LogEntryProps) {
  return (
    <li className="flex flex-wrap gap-x-3 gap-y-1 text-xs leading-relaxed">
      <span className="text-zinc-600">{hash}</span>
      <span className="text-orange-400">{type}:</span>
      <span className="text-zinc-300">{desc}</span>
    </li>
  );
}
