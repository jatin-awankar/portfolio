import type { BlogPost } from "@/lib/medium";

export const DEFAULT_POSTS: BlogPost[] = [
  {
    title: "Why I Moved from Next.js API Routes to a Dedicated Node.js Backend",
    date: "Mar 17",
    excerpt:
      "When I started building Petrol Partner, I used Next.js API routes for the backend -- here's why that changed as the project grew.",
    link: "https://medium.com/backenders-club/why-i-moved-from-next-js-api-routes-to-a-dedicated-node-js-backend-13739c61dd68",
    tags: ["Architecture"],
  },
  {
    title:
      "Designing Backend Systems That Survive Concurrency, Retries, and Real-World Failures",
    date: "Mar 3",
    excerpt:
      "When I started building backend systems, I thought correctness was enough -- until concurrency and retries proved otherwise.",
    link: "https://medium.com/@jatinawankar02/designing-backend-systems-that-survive-concurrency-retries-and-real-world-failures-a0a3bba9323b",
    tags: ["Backend Systems"],
  },
  {
    title:
      "Designing Payment Systems That Survive Retries, Crashes, and Race Conditions",
    date: "Feb 25",
    excerpt:
      "Most payment systems don't fail when everything goes right -- they fail at the edges: retries, crashes, race conditions.",
    link: "https://medium.com/@jatinawankar02/designing-payment-systems-that-survive-retries-crashes-and-race-conditions-be9718de5654",
    tags: ["Payments"],
  },
  {
    title: "What Actually Breaks in Real-World Payment Systems (And How to Design for It)",
    date: "Feb 21",
    excerpt:
      "A practical breakdown of retries, duplicate payments, and webhook replays -- and how database constraints prevent disaster.",
    link: "https://medium.com/@jatinawankar02/what-actually-breaks-in-real-world-payment-systems-and-how-to-design-for-it-fb5138a4fcf6",
    tags: ["Payments"],
  },
  {
    title: "Preventing Double Booking: Understanding Race Conditions in Real Systems",
    date: "Feb 18",
    excerpt:
      "Building a ride-booking system, the hardest part wasn't routing or UI -- it was preventing double bookings under load.",
    link: "https://medium.com/@jatinawankar02/preventing-double-booking-understanding-race-conditions-in-real-systems-76e92094dee8",
    tags: ["Concurrency"],
  },
];
