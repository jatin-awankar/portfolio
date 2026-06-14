"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ContributionStatus = "merged" | "in-review";

type Contribution = {
  title: string;
  pr: string;
  prNumber: string;
  status: ContributionStatus;
  description: string;
};

type OSSProject = {
  project: string;
  description: string;
  stars: string;
  url: string;
  contributions: Contribution[];
};

const contributions: OSSProject[] = [
  {
    project: "OpenStatus",
    description: "Open-source synthetic monitoring platform",
    stars: "8.7k",
    url: "https://github.com/openstatusHQ/openstatus",
    contributions: [
      {
        title: "Add loading skeleton to status pages list",
        pr: "https://github.com/openstatusHQ/openstatus/pull/2261",
        prNumber: "#2261",
        status: "merged",
        description:
          "Replaced blank loading state with DataTableSkeleton component for better UX",
      },
      {
        title: "Add loading state to DomainConfiguration component",
        pr: "https://github.com/openstatusHQ/openstatus/pull/2276",
        prNumber: "#2276",
        status: "in-review",
        description:
          "Wired existing isLoading to show spinner during domain queries using DomainStatusIcon",
      },
    ],
  },
];

const statusLabels: Record<ContributionStatus, string> = {
  merged: "Merged",
  "in-review": "In Review",
};

const statusBadgeStyles: Record<ContributionStatus, string> = {
  merged:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  "in-review":
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

export default function OpenSource() {
  const totalContributions = contributions.reduce(
    (count, project) => count + project.contributions.length,
    0,
  );

  return (
    <section className="max-w-6xl text-left">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">
            Community
          </p>
          <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Open Source
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Pull requests and improvements shipped to production open-source
            projects I use and learn from.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-3 rounded-full border border-border/70 bg-background/50 px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/80" />
          {totalContributions} merged and active PRs
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
        className="mt-10 grid gap-6"
      >
        {contributions.map((project) => (
          <motion.article
            key={project.project}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, ease: "easeOut" },
              },
            }}
            className="group rounded-3xl border border-border/75 bg-card/45 p-6 shadow-[0_14px_36px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-card/60 dark:shadow-[0_18px_55px_rgba(0,0,0,0.35)] sm:p-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Github className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  {project.project}
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                </Link>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border/70 bg-background/55 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-amber-400/80 text-amber-500/80" />
                {project.stars} stars
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {project.contributions.map((contribution) => (
                <div
                  key={contribution.pr}
                  className="rounded-2xl border border-border/70 bg-background/55 p-4 transition-colors duration-200 hover:bg-accent/20"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <h4 className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                          {contribution.title}
                        </h4>
                        <Link
                          href={contribution.pr}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          {contribution.prNumber}
                        </Link>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {contribution.description}
                      </p>
                    </div>

                    <Badge
                      variant="outline"
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-0.5",
                        statusBadgeStyles[contribution.status],
                      )}
                    >
                      {statusLabels[contribution.status]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
