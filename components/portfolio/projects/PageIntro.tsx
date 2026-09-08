import { projects } from "@/lib/data/projects";

export function PageIntro() {
  return (
    <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/20 px-4 py-4">
      <p className="project-label mb-2"><span className="project-highlight-marker">$ ls /projects</span> · {projects.length} projects</p>
      <h1 className="font-display text-2xl font-semibold text-zinc-100 sm:text-3xl">Selected projects.</h1>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">Developer tools, billing systems, and products built for the web.</p>
    </div>
  );
}
