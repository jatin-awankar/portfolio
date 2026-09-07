import Link from "next/link";
import {
  ArrowUpRight,
  Database,
  Workflow,
  ShieldCheck,
  PanelsTopLeft,
} from "lucide-react";
const capabilities = [
  {
    Icon: Database,
    title: "Data that stays consistent",
    text: "PostgreSQL, transactions, constraints, and atomic updates.",
    href: "/projects#usageflow",
    example: "UsageFlow / usage metering",
  },
  {
    Icon: Workflow,
    title: "Flows that handle failure",
    text: "Queues, webhook retries, and explicit state transitions.",
    href: "/projects#petrol-partner",
    example: "Petrol Partner / booking states",
  },
  {
    Icon: ShieldCheck,
    title: "Clear access boundaries",
    text: "Authentication, role-based access, and multi-tenant systems.",
    href: "/projects#usageflow",
    example: "UsageFlow / access control",
  },
  {
    Icon: PanelsTopLeft,
    title: "The complete product",
    text: "React, Next.js, responsive interfaces, and API integration.",
    href: "/projects#olympic-windows",
    example: "Olympic Windows / client delivery",
  },
];
export function CapabilitiesPane() {
  return (
    <div>
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / Engineering toolkit</p>
          <h2>Beyond the stack.</h2>
        </div>
      </div>
      <div className="capability-list">
        {capabilities.map(({ Icon, title, text, href, example }) => (
          <article key={title}>
            <Icon size={19} className="text-orange-400" />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
              <Link href={href} className="text-action">
                {example}
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <Link href="/about" className="text-action mt-5">
        More about me <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}
