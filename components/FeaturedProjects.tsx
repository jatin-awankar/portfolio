"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";

export type ProjectCardProps = {
  id: number;
  title: string;
  description: string;
  highlights: string[];
  details: {
    context: string;
    focus: string[];
  };
  stack: string[];
  demo?: {
    email: string;
    password: string;
  };
  github?: string;
  live?: string;
};

export const projects: ProjectCardProps[] = [
  {
    id: 1,
    title: "UsageFlow",
    description:
      "Multi-tenant SaaS billing infrastructure handling usage ingestion, pricing computation, and invoice generation with reliability-first design.",
    demo: {
      email: "demo@usageflow.com",
      password: "Test@1234",
    },
    highlights: [
      "Schema-level multi-tenant isolation",
      "Async aggregation pipeline using Redis + BullMQ",
      "Durable webhook delivery with retries and failure logging",
    ],
    details: {
      context:
        "UsageFlow simulates SaaS billing infrastructure for tracking per-tenant usage and generating invoices reliably.",
      focus: [
        "Tenant-aware schema modeling",
        "Idempotent billing logic for duplicate events",
        "Separation of synchronous APIs and async background jobs",
      ],
    },
    stack: ["Next.js", "PostgreSQL", "Redis", "BullMQ", "NextAuth"],
    github: "https://github.com/jatin-awankar/UsageFlow",
    live: "https://usageflow.vercel.app/",
  },
  {
    id: 2,
    title: "Petrol Partner",
    description:
      "Concurrency-aware ride booking system preventing double seat allocation and ensuring consistent booking flows.",
    demo: {
      email: "demo@petrolpartner.com",
      password: "Test@1234",
    },
    highlights: [
      "Atomic seat allocation to avoid race conditions",
      "Driver-passenger matching workflow",
      "Payment edge case handling",
    ],
    details: {
      context:
        "Ride-sharing platform designed for student communities focusing on trust, coordination, and booking consistency.",
      focus: [
        "Bidirectional ride offer/request workflows",
        "Real-time location updates",
        "Future-ready architecture for mobile expansion",
      ],
    },
    stack: ["Next.js", "Supabase", "Mapbox", "Realtime", "Razorpay"],
    github: "https://github.com/jatin-awankar/Petrol-Partner",
    live: "https://petrol-partner.vercel.app",
  },
  {
    id: 3,
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
    id: 4,
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
];

const INITIAL_LIMIT = 3;

export default function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_LIMIT);

  const hiddenCount = projects.length - visibleProjects.length;

  return (
    <section className="mt-32 max-w-4xl text-start">
      <h3 className="text-xl font-medium text-primary">Featured Projects</h3>

      <p className="mt-2 text-muted-foreground">
        Selected systems demonstrating reliability, concurrency handling, and
        production-oriented backend design.
      </p>

      <div className="mt-10 space-y-8">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

      {projects.length > INITIAL_LIMIT && (
        <div className="mt-10">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-card transition"
          >
            {showAll ? "Show less" : `Show more (${hiddenCount})`}
          </button>
        </div>
      )}
    </section>
  );
}
