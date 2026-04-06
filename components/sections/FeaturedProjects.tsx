"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

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
      "A SaaS billing platform that tracks usage, calculates pricing, and generates invoices reliably -- designed for products that scale.",
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
    stack: ["React", "Node.js", "Express", "MongoDB", "Mapbox"],
    github: "https://github.com/jatin-awankar/Civic-Issue-Reporter",
    live: "https://civic-issue-reporter-application.vercel.app",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="max-w-6xl text-left">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-semibold sm:text-3xl">Project Work</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Case studies focused on business-critical outcomes: reliability,
            speed, and user experience under real usage.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-3 rounded-full border border-border/70 bg-background/50 px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/80" />
          {projects.length} showcased builds
        </div>
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
        className="mt-10 grid gap-8 md:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: "easeOut" },
              },
            }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
