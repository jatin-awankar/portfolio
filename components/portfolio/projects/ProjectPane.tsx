"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useState } from "react";
import { ArrowUpRight, FileText, Github, Play, Square } from "lucide-react";
import { Pane } from "@/components/portfolio/Pane";
import type { Project } from "@/lib/data/projects";
import { DemoDialog } from "./DemoDialog";
import { EngineeringHighlight } from "./EngineeringHighlight";

export type ProjectPaneProps = { project: Project };

export function ProjectPane({ project }: ProjectPaneProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const closeDemo = useCallback(() => setDemoOpen(false), []);
  const animated = project.image?.endsWith(".gif");

  return (
    <Pane id={project.slug} title={`~/projects/${project.slug}.tsx`} className="project-detail">
      <div className="min-w-0 space-y-6">
        {project.image ? (
          <div className="project-preview">
            {animated && !playing ? (
              <div className="project-cli-preview" aria-label="Fortify command examples">
                <p className="project-label">~/projects/fortify</p>
                <p><span>$</span> fortify explain ./error.log</p>
                <p><span>$</span> fortify commit</p>
                <p><span>$</span> fortify chat</p>
              </div>
            ) : (
              <Image
                src={project.image}
                alt={`${project.name} ${animated ? "terminal recording" : "website preview"}`}
                fill
                unoptimized={animated}
                className="object-contain"
                sizes="(min-width: 1152px) 1054px, (min-width: 640px) calc(100vw - 90px), calc(100vw - 74px)"
              />
            )}
            {animated ? (
              <button type="button" className="project-preview-toggle" aria-pressed={playing} onClick={() => setPlaying(!playing)}>
                {playing ? <Square size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                {playing ? "Stop recording" : "Play recording"}
              </button>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 max-w-xl">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-2xl font-semibold text-zinc-100">{project.name}</h2>
              {project.type === "client" ? <span className="project-client-label">Client work</span> : null}
              {project.status ? <span className="project-client-label">{project.status}</span> : null}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.tagline}</p>
          </div>
          <div className="project-actions">
            {project.demo ? (
              <button type="button" onClick={() => setDemoOpen(true)} className="action-primary" aria-haspopup="dialog">
                {project.demo.kind === "sign-in" ? "Try app" : "Try demo"} <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            ) : null}
            {project.live ? <Link href={project.live} className={project.demo ? "action-secondary" : "action-primary"}>
              {project.liveLabel ?? "Visit site"} <ArrowUpRight size={16} aria-hidden="true" />
            </Link> : null}
            {project.source ? <Link href={project.source} className="text-action"><Github size={16} aria-hidden="true" /> Source</Link> : null}
            {project.docs ? <Link href={project.docs} className="text-action"><FileText size={16} aria-hidden="true" /> Docs</Link> : null}
          </div>
        </div>

        {demoOpen && project.demo ? <DemoDialog demo={project.demo} projectName={project.name} onClose={closeDemo} /> : null}

        {project.status ? (
          <p className="max-w-2xl text-base leading-relaxed text-zinc-300">{project.overview}</p>
        ) : <div className="grid min-w-0 gap-6 lg:grid-cols-3">
          <div className="min-w-0 space-y-6 lg:col-span-2">
            <div>
              <h3 className="project-label mb-2">Overview</h3>
              <p className="text-base leading-relaxed text-zinc-300">{project.overview}</p>
            </div>
            <div>
              <h3 className="project-label mb-2">Engineering highlights</h3>
              <ul className="space-y-3 rounded-md border border-zinc-800 bg-zinc-950/40 p-4">
                {project.highlights.map((entry) => <EngineeringHighlight key={entry.desc} {...entry} />)}
              </ul>
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="project-label mb-2">Stack</h3>
            <pre className="project-stack">{JSON.stringify(project.stack, null, 2)}</pre>
          </div>
        </div>}
      </div>
    </Pane>
  );
}
