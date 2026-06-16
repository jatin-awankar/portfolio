import type { LucideIcon } from "lucide-react";
import { Activity, Cpu, Database, Workflow } from "lucide-react";

export type PortfolioPage = {
  key: "home" | "projects" | "about" | "writings";
  label: string;
  href: string;
};

export const portfolioPages: PortfolioPage[] = [
  { key: "home", label: "home", href: "/" },
  { key: "projects", label: "projects", href: "/projects" },
  { key: "about", label: "about", href: "/about" },
  { key: "writings", label: "writings", href: "/writings" },
];

export type SkillGroup = {
  title: string;
  items: string[];
  icon: LucideIcon;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend Systems",
    icon: Database,
    items: [
      "API design & versioning",
      "Authentication & RBAC",
      "Concurrency & atomic operations",
      "Webhook handling & retries",
    ],
  },
  {
    title: "Data & Reliability",
    icon: Activity,
    items: [
      "PostgreSQL schema design",
      "Transactions & constraints",
      "Query optimization basics",
      "Multi-tenant architecture",
    ],
  },
  {
    title: "Product Infrastructure",
    icon: Workflow,
    items: [
      "Billing & usage systems",
      "Workflow & state design",
      "Failure handling & edge cases",
      "Third-party integrations",
    ],
  },
  {
    title: "Frontend",
    icon: Cpu,
    items: [
      "Next.js & React",
      "Component architecture",
      "Server actions & data flow",
      "Responsive UI",
    ],
  },
];
