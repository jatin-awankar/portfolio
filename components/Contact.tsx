"use client";

import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-border/70 pt-12 pb-8">
      <div className="mx-auto text-left">
        <div className="mb-10 rounded-3xl border border-border/80 bg-card/34 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.07)] backdrop-blur-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.24)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">
            Contact
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
            Ready to build your next product with confidence?
          </h3>

          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            If you are shipping an MVP, fixing unstable backend flows, or
            preparing to scale, I can help as your full-stack delivery partner.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
            <Button asChild size="lg" className="h-11 rounded-xl px-6 text-sm">
              <Link href="mailto:jatinawankar02@gmail.com">
                Start a Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-xl border-border/80 bg-background/55 px-6 text-sm hover:bg-accent/28"
            >
              <Link href="/Jatin_Awankar_Resume.pdf" target="_blank">
                <FileText className="h-4 w-4" />
                View Resume
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground opacity-80">
            Typical response: within 24 hours
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-border/70 pt-6">
          <p className="text-xs text-muted-foreground opacity-70">
            &copy; {new Date().getFullYear()} Jatin Awankar
          </p>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link className="transition hover:text-foreground" href="mailto:jatinawankar02@gmail.com">
              Email
            </Link>
            <Link
              className="transition hover:text-foreground"
              href="https://github.com/jatin-awankar"
              target="_blank"
            >
              GitHub
            </Link>
            <Link
              className="transition hover:text-foreground"
              href="https://www.linkedin.com/in/jatin-awankar"
              target="_blank"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
