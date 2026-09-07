import type { ReactNode } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export type TerminalPaneProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function TerminalPane({
  title,
  children,
  className,
}: TerminalPaneProps) {
  return (
    <section
      className={cn(
        "portfolio-pane overflow-hidden rounded-lg border border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-zinc-800/60 bg-zinc-900/60 px-4 py-2.5 font-display text-xs text-zinc-400">
        <Terminal className="h-3.5 w-3.5" />
        <span>{title}</span>
      </div>
      <div className="p-5 sm:p-7 lg:p-8">{children}</div>
    </section>
  );
}
