const skills = [
  {
    title: "Backend Systems",
    items: [
      "REST API design & versioning",
      "Authentication & RBAC flows",
      "Concurrency handling & atomic operations",
      "Webhook integration & retry logic",
    ],
  },
  {
    title: "Data & Integrity",
    items: [
      "PostgreSQL relational modeling",
      "Schema constraints & transactional updates",
      "Indexing & query optimization basics",
      "Multi-tenant data isolation",
    ],
  },
  {
    title: "Product Infrastructure",
    items: [
      "Billing & usage-based logic",
      "State validation & workflow design",
      "Failure-case thinking & edge-case handling",
      "External service integrations",
    ],
  },
  {
    title: "Frontend (Supporting Layer)",
    items: [
      "React & Next.js (App Router)",
      "Component-driven architecture",
      "Server actions & data fetching patterns",
      "Accessible, responsive UI",
    ],
  },
];

export default function Skills() {
  return (
    <section className="mt-32 max-w-4xl text-start">
      <h3 className="text-xl text-primary font-medium">Skills</h3>

      <p className="mt-2 text-muted-foreground">
        Core capabilities I rely on when building production-oriented systems.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.title}
            className="rounded-xl border border-border bg-card p-6 hover:border-muted-foreground transition"
          >
            <h4 className="text-sm font-medium text-foreground">
              {group.title}
            </h4>

            <ul className="mt-3 space-y-2 text-muted-foreground">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
