import { cn } from "@/lib/utils";

export type PRStatus = "Merged" | "In review" | "Closed";

export type StatusPillProps = {
  status: PRStatus;
};

export function StatusPill({ status }: StatusPillProps) {
  const merged = status === "Merged";

  return (
    <span
      className={cn(
        "shrink-0 rounded border px-2 py-0.5 font-display text-xs uppercase tracking-normal",
        merged
          ? "border-orange-400/40 bg-orange-400/10 text-orange-400"
          : "border-zinc-700 text-zinc-500",
      )}
    >
      {status}
    </span>
  );
}
