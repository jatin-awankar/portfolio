export default function About() {
  return (
    <section className="mt-32 max-w-3xl text-start">
      <h3 className="text-xl font-medium text-primary">About</h3>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        I’m a backend-focused product engineer who enjoys building systems that
        behave correctly under real-world conditions — not just in local demos.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        My work involves designing multi-tenant SaaS architectures, handling
        concurrency in booking flows, implementing billing logic, and ensuring
        data integrity through database-level constraints and atomic operations.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        I think in terms of failure cases — race conditions, duplicate events,
        retry logic, and inconsistent state — and design systems to handle them
        safely before optimizing for features.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        I value correctness, maintainability, and long-term system clarity over
        quick implementations. My goal is to build software that remains
        reliable as it scales.
      </p>
    </section>
  );
}
