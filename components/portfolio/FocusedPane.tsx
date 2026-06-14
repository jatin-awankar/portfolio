import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FocusedPaneProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function FocusedPane({ title, children, className }: FocusedPaneProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-lg border border-l-2 border-zinc-800/60 border-l-orange-400 bg-zinc-900/40 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-zinc-800/60 bg-zinc-950/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-2 font-display text-xs text-zinc-500">{title}</span>
        <span className="ml-auto hidden font-display text-xs text-orange-400/70 sm:inline">
          active
        </span>
      </div>
      <div className="p-6 lg:p-10">{children}</div>
    </section>
  );
}
