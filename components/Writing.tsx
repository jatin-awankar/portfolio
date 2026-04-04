"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Marquee } from "./ui/marquee";

const carouselBlogs = [
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
    title: "Designing Payment Systems That Don&apos;t Break",
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
] as const;

export default function Writing() {
  return (
    <section className="mx-auto text-left">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">
          Notes
        </p>
        <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
          Writing and Insights
        </h3>

        <p className="mt-3 leading-relaxed text-muted-foreground">
          Thought process is part of the product. I publish practical notes on
          architecture and delivery decisions from real builds.
        </p>
      </div>

      <div className="group relative mt-10">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 rounded-2xl bg-linear-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 rounded-2xl bg-linear-to-l from-background via-background/80 to-transparent" />

        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/20 py-2 backdrop-blur-sm">
          <div className="flex w-max gap-5 px-5">
            <Marquee pauseOnHover={true}>
              {carouselBlogs.map((blog, index) => (
                <article
                  key={`${blog.title}-${index}`}
                  className="w-[300px] shrink-0 rounded-2xl border border-border/60 bg-card/50 p-6 hover:bg-card/80 sm:w-[340px]"
                >
                  <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                    {blog.tag}
                  </span>

                  <h4 className="mt-4 text-lg font-semibold leading-snug text-foreground">
                    {blog.title}
                  </h4>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {blog.description}
                  </p>

                  <Link
                    href={blog.link}
                    target="_blank"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-200 hover:gap-2.5"
                  >
                    Read insight
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </Marquee>
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
