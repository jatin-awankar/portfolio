"use client";

import { motion } from "framer-motion";

const skills = [
  {
    title: "Backend Systems",
    items: [
      "API design & versioning",
      "Authentication & RBAC",
      "Concurrency & atomic operations",
      "Webhook handling & retries",
    ],
  },
  {
    title: "Data & Reliability",
    items: [
      "PostgreSQL schema design",
      "Transactions & constraints",
      "Query optimization basics",
      "Multi-tenant architecture",
    ],
  },
  {
    title: "Product Infrastructure",
    items: [
      "Billing & usage systems",
      "Workflow & state design",
      "Failure handling & edge cases",
      "Third-party integrations",
    ],
  },
  {
    title: "Frontend",
    items: [
      "Next.js & React",
      "Component architecture",
      "Server actions & data flow",
      "Responsive UI",
    ],
  },
] as const;

export default function Skills() {
  return (
    <section className="mx-auto text-left">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">
          Capabilities
        </p>
        <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
          Engineering Capabilities
        </h3>

        <p className="mt-3 leading-relaxed text-muted-foreground">
          Tooling matters, but decision quality matters more. These are the
          areas I use to ship practical, maintainable products.
        </p>
      </div>

      <div className="mt-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.03 },
            },
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {skills.map((group) => (
            <motion.article
              key={group.title}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" },
                },
              }}
              className="group rounded-2xl border border-border/75 bg-background/55 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/28 shadow-[0_8px_30px_rgba(0,0,0,0.07)] backdrop-blur-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.24)]"
            >
              <h4 className="text-sm font-semibold tracking-[0.03em] text-foreground sm:text-base">
                {group.title}
              </h4>

              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 leading-relaxed"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary/75" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
