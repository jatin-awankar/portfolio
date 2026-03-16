"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { ProjectCardProps } from "@/components/FeaturedProjects";

export default function ProjectCard({
  title,
  description,
  demo,
  highlights,
  details,
  stack,
  github,
  live,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-xl border-l-2 border-primary p-6 hover:-translate-y-[2px] transition hover:border-primary/40 bg-muted/40 hover:bg-card/80">
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-lg font-semibold">{title}</h4>

        <div className="flex gap-3 text-sm">
          {github && (
            <Link
              href={github}
              target="_blank"
              className="rounded-md border px-3 py-1 hover:bg-muted transition text-primary"
            >
              GitHub
            </Link>
          )}

          {live && (
            <Link
              href={live}
              target="_blank"
              className="rounded-md border px-3 py-1 hover:bg-muted transition text-primary"
            >
              Live
            </Link>
          )}
        </div>
      </div>

      <p className="mt-2 text-muted-foreground">{description}</p>

      {demo && (
        <div className="mt-4 rounded-md border border-border bg-muted/40 p-3 text-sm">
          <p className="font-medium text-foreground">Demo account</p>

          <div className="mt-1 text-muted-foreground">
            <p>Email: {demo.email}</p>
            <p>Password: {demo.password}</p>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border px-2 py-2 tracking-widest bg-background"
          >
            {tech}
          </span>
        ))}
      </div>

      {details && (
        <>
          <button
            onClick={() => setOpen(!open)}
            className="mt-4 text-sm text-primary hover:underline"
          >
            {open ? "Hide architecture" : "View architecture"}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 text-sm text-muted-foreground"
              >
                <p>{details.context}</p>

                <ul className="mt-3 space-y-1">
                  {details.focus.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>

                <p className="mt-4 font-medium text-foreground">Highlights</p>
                <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground">
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </article>
  );
}
