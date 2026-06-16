export type ProjectLogEntry = {
  hash: string;
  type: "feat" | "fix" | "perf" | "refactor" | "release";
  desc: string;
};

export interface DemoAccess {
  url: string;
  email: string;
  password: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  image?: string;
  overview: string;
  live: string;
  source: string;
  demo?: DemoAccess;
  tags?: string[];
  stack: Record<string, string>;
  log: ProjectLogEntry[];
}

export const projects: Project[] = [
  {
    slug: "fortify",
    name: "Fortify",
    tagline:
      "AI-powered terminal assistant -- explains errors, writes commit messages, and summarizes codebases from the CLI.",
    image: "https://github.com/jatin-awankar/fortify/raw/main/assets/demo.gif",
    overview:
      "Fortify is a terminal-first AI assistant: it explains error logs and stack traces in plain English, generates git-aware commit messages, summarizes codebases, and runs an interactive chat -- all without leaving the CLI. Published to npm as fortify-ai-cli, with local config and chat history stored in ~/.fortify.",
    live: "https://www.npmjs.com/package/fortify-ai-cli",
    source: "https://github.com/jatin-awankar/fortify",
    tags: ["Node.js", "OpenAI", "CLI", "npm"],
    stack: {
      runtime: "node@20+",
      cli: "commander",
      ai: "openai-responses-api",
      ux: "chalk + ora + inquirer",
      distribution: "npm (fortify-ai-cli)",
    },
    log: [
      {
        hash: "6410bea",
        type: "release",
        desc: "update version to 0.2.2",
      },
      {
        hash: "c9b11a9",
        type: "feat",
        desc: "enhance chat history management with session inspection and improved cancellation handling",
      },
      {
        hash: "c2f0145",
        type: "feat",
        desc: "Integrate history management into chat service and command service, enabling session persistence and retrieval",
      },
      {
        hash: "6d18ade",
        type: "feat",
        desc: "alias for CLI command, enhance command options, and update model version",
      },
    ],
  },
  {
    slug: "usageflow",
    name: "UsageFlow",
    tagline:
      "SaaS billing & usage-tracking platform for products that charge by usage.",
    image: "/projects/usageflow.png",
    overview:
      "UsageFlow lets SaaS teams meter usage, apply pricing rules, and generate accurate invoices -- without building billing infrastructure from scratch. It's built for products where usage spikes, retries, and partial failures are the norm, and handles each one without double-charging or losing data.",
    live: "https://usageflow.vercel.app",
    source: "https://github.com/jatin-awankar/UsageFlow",
    demo: {
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
    log: [
      {
        hash: "a3f29c1",
        type: "feat",
        desc: "idempotent webhook handlers -- duplicate Stripe events no longer double-charge",
      },
      {
        hash: "e88d042",
        type: "fix",
        desc: "atomic usage increments via row-level locks under concurrent writes",
      },
      {
        hash: "7c1b9aa",
        type: "perf",
        desc: "invoice generation moved to a background queue, cut p95 response time",
      },
      {
        hash: "4f0a6de",
        type: "refactor",
        desc: "ledger-based billing -- every charge traceable to a usage event",
      },
    ],
  },
  {
    slug: "petrol-partner",
    name: "Petrol Partner",
    tagline: "Real-time ride-sharing with concurrency-safe seat booking.",
    image: "/projects/petrol-partner.png",
    overview:
      "Petrol Partner connects drivers and riders for shared trips, with live location tracking and a booking flow that stays correct even when multiple riders try to claim the same seat at once.",
    live: "https://petrol-partner.vercel.app",
    source: "https://github.com/jatin-awankar/Petrol-Partner",
    demo: {
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
    log: [
      {
        hash: "b91f3a2",
        type: "fix",
        desc: "row-level locking prevents double-booking the same seat",
      },
      {
        hash: "23ee613",
        type: "feat",
        desc: "implement automatic retry for pending payment reconciliations and enhance state handling",
      },
      {
        hash: "99ab1f0",
        type: "refactor",
        desc: "booking state machine -- pending -> confirmed -> completed, no invalid transitions",
      },
    ],
  },
  {
    slug: "stem-video",
    name: "STEM Video App",
    tagline: "Low-latency video collaboration for live classes.",
    image: "/projects/stem.png",
    overview:
      "A video platform built for live STEM classes -- role-based rooms for teachers and students, screen sharing, and session recording, designed to stay usable on unreliable connections.",
    live: "https://stem-connecting-people.vercel.app",
    source: "https://github.com/jatin-awankar/STEM-video-conference-app",
    demo: {
      url: "https://stem-connecting-people.vercel.app/",
      email: "sign-in-with-your-email",
      password: "otp-based",
    },
    stack: {
      framework: "next@14",
      auth: "clerk",
      video: "getstream",
      realtime: "websockets",
      ui: "tailwind css",
    },
    log: [
      {
        hash: "d5e6f23",
        type: "feat",
        desc: "GetStream video rooms with role-based permissions for teachers and students",
      },
      {
        hash: "12ac9b4",
        type: "perf",
        desc: "pre-warmed connections cut room-join latency",
      },
      {
        hash: "88f02d1",
        type: "fix",
        desc: "graceful reconnect handling on network drops mid-session",
      },
    ],
  },
  {
    slug: "civic-issue-reporter",
    name: "Civic Issue Reporter",
    tagline: "Map-based civic issue reporting with structured tracking.",
    image: "/projects/civic.png",
    overview:
      "Lets residents report civic issues -- potholes, broken streetlights, garbage -- by pinning a location on a map and attaching a photo, then tracks each report through a status pipeline municipal staff can act on.",
    live: "https://civic-issue-reporter-application.vercel.app",
    source: "https://github.com/jatin-awankar/civic-issue-reporter",
    demo: {
      url: "https://civic-issue-reporter-application.vercel.app/",
      email: "demo@civic.com",
      password: "Demo@1234",
    },
    stack: {
      framework: "react",
      backend: "node + express",
      database: "mongodb",
      maps: "mapbox",
    },
    log: [
      {
        hash: "2a7c5e9",
        type: "feat",
        desc: "geotagged issue submission with photo upload",
      },
      {
        hash: "f013ab6",
        type: "feat",
        desc: "status pipeline -- reported -> in progress -> resolved",
      },
      {
        hash: "6d4e8c2",
        type: "refactor",
        desc: "versioned REST API for mobile client compatibility",
      },
    ],
  },
];
