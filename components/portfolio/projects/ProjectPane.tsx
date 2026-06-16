import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { Pane } from "@/components/portfolio/Pane";
import type { Project } from "@/lib/data/projects";
import { LogEntry } from "./LogEntry";

export type ProjectPaneProps = {
  project: Project;
};

function formatStack(stack: Project["stack"]): string {
  const stackLines = Object.entries(stack).map(
    ([key, value], index, entries) =>
      `  "${key}": "${value}"${index < entries.length - 1 ? "," : ""}`,
  );

  return `{\n${stackLines.join("\n")}\n}`;
}

export function ProjectPane({ project }: ProjectPaneProps) {
  const stack = formatStack(project.stack);

  return (
    <Pane id={project.slug} title={`~/projects/${project.slug}.tsx`}>
      <div className="space-y-6 scroll-mt-28">
        {project.image ? (
          <div className="relative h-56 max-h-56 w-full overflow-hidden rounded-md border border-zinc-800">
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              fill
              unoptimized={project.image.endsWith(".gif")}
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, calc(100vw - 2rem)"
            />
          </div>
        ) : (
          <div className="relative flex h-56 max-h-56 w-full items-center justify-center rounded-md border border-zinc-800 bg-linear-to-br from-zinc-900 to-zinc-950">
            <span className="font-display text-xs text-zinc-600">
              preview.png
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold tracking-normal text-zinc-100 lg:text-2xl">
              {project.name}
            </h2>
            <p className="mt-1 max-w-md text-sm text-zinc-400">
              {project.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={project.live}
              className="flex items-center gap-1.5 rounded-md border border-zinc-700 px-3 py-1.5 font-display text-xs text-zinc-200 transition-colors hover:border-orange-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              {project.name === "Fortify" ? "view on npm" : "open --live"}
            </Link>
            <Link
              href={project.source}
              className="flex items-center gap-1.5 rounded-md border border-zinc-700 px-3 py-1.5 font-display text-xs text-zinc-200 transition-colors hover:border-orange-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
            >
              <Github className="h-3.5 w-3.5" />
              open --source
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <p className="mb-2 font-display text-xs text-zinc-500">
                README.md
              </p>
              <p className="text-sm leading-relaxed text-zinc-300">
                {project.overview}
              </p>
            </div>
            <div>
              <p className="mb-2 font-display text-xs text-zinc-500">
                $ git log --oneline
              </p>
              <ul className="space-y-2 rounded-md border border-zinc-800 bg-zinc-950/40 p-4">
                {project.log.map((entry) => (
                  <LogEntry key={entry.hash} {...entry} />
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className="mb-2 font-display text-xs text-zinc-500">
              package.json
            </p>
            <pre className="overflow-x-auto whitespace-pre rounded-md border border-zinc-800 bg-zinc-950/40 p-4 font-display text-xs leading-relaxed text-zinc-400">
              {stack}
            </pre>
          </div>
        </div>
      </div>
    </Pane>
  );
}
