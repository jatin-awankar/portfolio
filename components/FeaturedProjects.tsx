"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ProjectCardProps = {
  id: number;
  title: string;
  description: string;
  highlights: string[];
  stack: string[];
  demo?: {
    email: string;
    password: string;
  };
  github?: string;
  live?: string;
  image?: string;
};

export const projects = [
  {
    id: 1,
    title: "UsageFlow",
    description:
      "A SaaS billing platform that tracks usage, calculates pricing, and generates invoices reliably — designed for products that scale.",
    image: "/projects/usageflow.png",
    demo: {
      email: "demo@usageflow.com",
      password: "Test@1234",
    },
    highlights: [
      "Handles usage ingestion and billing computation",
      "Background job processing with Redis + BullMQ",
      "Reliable webhook delivery with retries",
    ],
    stack: ["Next.js", "PostgreSQL", "Redis", "BullMQ", "NextAuth"],
    github: "https://github.com/jatin-awankar/UsageFlow",
    live: "https://usageflow.vercel.app/",
  },
  {
    id: 2,
    title: "Petrol Partner",
    description:
      "A ride-sharing platform with real-time booking and concurrency-safe seat allocation to prevent double bookings.",
    image: "/projects/petrol-partner.png",
    demo: {
      email: "demo@petrolpartner.com",
      password: "Test@1234",
    },
    highlights: [
      "Atomic seat allocation system",
      "Real-time ride tracking",
      "Driver-passenger matching workflow",
    ],
    stack: ["Next.js", "Supabase", "Mapbox", "Realtime", "Razorpay"],
    github: "https://github.com/jatin-awankar/Petrol-Partner",
    live: "https://petrol-partner.vercel.app",
  },
  {
    id: 3,
    title: "STEM Video App",
    description:
      "A real-time video collaboration platform with secure sessions and low-latency streaming.",
    image: "/projects/stem.png",
    highlights: [
      "Low-latency video streaming",
      "Secure authenticated sessions",
      "Scalable meeting architecture",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Clerk", "GetStream"],
    github: "https://github.com/jatin-awankar/STEM-video-conference-app",
    live: "https://stem-connecting-people.vercel.app",
  },
  {
    id: 4,
    title: "Civic Issue Reporter",
    description:
      "A map-based platform for reporting civic issues with structured data and location-aware tracking.",
    image: "/projects/civic.png",
    highlights: [
      "Map-based issue reporting",
      "Category-based issue tracking",
      "REST API backend",
    ],
    stack: ["React", "Node.js", "Express", "TypeScript", "MongoDB", "Mapbox"],
    github: "https://github.com/jatin-awankar/Civic-Issue-Reporter",
    live: "https://civic-issue-reporter-application.vercel.app",
  },
];

const INITIAL_LIMIT = 4;

export default function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_LIMIT);
  const hiddenCount = projects.length - visibleProjects.length;

  return (
    <section className="mt-32 max-w-6xl text-left">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-semibold sm:text-3xl">Project Work</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Case studies focused on business-critical outcomes: reliability,
            speed, and user experience under real usage.
          </p>
        </div>

        {projects.length > INITIAL_LIMIT && (
          <div className="inline-flex w-fit items-center rounded-2xl border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className={cn(
                "relative rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                !showAll ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {!showAll && (
                <motion.span
                  layoutId="projects-toggle"
                  className="absolute inset-0 rounded-xl bg-white/10"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
                />
              )}
              <span className="relative">Selected</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className={cn(
                "relative rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                showAll ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {showAll && (
                <motion.span
                  layoutId="projects-toggle"
                  className="absolute inset-0 rounded-xl bg-white/10"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
                />
              )}
              <span className="relative">All</span>
            </button>
          </div>
        )}
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.05 },
          },
        }}
        className="mt-12 grid gap-8 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
              }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {projects.length > INITIAL_LIMIT && !showAll && (
        <div className="mt-12">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAll(true)}
            className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
          >
            Show all projects
            <span className="ml-2 text-xs text-muted-foreground">({hiddenCount} more)</span>
          </Button>
        </div>
      )}
    </section>
  );
}
