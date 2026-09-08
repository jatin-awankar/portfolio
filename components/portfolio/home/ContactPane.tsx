"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
const email = "jatinawankar02@gmail.com";
export function ContactPane() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setError(false);
    } catch {
      setError(true);
      setCopied(false);
    }
  }
  return (
    <div className="contact-content">
      <p className="eyebrow">04 / Let’s connect</p>
      <h2>
        Let’s <span className="text-orange-400">work together.</span>
      </h2>
      <p className="mt-5 max-w-xl leading-relaxed text-zinc-400">
        Open to full-stack and AI product roles.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href={`mailto:${email}`} className="action-primary">
          Get in touch <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="contact-email">
        <a href={`mailto:${email}`} className="inline-link">
          {email}
        </a>
        <button
          type="button"
          className="icon-action"
          onClick={copyEmail}
          aria-label="Copy email address"
        >
          {copied ? <Check size={17} /> : <Copy size={17} />}
        </button>
      </div>
      <p role="status" className="text-sm text-zinc-400">
        {error
          ? "Couldn’t copy automatically. Select the email address above to copy it."
          : copied
            ? "Email copied."
            : ""}
      </p>
      <footer className="contact-footer">
        <span>© {new Date().getFullYear()} Jatin Awankar</span>
      </footer>
    </div>
  );
}
