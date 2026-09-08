export type ProjectHighlight = {
  desc: string;
};

export type DemoAccess = { url: string } & (
  | { kind: "credentials"; email: string; password: string }
  | { kind: "sign-in"; instructions: string }
);

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  image?: string;
  overview: string;
  live?: string;
  source: string;
  docs?: string;
  liveLabel?: string;
  demo?: DemoAccess;
  tags?: string[];
  stack: Record<string, string>;
  highlights: ProjectHighlight[];
  type?: "personal" | "client";
  status?: "In development";
}

export const projects: Project[] = [
  {
    slug: "num1",
    name: "Num1",
    tagline: "Benchmarking AI agents on engineering work.",
    overview:
      "Building a platform to measure agent cost, speed, reliability, and human effort on standardized codebase tasks, then identify improvements that help agents work more effectively.",
    status: "In development",
    source: "",
    tags: ["AI agents", "Benchmarks", "In development"],
    stack: {},
    highlights: [],
  },
  {
    slug: "fortify",
    name: "Fortify",
    tagline:
      "An AI assistant for the terminal.",
    image: "https://github.com/jatin-awankar/fortify/raw/main/assets/demo.gif",
    overview:
      "Built to reduce context switching while debugging and reviewing code. Fortify brings error explanations, commit drafts, and codebase conversations into the CLI, with configuration and history stored locally.",
    live: "https://www.npmjs.com/package/fortify-ai-cli",
    liveLabel: "View on npm",
    source: "https://github.com/jatin-awankar/fortify",
    tags: ["Node.js", "OpenAI", "CLI", "npm"],
    stack: {
      runtime: "node@20+",
      cli: "commander",
      ai: "openai-responses-api",
      ux: "chalk + ora + inquirer",
      distribution: "npm (fortify-ai-cli)",
    },
    highlights: [
      { desc: "Explain errors, draft git-aware commits, and explore a codebase without leaving the terminal." },
      { desc: "Keep local chat history so a conversation can continue across sessions." },
      { desc: "Distributed as fortify-ai-cli on npm." },
    ],
  },
  {
    slug: "usageflow",
    name: "UsageFlow",
    tagline:
      "SaaS billing & usage-tracking platform for products that charge by usage.",
    image: "/projects/usageflow.webp",
    overview:
      "Built the metering, pricing, and invoicing flow for SaaS products that charge by usage. The implementation brings together a usage ledger, background jobs, and billing rules so teams can follow how usage becomes a charge.",
    live: "https://usageflow.vercel.app",
    source: "https://github.com/jatin-awankar/UsageFlow",
    docs: "https://usageflow.vercel.app/docs",
    demo: {
      kind: "credentials",
      url: "https://usageflow.vercel.app",
      email: "demo@usageflow.com",
      password: "Test@1234",
    },
    tags: ["Next.js", "Postgres", "Redis", "BullMQ", "RBAC"],
    stack: {
      framework: "next@15",
      database: "postgresql",
      cache: "redis",
      queue: "bullmq",
      auth: "jwt",
    },
    highlights: [
      { desc: "Meter usage and apply pricing rules for usage-based billing." },
      { desc: "Trace charges back to usage events with a billing ledger." },
      { desc: "Process invoice generation in a background queue." },
    ],
  },
  {
    slug: "petrol-partner",
    name: "Petrol Partner",
    tagline: "Real-time ride-sharing with concurrency-safe seat booking.",
    image: "/projects/petrol-partner.webp",
    overview:
      "Petrol Partner connects drivers and riders for shared trips, with live location tracking and a booking flow that stays correct even when multiple riders try to claim the same seat at once.",
    live: "https://petrol-partner.vercel.app",
    source: "https://github.com/jatin-awankar/Petrol-Partner",
    demo: {
      kind: "credentials",
      url: "https://petrol-partner.vercel.app/",
      email: "demo@petrolpartner.com",
      password: "Test@1234",
    },
    tags: ["Supabase", "Mapbox", "Razorpay", "Realtime", "Node.js"],
    stack: {
      framework: "next@14",
      database: "supabase",
      realtime: "supabase-realtime",
      maps: "mapbox",
      payments: "razorpay",
      runtime: "node@20+",
    },
    highlights: [
      { desc: "Connect drivers and riders through a shared-trip booking flow." },
      { desc: "Model the booking lifecycle as explicit states, from pending to completed." },
      { desc: "Combine live location updates with payment reconciliation." },
    ],
  },
  {
    slug: "olympic-windows",
    type: "client",
    name: "Olympic Windows",
    tagline:
      "A product catalogue and consultation flow for a windows manufacturer.",
    image: "/projects/olympicwindows.webp",
    overview:
      "Delivered the corporate website for Olympic Windows, from product and project pages to consultation enquiries. My work covered the site implementation, enquiry integration, and search metadata.",
    live: "https://olympicwindows.in",
    source: "",
    tags: ["Client Work", "Next.js", "SEO"],
    stack: {
      framework: "next.js",
      styling: "tailwind css",
      type: "client website",
      seo: "structured metadata",
    },
    highlights: [
      { desc: "Built the product catalogue and project pages for an established windows manufacturer." },
      { desc: "Connected consultation enquiries through Web3Forms." },
      { desc: "Added structured metadata and dedicated contact pages." },
    ],
  },
  {
    slug: "stem-video",
    name: "STEM Video App",
    tagline: "Video collaboration for live STEM classes.",
    image: "/projects/stem.webp",
    overview:
      "Built the classroom experience around GetStream video: teacher and student roles, screen sharing, and session recording. The integration includes reconnect handling when a participant loses their connection.",
    live: "https://stem-connecting-people.vercel.app",
    source: "https://github.com/jatin-awankar/STEM-video-conference-app",
    demo: {
      kind: "sign-in",
      url: "https://stem-connecting-people.vercel.app/",
      instructions: "Sign in with your own email and enter the one-time code sent to your inbox. This project does not have a shared demo account.",
    },
    stack: {
      framework: "next@14",
      auth: "clerk",
      video: "getstream",
      realtime: "websockets",
      ui: "tailwind css",
    },
    highlights: [
      { desc: "Integrate GetStream rooms with teacher and student permissions." },
      { desc: "Support screen sharing and session recording for live classes." },
      { desc: "Handle reconnects when a session loses its network connection." },
    ],
  },
];
