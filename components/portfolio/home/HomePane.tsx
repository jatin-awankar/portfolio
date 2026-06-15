import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const iconLinkClass =
  "rounded-sm text-zinc-500 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none";

export function HomePane() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-xl">
        <p className="mb-4 font-display text-xs text-zinc-500">
          {"// 01 - intro"}
        </p>
        <h1 className="mb-6 font-display text-3xl font-bold leading-tight tracking-normal text-zinc-100 lg:text-5xl">
          I build scalable MVPs & SaaS products for startups
        </h1>
        <p className="leading-relaxed text-zinc-400">
          From idea to production -- fast, reliable, and built to scale. I help
          founders launch products with clean backend systems, real-time
          features, and architecture that won&apos;t break as you grow.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="mailto:jatinawankar02@gmail.com"
            className="rounded-sm bg-orange-400 px-5 py-2.5 font-display text-sm font-medium text-zinc-950 transition-colors hover:bg-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
          >
            Start a project
          </Link>
          <Link
            href="/projects"
            className="rounded-sm border border-zinc-700 px-5 py-2.5 font-display text-sm text-zinc-200 transition-colors hover:border-orange-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
          >
            View work
          </Link>
        </div>
      </div>
      <div className="flex gap-4">
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
        <Link
          href="/Jatin_Awankar_Resume.pdf"
          target="_blank"
          className={iconLinkClass}
          aria-label="Resume"
        >
          <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
