"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-40 border-t border-border pt-12 pb-8">
      <div className="mx-auto text-left">
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/35 p-8 sm:p-10">
          <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">
            Ready to build your next product with confidence?
          </h3>

          <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
            If you are shipping an MVP, fixing unstable backend flows, or
            preparing to scale, I can help as your full-stack delivery partner.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="mailto:jatinawankar02@gmail.com"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              Start a Project
            </Link>

            <Link
              href="/Jatin_Awankar_Resume.pdf"
              target="_blank"
              className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-2.5 text-sm font-medium hover:bg-card transition"
            >
              View Resume
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted-foreground opacity-80">
            Typical response: within 24 hours
          </p>
        </div>

        <div className="border-t border-border pt-6 flex items-center justify-between">
          <p className="text-xs text-muted-foreground opacity-70">
            © {new Date().getFullYear()} Jatin Awankar
          </p>

          <div className="flex gap-4 opacity-70">
            <Link href="mailto:jatinawankar02@gmail.com">Email</Link>
            <Link href="https://github.com/jatin-awankar" target="_blank">
              GitHub
            </Link>
            <Link
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
