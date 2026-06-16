import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data/projects";

type ProjectTileProps = {
  project: Project;
  big?: boolean;
};

const featuredProjectSlugs = ["fortify", "usageflow", "petrol-partner"];

function ProjectTile({ project, big = false }: ProjectTileProps) {
  const tags = project.tags ?? [];

  return (
    <Link
      href={`/projects#${project.slug}`}
      className={`group overflow-hidden rounded-md border border-zinc-800/60 bg-zinc-950/30 transition-colors hover:border-orange-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none ${
        big ? "sm:col-span-2" : ""
      }`}
    >
      {project.image ? (
        <div className="relative h-44 max-h-44 w-full border-b border-zinc-800/60">
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            unoptimized={project.image.endsWith(".gif")}
            className="object-cover object-top"
            sizes="(min-width: 1024px) 512px, calc(100vw - 2rem)"
          />
        </div>
      ) : null}
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="font-display text-sm font-medium text-zinc-100">
            {project.name}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-orange-400 motion-reduce:transition-none" />
        </div>
        <p className="mb-3 text-sm leading-relaxed text-zinc-400">
          {project.tagline}
        </p>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-zinc-800 px-2 py-0.5 font-display text-xs text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

export function ProjectsPane() {
  const featuredProjects = featuredProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-display text-xs text-zinc-500">
          {"// 02 - featured work"}
        </p>
        <Link
          href="/projects"
          className="rounded-sm font-display text-xs text-zinc-500 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
        >
          cd /projects -&gt;
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <ProjectTile key={project.slug} project={project} big={index === 0} />
        ))}
      </div>
    </div>
  );
}
