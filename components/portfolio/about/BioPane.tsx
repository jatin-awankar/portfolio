const currently = [
  "Open source contributions",
  "AI agent evaluation",
  "Accessible interfaces",
];

const building = [
  "Num1 — agent benchmarks (in development)",
  "Fortify — AI tools for the terminal",
  "Full-stack web products",
];

export function BioPane() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-3 font-display text-xl font-semibold text-zinc-100 sm:text-2xl">
          About me
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-300">
          I’m a full-stack engineer building AI-powered products and integrations.
          I work across interfaces, APIs, and data, with a focus on useful products
          and clear experiences.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 font-display text-sm text-zinc-300">
            $ cat currently.md
          </h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {currently.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-orange-400/50">&gt;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-display text-sm text-zinc-300">
            $ cat building.md
          </h3>
          <ul className="space-y-2 text-sm text-zinc-400">
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
