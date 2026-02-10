"use client";

import ProjectCard from "@/components/ProjectCard";
import { useMemo, useState } from "react";

export default function FeaturedProjects() {
  const projects = useMemo(
    () => [
      // {
      //   id: 1,
      //   title:"Industry-Grade Web Application",
      //       description: "A production-style web application designed with real-world engineering constraints in mind.",
      //       highlights: [
      //         "Authentication with role-based access",
      //         "Non-trivial relational database schema",
      //         "End-to-end workflow with edge cases handled",
      //       ],
      //       details: {
      //         context:
      //           "This project was built to simulate how real products are designed and maintained in industry, focusing on architecture, data modeling, and long-term maintainability rather than quick demos.",
      //         focus: [
      //           "System-first design before implementation",
      //           "Clear separation of concerns across layers",
      //           "Handling real-world edge cases and failures",
      //         ],
      //       },
      //       stack: ["Next.js", "PostgreSQL", "Tailwind", "Auth"],
      //       github: "#",
      //       live: "#",
      // },
      {
        id: 2,
        title: "UsageFlow",
        description:
          "A usage-based billing and metering system for SaaS products.",
        highlights: [
          "Multi-tenant usage ingestion APIs",
          "Background aggregation workers",
          "Invoice generation and webhooks",
        ],
        details: {
          context:
            "LedgerFlow addresses the complexity SaaS teams face when tracking usage, pricing flexibly, and generating accurate invoices at scale.",
          focus: [
            "Designing schemas for multi-tenant isolation",
            "Using background jobs for heavy aggregation",
            "Ensuring idempotent and reliable event processing",
          ],
        },
        stack: ["Next.js", "PostgreSQL", "Tailwind", "Auth"],
        github: "https://github.com/jatin-awankar/UsageFlow",
        live: "https://usage-flow.vercel.app/",
      },
      {
        id: 3,
        title: "Petrol Partner",
        description:
          "A ride-sharing platform built for college students with real-time and safety-focused features.",
        highlights: [
          "Ride offer and request matching",
          "Real-time maps and tracking",
          "Secure authentication and access control",
        ],
        details: {
          context:
            "Petrol Partner was built as a real-world product idea focusing on usability, safety, and scalability for a closed user group.",
          focus: [
            "Real-time updates using maps and live data",
            "Designing flows for both drivers and passengers",
            "Planning for scalability and future mobile support",
          ],
        },
        stack: ["Next.js", "Supabase", "Mapbox", "Realtime"],
        github: "https://github.com/jatin-awankar/Petrol-Partner",
        live: "https://petrol-partner.vercel.app",
      },
      {
        id: 4,
        title: "STEM Video Conference App",
        description:
          "A web-based video conferencing platform built for real-time STEM collaboration.",
        highlights: [
          "Real-time video conferencing with low-latency communication",
          "Authentication and user management with Clerk",
          "Modern, responsive UI optimized for collaborative workflows",
        ],
        details: {
          context:
            "This project was built to explore real-time communication systems and collaborative tools, with a focus on creating a clean and extensible video conferencing experience tailored for STEM-related discussions and teamwork.",
          focus: [
            "Integrating third-party real-time video infrastructure (GetStream)",
            "Designing authenticated, user-specific conferencing flows",
            "Building an extensible frontend architecture for future features",
          ],
        },
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk", "GetStream"],
        live: "https://stem-connecting-people.vercel.app",
        github: "https://github.com/jatin-awankar/STEM-video-conference-app",
      },
      {
        id: 5,
        title: "Civic Issue Reporter",
        description:
          "A location-based platform for reporting and tracking real-world civic and environmental issues.",
        highlights: [
          "Location-based issue reporting using interactive maps",
          "Support for multiple civic issue categories",
          "Responsive UI focused on accessibility and usability",
        ],
        details: {
          context:
            "Civic Issue Reporter was built to address common civic and environmental problems such as road damage, waste management, drainage issues, and pipeline leakages by enabling citizens to report issues with precise location context.",
          focus: [
            "Designing clear user flows for issue reporting",
            "Integrating map-based location selection",
            "Building a scalable backend for issue data management",
          ],
        },
        stack: [
          "React (Vite)",
          "Node.js",
          "Express",
          "TypeScript",
          "MongoDB",
          "Mapbox",
        ],
        live: "https://civic-issue-reporter-application.vercel.app",
        github: "https://github.com/jatin-awankar/Civic-Issue-Reporter",
      },
    ],
    []
  );

  const INITIAL_LIMIT = 3;
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = useMemo(() => {
    return showAll ? projects : projects.slice(0, INITIAL_LIMIT);
  }, [showAll, projects]);

  const hiddenCount = projects.length - visibleProjects.length;

  return (
    <section className="mt-32 max-w-4xl text-start">
      <h3 className="text-xl text-primary font-medium">Featured Projects</h3>

      <p className="mt-2 text-muted-foreground">
        A small selection of projects that reflect how I approach real-world
        engineering problems.
      </p>

      <div className="mt-10 space-y-8">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            highlights={project.highlights}
            details={project.details}
            stack={project.stack}
            github={project.github}
            live={project.live}
          />
        ))}
      </div>

      {projects.length > INITIAL_LIMIT && (
        <div className="mt-10">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-card transition"
          >
            {showAll
              ? "Show less"
              : `Show more${hiddenCount > 0 ? ` (${hiddenCount})` : ""}`}
          </button>
        </div>
      )}
    </section>
  );
}
