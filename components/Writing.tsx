"use client";

import Link from "next/link";
import { useState } from "react";

const blogs = [
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
    title: "Designing Payment Systems That Don’t Break",
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

export default function Writing() {
  const carouselBlogs = [...blogs, ...blogs];
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="mt-32 mx-auto text-left">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-semibold sm:text-3xl">
          Writing and Insights
        </h3>

        <p className="mt-3 text-muted-foreground leading-relaxed">
          Thought process is part of the product. I publish practical notes on
          architecture and delivery decisions from real builds.
        </p>
      </div>

      <div className="group relative mt-10">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-background via-background/80 to-transparent" />

        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/20 py-2 backdrop-blur-sm">
          <div
            className="writing-marquee flex w-max gap-5 px-5"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {carouselBlogs.map((blog, index) => (
              <article
                key={`${blog.title}-${index}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="w-[300px] shrink-0 rounded-2xl border border-border/60 bg-card/50 p-6 transition-transform duration-300 hover:-translate-y-1 hover:bg-card/80 sm:w-[340px]"
              >
                <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                  {blog.tag}
                </span>

                <h4 className="mt-4 text-lg font-semibold leading-snug">
                  {blog.title}
                </h4>

                <p className="mt-3 text-sm text-muted-foreground">
                  {blog.description}
                </p>

                <Link
                  href={blog.link}
                  target="_blank"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
                >
                  Read insight
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .writing-marquee {
          animation: writing-marquee 22s linear infinite;
        }

        @keyframes writing-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
