import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const iconLinkClass =
  "rounded-sm text-zinc-500 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 motion-reduce:transition-none";

export function ContactPane() {
  return (
    <div>
      <p className="mb-3 font-display text-xs text-zinc-500">$ contact --open</p>
      <h2 className="mb-6 max-w-xl font-display text-2xl font-bold tracking-normal text-zinc-100 lg:text-3xl">
        Ready to build your next product with confidence?
      </h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-400">
        If you are shipping an MVP, fixing unstable backend flows, or preparing
        to scale, I can help as your full-stack delivery partner.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="mailto:jatinawankar02@gmail.com"
          className="rounded-md bg-orange-400 px-5 py-2.5 font-display text-sm font-medium text-zinc-950 transition-colors hover:bg-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 motion-reduce:transition-none"
        >
          contact --email
        </Link>
        <div className="flex gap-3">
          <Link
            href="https://github.com/jatin-awankar"
            target="_blank"
            rel="noopener noreferrer"
            className={iconLinkClass}
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/jatin-awankar"
            target="_blank"
            rel="noopener noreferrer"
            className={iconLinkClass}
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:jatinawankar02@gmail.com"
            className={iconLinkClass}
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <p className="mt-10 font-display text-xs text-zinc-600">
        © 2026 Jatin Awankar -- built with Next.js, Tailwind & a terminal you
        can&apos;t quit
      </p>
    </div>
  );
}
