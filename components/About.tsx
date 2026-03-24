export default function About() {
  return (
    <section className="mt-32 text-left rounded-3xl border border-border/70 bg-card/35 p-8 sm:p-10">
      <h3 className="text-2xl font-semibold sm:text-3xl">About</h3>

      <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed max-w-3xl">
        <p>
          I’m a full-stack developer focused on building SaaS products and
          backend systems that actually hold up in real-world use — not just in
          ideal conditions.
        </p>

        <p>
          My strongest work is in SaaS products, backend-heavy systems, and
          workflows where reliability matters. I design for edge cases early:
          duplicate events, race conditions, retries, and partial failure
          states.
        </p>

        <p>
          Even at an early stage, I apply a senior engineering lens: clarify the
          trade-offs, keep architecture simple, and avoid shortcuts that become
          expensive later.
        </p>

        <p>
          If you&apos;re building a product and need someone who can think
          through both features and failure cases, I’d be happy to help.
        </p>
      </div>
    </section>
  );
}
