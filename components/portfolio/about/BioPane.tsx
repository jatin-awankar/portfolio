const currently = [
  "Open source contributions",
  "React internals",
  "Accessible interfaces",
  "Application architecture",
  "Web performance",
];

const building = [
  "Usage-based SaaS systems",
  "Responsive interfaces and APIs",
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
          I’m a full-stack engineer. I build web applications from the interface
          to the API and database, with attention to how the whole experience
          fits together. I care about clear interactions, responsive layouts,
          and reliable behavior. I learn by understanding how things work, then
          use that knowledge to make practical product decisions.
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
