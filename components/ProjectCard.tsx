"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

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
      className="cursor-pointer rounded-xl border-l-2 border-cyan-200 bg-card p-6"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between gap-3 items-center">
        <h4 className="textlg font-medium">{title}</h4>
        <div className="flex gap-4 items-center text-sm">
          <button
            onClick={() => setOpen(!open)}
            className="text-primary hover:underline"
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
          <Button
            key={tech || i}
            variant="outline"
            size="sm"
            className="px-1 font-light"
          >
            {tech}
          </Button>
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
              <p className="text-sm font-medium">Engineering focus</p>
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
