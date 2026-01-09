"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  highlights: string[];
  details: {
    context: string;
    focus: string[];
  };
  stack: string[];
  github?: string;
  live?: string;
};

export default function ProjectCard({
  title,
  description,
  highlights,
  details,
  stack,
  github,
  live,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className="rounded-xl border-l-2 border-primary bg-card p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-lg font-medium text-foreground">{title}</h4>
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-primary hover:underline"
            aria-expanded={open}
          >
            {open ? "Less" : "More"}
          </button>

          {github && (
            <Link
              href={github}
              target="_blank"
              className="text-primary hover:underline"
            >
              GitHub
            </Link>
          )}

          {live && (
            <Link
              href={live}
              target="_blank"
              className="text-primary hover:underline"
            >
              Live
            </Link>
          )}
        </div>
      </div>

      <p className="mt-2 text-muted-foreground">{description}</p>

      <ul className="mt-4 list-disc pl-5 text-muted-foreground">
        {highlights.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
        {stack.map((tech, i) => (
          <span
          key={tech || i}
          className="rounded-md border border-border px-2 py-1"
        >
          {tech}
        </span>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-6 overflow-hidden"
          >
            <p className="text-muted-foreground">{details.context}</p>

            <div className="mt-4">
              <p className="text-sm font-medium text-foreground">Engineering focus</p>
              <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                {details.focus.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
