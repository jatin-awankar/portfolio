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
        <h2 className="mb-2 font-display text-xs text-zinc-500">
          {"// 01 - about.md"}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-300">
          I build full-stack web applications with a backend focus. I care
          about the moments that make software reliable: requests that overlap,
          billing events that repeat, and interfaces that stay clear while data
          is still loading. I learn by reading the underlying systems, then use
          that understanding to make practical product decisions.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 font-display text-xs text-zinc-500">
            $ cat currently.md
          </h3>
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
          <h3 className="mb-2 font-display text-xs text-zinc-500">
            $ cat building.md
          </h3>
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
