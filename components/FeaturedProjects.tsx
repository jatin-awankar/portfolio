import ProjectCard from "@/components/ProjectCard";

export default function FeaturedProjects() {
  return (
    <section className="mt-32 max-w-4xl text-start">
      <h3 className="text-2xl text-primary font-medium">Featured Projects</h3>

      <p className="mt-2 text-muted-foreground">
        A small selection of projects that reflect how I approach real-world
        engineering problems.
      </p>

      <div className="mt-10 space-y-8">
        {/* Project 1 – Flagship (to be finalized next) */}
        <ProjectCard
          title="Industry-Grade Web Application"
          description="A production-style web application designed with real-world
          engineering constraints in mind."
          highlights={[
            "Authentication with role-based access",
            "Non-trivial relational database schema",
            "End-to-end workflow with edge cases handled",
          ]}
          details={{
            context:
              "This project was built to simulate how real products are designed and maintained in industry, focusing on architecture, data modeling, and long-term maintainability rather than quick demos.",
            focus: [
              "System-first design before implementation",
              "Clear separation of concerns across layers",
              "Handling real-world edge cases and failures",
            ],
          }}
          stack={["Next.js", "PostgreSQL", "Tailwind", "Auth"]}
          github="#"
          live="#"
        />

        {/* Project 2 – LedgerFlow */}
        <ProjectCard
          title="LedgerFlow"
          description="A usage-based billing and metering system for SaaS products."
          highlights={[
            "Multi-tenant usage ingestion APIs",
            "Background aggregation workers",
            "Invoice generation and webhooks",
          ]}
          details={{
            context:
              "LedgerFlow addresses the complexity SaaS teams face when tracking usage, pricing flexibly, and generating accurate invoices at scale.",
            focus: [
              "Designing schemas for multi-tenant isolation",
              "Using background jobs for heavy aggregation",
              "Ensuring idempotent and reliable event processing",
            ],
          }}
          stack={["Next.js", "PostgreSQL", "Redis", "Supabase"]}
          github="#"
        />

        {/* Project 3 – Petrol Partner */}
        <ProjectCard
          title="Petrol Partner"
          description="A ride-sharing platform built for college students with
          real-time and safety-focused features."
          highlights={[
            "Ride offer and request matching",
            "Real-time maps and tracking",
            "Secure authentication and access control",
          ]}
          details={{
            context:
              "Petrol Partner was built as a real-world product idea focusing on usability, safety, and scalability for a closed user group.",
            focus: [
              "Real-time updates using maps and live data",
              "Designing flows for both drivers and passengers",
              "Planning for scalability and future mobile support",
            ],
          }}
          stack={["Next.js", "Supabase", "Mapbox", "Realtime"]}
          github="#"
        />
      </div>
    </section>
  );
}
