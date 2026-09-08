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
    title: "Data & consistency",
    text: "PostgreSQL, transactions, atomic updates.",
  },
  {
    Icon: Workflow,
    title: "Reliable workflows",
    text: "Queues, retries, state machines.",
  },
  {
    Icon: ShieldCheck,
    title: "Access control",
    text: "Authentication, roles, multi-tenancy.",
  },
  {
    Icon: PanelsTopLeft,
    title: "Product interfaces",
    text: "React, Next.js, responsive UI.",
  },
];
export function CapabilitiesPane() {
  return (
    <div>
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / Engineering toolkit</p>
          <h2>What I work with.</h2>
        </div>
      </div>
      <div className="capability-list">
        {capabilities.map(({ Icon, title, text }) => (
          <article key={title}>
            <Icon size={19} className="text-orange-400" />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
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
