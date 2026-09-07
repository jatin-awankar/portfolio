import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { BookingDemo } from "./BookingDemo";

const selected = [
  {
    slug: "usageflow",
    number: "01",
    category: "BILLING INFRASTRUCTURE",
    decision: "Designed for retries, not just the happy path.",
    detail:
      "Idempotent webhook handling, atomic usage updates, and background invoice processing.",
    evidence: "Explore the billing architecture",
  },
  {
    slug: "petrol-partner",
    number: "02",
    category: "CONCURRENCY & REALTIME",
    decision: "The last seat should only be booked once.",
    detail:
      "Row-level locking and an explicit booking state machine keep competing requests consistent.",
    evidence: "Explore the booking system",
  },
  {
    slug: "fortify",
    number: "03",
    category: "DEVELOPER TOOLING",
    decision: "Useful AI, right where developers work.",
    detail:
      "A published Node.js CLI for error explanations, git-aware commits, and persistent chat sessions.",
    evidence: "Explore the CLI implementation",
  },
];

export function ProjectsPane() {
  return (
    <div>
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Selected engineering</p>
          <h2>Software with something to solve.</h2>
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
                {project.image && entry.slug !== "fortify" ? (
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
                  <p className="work-decision">{entry.decision}</p>
                  <p className="work-detail">{entry.detail}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags?.slice(0, 4).map((tag) => (
                      <span className="tech-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="work-evidence">
                    {entry.evidence} <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
      <div className="mt-6">
        <BookingDemo />
      </div>
      <p className="mt-6 text-sm leading-relaxed text-zinc-400">
        Also delivered:{" "}
        <Link href="/projects#olympic-windows" className="inline-link">
          Olympic Windows
        </Link>
        , a client website with product pages and a consultation enquiry flow.
      </p>
    </div>
  );
}
