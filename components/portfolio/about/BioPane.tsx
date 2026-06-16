const currently = [
  "Open source contributions",
  "React internals",
  "Backend architecture",
  "Distributed systems fundamentals",
  "Concurrency & networking",
];

const building = [
  "Usage-based SaaS systems",
  "Scalable backend APIs",
  "Real-time web applications",
  "Startup-ready production systems",
];

export function BioPane() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 font-display text-xs text-zinc-500">
          {"// 01 - about.md"}
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-300">
          I design and build production-grade web applications from scratch --
          with a focus on system design, performance, and understanding
          internals rather than just using abstractions. I enjoy reading
          documentation deeply, breaking down how things work, and building
          systems that scale beyond CRUD.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 font-display text-xs text-zinc-500">
            $ cat currently.md
          </p>
          <ul className="space-y-1.5 text-xs text-zinc-400">
            {currently.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-orange-400/50">&gt;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 font-display text-xs text-zinc-500">
            $ cat building.md
          </p>
          <ul className="space-y-1.5 text-xs text-zinc-400">
            {building.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-orange-400/50">&gt;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
