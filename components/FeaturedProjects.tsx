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
          "A multi-tenant usage metering and billing system designed for SaaS products with flexible pricing and scalable aggregation.",

        highlights: [
          "Tenant-isolated usage ingestion APIs",
          "Asynchronous aggregation with Redis + BullMQ workers",
          "Invoice generation and webhook-based event delivery",
        ],

        details: {
          context:
            "UsageFlow simulates the complexity SaaS companies face when tracking per-tenant usage, computing pricing tiers, and generating accurate invoices at scale.",

          focus: [
            "Designing schemas for strict multi-tenant isolation",
            "Building idempotent event ingestion pipelines",
            "Offloading heavy aggregation to background workers for scalability",
          ],
        },

        stack: [
          "Next.js",
          "PostgreSQL (Prisma)",
          "Redis (BullMQ)",
          "NextAuth",
          "Webhooks",
        ],

        github: "https://github.com/jatin-awankar/UsageFlow",
        live: "https://usage-flow.vercel.app/",
      },
      {
        id: 3,
        title: "Petrol Partner",
        description:
          "A campus-focused ride-sharing platform with real-time tracking, role-based flows, and safety-first system design.",

        highlights: [
          "Driver–passenger matching workflows",
          "Live map tracking with real-time updates",
          "Secure authentication and access control",
        ],

        details: {
          context:
            "Petrol Partner was built as a product-focused system addressing ride coordination, trust, and scalability within a closed student network.",

          focus: [
            "Designing bidirectional ride offer/request flows",
            "Managing real-time location updates and state synchronization",
            "Structuring the system for future mobile and payment integration",
          ],
        },

        stack: ["Next.js", "Supabase", "Mapbox", "Realtime", "Razorpay"],

        github: "https://github.com/jatin-awankar/Petrol-Partner",
        live: "https://petrol-partner.vercel.app",
      },
      {
        id: 4,
        title: "STEM Video Conference App",
        description:
          "A real-time video collaboration platform built with third-party streaming infrastructure and authenticated session management.",

        highlights: [
          "Low-latency video sessions using GetStream",
          "User authentication and protected meeting flows",
          "Extensible UI designed for collaborative workflows",
        ],

        details: {
          context:
            "This project explores real-time communication architecture, focusing on secure session handling and integration with external streaming infrastructure.",

          focus: [
            "Integrating and abstracting third-party video APIs",
            "Designing authenticated, user-scoped meeting sessions",
            "Structuring the frontend for modular feature expansion",
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
          "A map-driven civic reporting platform enabling structured issue submission and location-aware tracking.",

        highlights: [
          "Interactive map-based issue reporting",
          "Category-based issue classification",
          "Responsive and accessibility-aware interface",
        ],

        details: {
          context:
            "Civic Issue Reporter addresses the need for structured reporting of civic infrastructure problems with precise geolocation context and organized backend data handling.",

          focus: [
            "Designing intuitive location-selection workflows",
            "Modeling issue categories and lifecycle states",
            "Building REST APIs for structured issue management",
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
    [],
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
