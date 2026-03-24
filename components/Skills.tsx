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
];

export default function Skills() {
  return (
    <section className="mt-32 mx-auto text-left">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-semibold sm:text-3xl">
          Engineering Capabilities
        </h3>

        <p className="mt-3 text-muted-foreground leading-relaxed">
          Tooling matters, but decision quality matters more. These are the
          areas I use to ship practical, maintainable products.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.title}
            className="group rounded-2xl border border-border/70 bg-card/40 p-6 transition hover:-translate-y-1 hover:bg-card/70"
          >
            <h4 className="text-base font-semibold text-foreground tracking-wide">
              {group.title}
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 leading-relaxed"
                >
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
