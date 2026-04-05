"use client";

import { motion } from "framer-motion";

const paragraphs = [
  "I&rsquo;m a full-stack developer focused on building SaaS products and backend systems that actually hold up in real-world use &mdash; not just in ideal conditions.",
  "My strongest work is in SaaS products, backend-heavy systems, and workflows where reliability matters. I design for edge cases early: duplicate events, race conditions, retries, and partial failure states.",
  "Even at an early stage, I apply a senior engineering lens: clarify the trade-offs, keep architecture simple, and avoid shortcuts that become expensive later.",
  "If you&apos;re building a product and need someone who can think through both features and failure cases, I&rsquo;d be happy to help.",
] as const;

export default function About() {
  return (
    <section className="text-left">
      <div className="rounded-3xl border border-border/80 bg-card/34 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.07)] backdrop-blur-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.24)] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">
          Perspective
        </p>
        <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">About</h3>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.05 },
            },
          }}
          className="mt-6 grid max-w-3xl gap-5 text-muted-foreground"
        >
          {paragraphs.map((text) => (
            <motion.p
              key={text}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.35, ease: "easeOut" },
                },
              }}
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
