import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const packages = [
  {
    id: "package-1",
    label: "Package 01",
    title: "MVP Sprint Build",
    description:
      "From idea validation to a usable first release with onboarding, core workflows, and analytics-ready architecture.",
    points: [
      "Full-stack implementation with clean handoff",
      "Auth, billing, core dashboards",
      "Deployment + tracking setup",
    ],
  },
  {
    id: "package-2",
    label: "Package 02",
    title: "Backend Reliability Setup",
    description:
      "For products already live but unstable. I harden your APIs and data flows to prevent costly production failures.",
    points: [
      "API and schema improvements",
      "Queues, retries, idempotency patterns",
      "Race condition and consistency fixes",
    ],
  },
  {
    id: "package-3",
    label: "Package 03",
    title: "Scale and Feature Partner",
    description:
      "Ongoing partnership for teams that need a senior engineer to unblock roadmap work and keep technical quality high.",
    points: [
      "Roadmap execution support",
      "Architecture and review guidance",
      "Faster delivery without technical debt chaos",
    ],
  },
] as const;

export default function Services() {
  return (
    <section className="mx-auto text-left">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-semibold sm:text-3xl">Services</h3>

        <p className="mt-3 text-muted-foreground leading-relaxed">
          Built for founders and early teams who need progress, not overhead.
          I focus on outcomes: shipping fast and setting strong foundations.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-border/80 bg-card/38 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.07)] backdrop-blur-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.24)] sm:p-6">
        <Accordion
          type="single"
          collapsible
          defaultValue="package-1"
          className="w-full"
        >
          {packages.map((pack) => (
            <AccordionItem
              key={pack.id}
              value={pack.id}
              className="last:border-b-0"
            >
              <AccordionTrigger className="px-2 sm:px-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/90">
                    {pack.label}
                  </span>
                  <span className="text-base font-semibold text-foreground sm:text-lg">
                    {pack.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-2 sm:px-3">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                  {pack.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {pack.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/75" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-8 rounded-2xl border border-border/70 bg-card/30 p-6">
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
