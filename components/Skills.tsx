const skills = [
  {
    title: "Frontend",
    items: [
      "React, Next.js (App Router)",
      "Component-driven architecture",
      "State management & data fetching",
      "Accessible, responsive UI",
    ],
  },
  {
    title: "Backend",
    items: [
      "REST API design",
      "Authentication & authorization (RBAC)",
      "Business logic & validations",
      "Background jobs & async workflows",
    ],
  },
  {
    title: "Database & Infrastructure",
    items: [
      "PostgreSQL & relational modeling",
      "Schema design & constraints",
      "Indexing & performance basics",
      "Realtime data flows",
    ],
  },
  {
    title: "Engineering Practices",
    items: [
      "System-first design",
      "Clean, maintainable code",
      "Git workflows",
      "Debugging & problem isolation",
    ],
  },
];

export default function Skills() {
  return (
    <section className="mt-32 max-w-4xl text-start">
      <h3 className="text-xl text-primary font-medium">
        Skills
      </h3>

      <p className="mt-2 text-muted-foreground">
        Tools and practices I use to build and maintain real-world
        applications.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.title} className="rounded-xl border border-border bg-card p-6 hover:border-muted-foreground transition">
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
