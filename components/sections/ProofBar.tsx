"use client";

import { motion } from "framer-motion";

const proofItems = [
  {
    title: "What clients hire for",
    body: "MVP delivery, API architecture, scaling plans",
  },
  {
    title: "How I work",
    body: "Weekly shipping, clean code, clear decisions",
  },
  {
    title: "Stack confidence",
    body: "Next.js, PostgreSQL, Redis, queues, real-time",
  },
] as const;

export default function ProofBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <div className="rounded-3xl mt-10 border border-border/80 bg-card/38 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.07)] backdrop-blur-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.24)] sm:p-5">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.07, delayChildren: 0.03 },
            },
          }}
          className="grid gap-3 sm:grid-cols-3"
        >
          {proofItems.map((item) => (
            <motion.article
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.35, ease: "easeOut" },
                },
              }}
              className="rounded-2xl border border-border/75 bg-background/58 px-4 py-3.5 transition-colors duration-200 hover:bg-accent/30"
            >
              <p className="text-sm font-semibold tracking-[0.01em] text-foreground">
                {item.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
