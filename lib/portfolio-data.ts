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

export type Project = {
  id: number;
  title: string;
  description: string;
  highlights: string[];
  stack: string[];
  demo?: {
    email: string;
    password: string;
  };
  github?: string;
  live?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "UsageFlow",
    description:
      "A SaaS billing platform that tracks usage, calculates pricing, and generates invoices reliably -- designed for products that scale.",
    image: "/projects/usageflow.png",
    demo: {
      email: "demo@usageflow.com",
      password: "Test@1234",
    },
    highlights: [
      "Handles usage ingestion and billing computation",
      "Background job processing with Redis + BullMQ",
      "Reliable webhook delivery with retries",
    ],
    stack: ["Next.js", "PostgreSQL", "Redis", "BullMQ", "NextAuth"],
    github: "https://github.com/jatin-awankar/UsageFlow",
    live: "https://usageflow.vercel.app/",
  },
  {
    id: 2,
    title: "Petrol Partner",
    description:
      "A ride-sharing platform with real-time booking and concurrency-safe seat allocation to prevent double bookings.",
    image: "/projects/petrol-partner.png",
    demo: {
      email: "demo@petrolpartner.com",
      password: "Test@1234",
    },
    highlights: [
      "Atomic seat allocation system",
      "Real-time ride tracking",
      "Driver-passenger matching workflow",
    ],
    stack: ["Next.js", "Supabase", "Mapbox", "Realtime", "Razorpay"],
    github: "https://github.com/jatin-awankar/Petrol-Partner",
    live: "https://petrol-partner.vercel.app",
  },
  {
    id: 3,
    title: "STEM Video App",
    description:
      "A real-time video collaboration platform with secure sessions and low-latency streaming.",
    image: "/projects/stem.png",
    highlights: [
      "Low-latency video streaming",
      "Secure authenticated sessions",
      "Scalable meeting architecture",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Clerk", "GetStream"],
    github: "https://github.com/jatin-awankar/STEM-video-conference-app",
    live: "https://stem-connecting-people.vercel.app",
  },
  {
    id: 4,
    title: "Civic Issue Reporter",
    description:
      "A map-based platform for reporting civic issues with structured data and location-aware tracking.",
    image: "/projects/civic.png",
    highlights: [
      "Map-based issue reporting",
      "Category-based issue tracking",
      "REST API backend",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Mapbox"],
    github: "https://github.com/jatin-awankar/Civic-Issue-Reporter",
    live: "https://civic-issue-reporter-application.vercel.app",
  },
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

export type ServicePackage = {
  id: string;
  label: string;
  title: string;
  description: string;
  points: string[];
};

export const servicePackages: ServicePackage[] = [
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
];

export type ContributionStatus = "merged" | "in-review";

export type Contribution = {
  title: string;
  pr: string;
  prNumber: string;
  status: ContributionStatus;
  description: string;
};

export type OSSProject = {
  project: string;
  description: string;
  stars: string;
  url: string;
  contributions: Contribution[];
};

export const openSourceProjects: OSSProject[] = [
  {
    project: "OpenStatus",
    description: "Open-source synthetic monitoring platform",
    stars: "8.7k",
    url: "https://github.com/openstatusHQ/openstatus",
    contributions: [
      {
        title: "Add loading skeleton to status pages list",
        pr: "https://github.com/openstatusHQ/openstatus/pull/2261",
        prNumber: "#2261",
        status: "merged",
        description:
          "Replaced blank loading state with DataTableSkeleton component for better UX",
      },
      {
        title: "Add loading state to DomainConfiguration component",
        pr: "https://github.com/openstatusHQ/openstatus/pull/2276",
        prNumber: "#2276",
        status: "in-review",
        description:
          "Wired existing isLoading to show spinner during domain queries using DomainStatusIcon",
      },
    ],
  },
];

export const writingLinks = [
  {
    title: "Why I Moved from Next.js API Routes to a Dedicated Node.js Backend",
    description:
      "Lessons from building Petrol Partner and why separating backend improved scalability.",
    link: "https://medium.com/backenders-club/why-i-moved-from-next-js-api-routes-to-a-dedicated-node-js-backend-13739c61dd68",
    tag: "Architecture",
  },
  {
    title: "Designing Backend Systems That Survive Concurrency & Failures",
    description:
      "Handling retries, race conditions, and inconsistent states in real systems.",
    link: "https://medium.com/@jatinawankar02/designing-backend-systems-that-survive-concurrency-retries-and-real-world-failures-a0a3bba9323b",
    tag: "System Design",
  },
  {
    title: "Designing Payment Systems That Don't Break",
    description:
      "How to handle retries, crashes, and race conditions in payments.",
    link: "https://medium.com/@jatinawankar02/designing-payment-systems-that-survive-retries-crashes-and-race-conditions-be9718de5654",
    tag: "Payments",
  },
  {
    title: "Preventing Double Booking in Real Systems",
    description: "A deep dive into race conditions and safe booking systems.",
    link: "https://medium.com/@jatinawankar02/preventing-double-booking-understanding-race-conditions-in-real-systems-76e92094dee8",
    tag: "Concurrency",
  },
];
