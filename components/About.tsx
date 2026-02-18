export default function About() {
  return (
    <section className="mt-32 max-w-3xl text-start">
      <h3 className="text-xl font-medium text-primary">About</h3>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        I’m a software engineer focused on building reliable systems that behave
        correctly under real-world conditions — not just ideal scenarios.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        My work includes designing multi-tenant SaaS architectures, handling
        concurrency in transactional flows, implementing billing logic, and
        ensuring data integrity through strong database constraints and atomic
        operations.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        I think in terms of failure cases — race conditions, duplicate events,
        retries, and inconsistent state — and design systems to handle them
        safely before optimizing for feature velocity.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        I value correctness, clarity, and long-term maintainability. My goal is
        to build software that remains reliable as it scales.
      </p>
    </section>
  );
}
