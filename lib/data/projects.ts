export type ProjectLogEntry = {
  hash: string;
  type: "feat" | "fix" | "perf" | "refactor";
  desc: string;
};

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  live: string;
  source: string;
  stack: Record<string, string>;
  log: ProjectLogEntry[];
}

export const projects: Project[] = [
  {
    slug: "usageflow",
    name: "UsageFlow",
    tagline:
      "SaaS billing & usage-tracking platform for products that charge by usage.",
    overview:
      "UsageFlow lets SaaS teams meter usage, apply pricing rules, and generate accurate invoices -- without building billing infrastructure from scratch. It's built for products where usage spikes, retries, and partial failures are the norm, and handles each one without double-charging or losing data.",
    live: "#", // TODO: add real live/source URL
    source: "#", // TODO: add real live/source URL
    stack: {
      framework: "next@15",
      database: "postgresql",
      cache: "redis",
      queue: "bullmq",
      auth: "next-auth",
      payments: "stripe",
    },
    // TODO: verify these git-log entries reflect actual implementation
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
    overview:
      "Petrol Partner connects drivers and riders for shared trips, with live location tracking and a booking flow that stays correct even when multiple riders try to claim the same seat at once.",
    live: "#", // TODO: add real live/source URL
    source: "#", // TODO: add real live/source URL
    stack: {
      framework: "next@14",
      database: "supabase",
      realtime: "supabase-realtime",
      maps: "mapbox",
    },
    // TODO: verify these git-log entries reflect actual implementation
    log: [
      {
        hash: "b91f3a2",
        type: "fix",
        desc: "row-level locking prevents double-booking the same seat",
      },
      {
        hash: "c204e17",
        type: "feat",
        desc: "live driver location via Supabase Realtime channels",
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
    overview:
      "A video platform built for live STEM classes -- role-based rooms for teachers and students, screen sharing, and session recording, designed to stay usable on unreliable connections.",
    live: "#", // TODO: add real live/source URL
    source: "#", // TODO: add real live/source URL
    stack: {
      framework: "next@14",
      auth: "clerk",
      video: "getstream",
      realtime: "websockets",
    },
    // TODO: verify these git-log entries reflect actual implementation
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
    overview:
      "Lets residents report civic issues -- potholes, broken streetlights, garbage -- by pinning a location on a map and attaching a photo, then tracks each report through a status pipeline municipal staff can act on.",
    live: "#", // TODO: add real live/source URL
    source: "#", // TODO: add real live/source URL
    stack: {
      framework: "react",
      backend: "node + express",
      database: "mongodb",
      maps: "mapbox",
    },
    // TODO: verify these git-log entries reflect actual implementation
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
