import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { BookingDemo } from "./BookingDemo";

const selected = [
  {
    slug: "num1",
    number: "01",
    category: "CURRENTLY BUILDING",
    detail: "Measuring agent performance. Improving codebases for AI.",
  },
  {
    slug: "fortify",
    number: "02",
    category: "AI DEVELOPER TOOLS",
    detail:
      "An AI-powered CLI for error explanations, commits, and codebase summaries.",
  },
  {
    slug: "usageflow",
    number: "03",
    category: "SAAS BILLING",
    detail:
      "Usage-based billing with safe retries and accurate metering.",
  },
];

export function ProjectsPane() {
  return (
    <div>
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Selected engineering</p>
          <h2>Selected work.</h2>
        </div>
        <Link href="/projects" className="text-action">
          All projects <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="project-grid">
        {selected.map((entry, index) => {
          const project = projects.find((item) => item.slug === entry.slug)!;
          return (
            <article
              key={entry.slug}
              className={`work-card ${index === 0 ? "work-card-featured" : ""}`}
            >
              <Link
                href={`/projects#${project.slug}`}
                className="work-card-link"
              >
                {entry.slug === "num1" ? (
                  <div className="cli-preview" aria-label="Num1 product focus">
                    <span className="text-zinc-400">~/projects/num1</span>
                    <p>Cost & speed</p>
                    <p>Reliability & human effort</p>
                    <p>Codebase improvements</p>
                    <span className="text-zinc-400">In development · Not yet public</span>
                  </div>
                ) : project.image && entry.slug !== "fortify" ? (
                  <div className="work-preview">
                    <Image
                      src={project.image}
                      alt={`${project.name} product preview`}
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 520px, (min-width: 640px) 50vw, 90vw"
                    />
                  </div>
                ) : (
                  <div
                    className="cli-preview"
                    aria-label="Fortify command examples"
                  >
                    <span className="text-zinc-400">~/projects/fortify</span>
                    <p>
                      <span>$</span> fortify explain ./error.log
                    </p>
                    <p>
                      <span>$</span> fortify commit
                    </p>
                    <p>
                      <span>$</span> fortify chat
                    </p>
                    <span className="text-zinc-400">
                      Node.js · published on npm
                    </span>
                  </div>
                )}
                <div className="work-copy">
                  <p className="eyebrow">
                    {entry.number} / {entry.category}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <h3>{project.name}</h3>
                    <ArrowUpRight size={19} className="text-orange-400" />
                  </div>
                  <p className="work-detail">{entry.detail}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags?.slice(0, 3).map((tag) => (
                      <span className="tech-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
      <details className="project-experiment mt-6">
        <summary>Try a booking simulation</summary>
        <BookingDemo />
      </details>
    </div>
  );
}
