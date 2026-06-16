"use client";

import { KeyboardEvent, useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { DemoAccess } from "@/lib/data/projects";

export type DemoDialogProps = {
  demo: DemoAccess;
  projectName: string;
  onClose: () => void;
};

function projectSlug(projectName: string): string {
  return projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function focusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("disabled"));
}

export function DemoDialog({ demo, projectName, onClose }: DemoDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const onTrapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) {
      return;
    }

    const focusable = focusableElements(panelRef.current);
    if (!focusable.length) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Demo access for ${projectName}`}
        onKeyDown={onTrapFocus}
        onMouseDown={(event) => event.stopPropagation()}
        className="w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-lg border border-zinc-800/60 bg-zinc-950/95 font-display text-xs shadow-2xl shadow-black/60 backdrop-blur-md"
      >
        <div className="flex items-center gap-2 border-b border-zinc-800/60 bg-zinc-900/40 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="ml-2 min-w-0 flex-1 truncate text-zinc-500">
            ~/projects/{projectSlug(projectName)}.demo
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close demo access dialog"
            className="rounded-sm text-zinc-500 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 motion-reduce:transition-none"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-2 px-4 py-4 text-zinc-400">
          <p className="text-orange-400">$ cat .env.demo</p>
          <div className="flex gap-3">
            <span className="w-24 shrink-0 text-zinc-500">DEMO_URL</span>
            <a
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-orange-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              {demo.url}
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
          <div className="flex gap-3">
            <span className="w-24 shrink-0 text-zinc-500">DEMO_EMAIL</span>
            <span className="break-all text-zinc-200">{demo.email}</span>
          </div>
          <div className="flex gap-3">
            <span className="w-24 shrink-0 text-zinc-500">DEMO_PASS</span>
            <span className="break-all text-zinc-200">{demo.password}</span>
          </div>
        </div>

        <div className="border-t border-zinc-800/60 px-4 py-3 text-xs text-zinc-600">
          demo account - some actions disabled in demo mode
        </div>
      </div>
    </div>
  );
}
