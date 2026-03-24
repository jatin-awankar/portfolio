export default function Services() {
  return (
    <section className="mt-32 mx-auto text-left">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-semibold sm:text-3xl">Services</h3>

        <p className="mt-3 text-muted-foreground leading-relaxed">
          Built for founders and early teams who need progress, not overhead.
          I focus on outcomes: shipping fast and setting strong foundations.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border/70 bg-card/40 p-6 transition hover:-translate-y-1 hover:bg-card/70">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Package 01
          </p>
          <h4 className="mt-2 text-lg font-semibold">MVP Sprint Build</h4>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            From idea validation to a usable first release with onboarding, core
            workflows, and analytics-ready architecture.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>• Full-stack implementation with clean handoff</li>
            <li>• Auth, billing, core dashboards</li>
            <li>• Deployment + tracking setup</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/40 p-6 transition hover:-translate-y-1 hover:bg-card/70">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Package 02
          </p>
          <h4 className="mt-2 text-lg font-semibold">Backend Reliability Setup</h4>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            For products already live but unstable. I harden your APIs and data
            flows to prevent costly production failures.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>• API and schema improvements</li>
            <li>• Queues, retries, idempotency patterns</li>
            <li>• Race condition and consistency fixes</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/40 p-6 transition hover:-translate-y-1 hover:bg-card/70">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Package 03
          </p>
          <h4 className="mt-2 text-lg font-semibold">Scale and Feature Partner</h4>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Ongoing partnership for teams that need a senior engineer to unblock
            roadmap work and keep technical quality high.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>• Roadmap execution support</li>
            <li>• Architecture and review guidance</li>
            <li>• Faster delivery without technical debt chaos</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-border/70 bg-card/30 p-6">
        <p className="text-sm text-muted-foreground">
          Not sure which package fits? I will suggest the smallest path to value
          first.
        </p>

        <a
          href="mailto:jatinawankar02@gmail.com"
          className="mt-3 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Discuss your project
        </a>
      </div>
    </section>
  );
}
