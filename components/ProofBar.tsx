"use client";

import { motion } from "framer-motion";

export default function ProofBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="mt-12"
    >
      <div className="grid gap-3 rounded-2xl border border-border/70 bg-card/35 p-4 backdrop-blur-sm sm:grid-cols-3 sm:p-5">
        <p className="rounded-xl border border-border/60 bg-background/45 px-4 py-3 text-sm text-muted-foreground">
          <span className="block text-foreground font-semibold">
            What clients hire for
          </span>
          MVP delivery, API architecture, scaling plans
        </p>
        <p className="rounded-xl border border-border/60 bg-background/45 px-4 py-3 text-sm text-muted-foreground">
          <span className="block text-foreground font-semibold">
            How I work
          </span>
          Weekly shipping, clean code, clear decisions
        </p>
        <p className="rounded-xl border border-border/60 bg-background/45 px-4 py-3 text-sm text-muted-foreground">
          <span className="block text-foreground font-semibold">
            Stack confidence
          </span>
          Next.js, PostgreSQL, Redis, queues, real-time
        </p>
      </div>
    </motion.section>
  );
}
