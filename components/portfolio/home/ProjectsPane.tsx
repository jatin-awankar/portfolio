import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";

type ProjectTileProps = {
  project: Project;
  big?: boolean;
};

function ProjectTile({ project, big = false }: ProjectTileProps) {
  const href = project.live ?? project.github ?? "/projects";

  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`group rounded-md border border-zinc-800/60 bg-zinc-950/30 p-5 transition-colors hover:border-orange-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none ${
        big ? "sm:col-span-2" : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-display text-sm font-medium text-zinc-100">
          {project.title}
        </h3>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-orange-400 motion-reduce:transition-none" />
      </div>
      <p className="mb-3 text-sm leading-relaxed text-zinc-400">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="rounded border border-zinc-800 px-2 py-0.5 font-display text-xs text-zinc-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

export function ProjectsPane() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-display text-xs text-zinc-500">// 02 - featured work</p>
        <Link
          href="/projects"
          className="rounded-sm font-display text-xs text-zinc-500 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
        >
          cd /projects -&gt;
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.slice(0, 3).map((project, index) => (
          <ProjectTile key={project.id} project={project} big={index === 0} />
        ))}
      </div>
    </div>
  );
}
