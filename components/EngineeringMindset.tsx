export default function EngineeringMindset() {

  const lists = [
    "I design systems before writing code, focusing on clarity and long-term maintainability.",
    "I prefer simple, readable solutions over clever abstractions that are hard to debug.",
    "I think in terms of data flow, edge cases, and failure scenarios, not just happy paths.",
    "I write code assuming someone else will read and maintain it in the future.",
    "I value fundamentals and trade-offs more than chasing the latest frameworks."
  ]

  return (
    <section className="mt-32 max-w-3xl text-start">
      <h3 className="text-2xl font-medium text-primary">
        Engineering Mindset
      </h3>

      <ul className="mt-6 space-y-4 text-foreground leading-relaxed">
        {lists.map((list, i) => (
          <div key={i} className="border-2 bg-background rounded-sm px-6 py-2">
            {list}
          </div>
        ))}
      </ul>
    </section>
  );
}
