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
    <section className="mt-32 max-w-4xl">
      <h3 className="text-2xl text-primary font-medium text-start">
        Skills
      </h3>

      <p className="mt-2 text-muted-foreground text-start">
        Tools and practices I use to build and maintain real-world
        applications.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.title} className="rounded-lg shadow-sm py-6 group relative bg-background hover:bg-(--hover-background) transition-all duration-300 overflow-hidden">
            <div className="absolute -inset-px bg-linear-to-r from-indigo-600/20 via-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>

            <h4 className="text-lg font-medium text-foreground">
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
