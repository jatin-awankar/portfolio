"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Check, Copy, X } from "lucide-react";
import type { DemoAccess } from "@/lib/data/projects";

export type DemoDialogProps = {
  demo: DemoAccess;
  projectName: string;
  onClose: () => void;
};

export function DemoDialog({ demo, projectName, onClose }: DemoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [copied, setCopied] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  async function copy(label: string, value: string) {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    setCopied(null);
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      copyTimer.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopyError(true);
    }
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="project-demo-dialog"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
          <span className="status-dot" aria-hidden="true" />
          <h2 id={titleId} className="min-w-0 flex-1 font-display text-sm text-zinc-100">{projectName} · {demo.kind === "credentials" ? "Demo access" : "Sign in"}</h2>
          <button type="button" autoFocus onClick={onClose} aria-label="Close demo access dialog" className="icon-action"><X size={18} aria-hidden="true" /></button>
        </div>
        <div className="space-y-4 p-4 sm:p-5">
          {demo.kind === "credentials" ? (
            <>
              <p className="text-sm leading-relaxed text-zinc-400">Use this shared account to explore the app. Some actions are disabled in demo mode.</p>
              <dl className="space-y-3">
                {([['Email', demo.email], ['Password', demo.password]] as const).map(([label, value]) => (
                  <div key={label} className="project-demo-credential">
                    <div className="min-w-0">
                      <dt className="project-label">{label}</dt>
                      <dd className="mt-1 select-text break-all font-display text-sm text-zinc-100">{value}</dd>
                    </div>
                    <button type="button" className="icon-action" aria-label={`Copy ${label.toLowerCase()}`} onClick={() => void copy(label, value)}>
                      {copied === label ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                    </button>
                  </div>
                ))}
              </dl>
              <p role="status" aria-live="polite" className="min-h-5 text-sm text-zinc-400">{copyError ? "Copy unavailable. Select the text to copy it manually." : copied ? `${copied} copied.` : ""}</p>
            </>
          ) : <p className="text-sm leading-relaxed text-zinc-300">{demo.instructions}</p>}
          <a href={demo.url} target="_blank" rel="noopener noreferrer" className="action-primary w-full">
            {demo.kind === "credentials" ? "Open demo" : "Open app"} <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
