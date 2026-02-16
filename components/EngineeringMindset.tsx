export default function EngineeringMindset() {
  const points = [
    "I design system boundaries and data contracts before implementing features.",
    "I enforce critical constraints at the database layer rather than relying solely on application logic.",
    "I think in terms of race conditions, retries, duplicate events, and inconsistent state — not just happy paths.",
    "I separate synchronous APIs from background processing when scalability or reliability demands it.",
    "I optimize for correctness and clarity first, then performance and abstraction.",
  ];

  return (
    <section className="mt-32 max-w-3xl text-start">
      <h3 className="text-xl font-medium text-primary">Engineering Mindset</h3>

      <ul className="mt-6 space-y-4 text-foreground leading-relaxed">
        {points.map((point, i) => (
          <li
            key={i}
            className="border-l rounded-md border-foreground/30 pl-4 py-2"
          >
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
