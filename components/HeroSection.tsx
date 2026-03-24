"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-8 text-left"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/my-profile.jpg"
            alt="Jatin Awankar"
            width={64}
            height={64}
            className="rounded-xl object-cover"
            priority
          />
          <div>
            <p className="text-sm text-muted-foreground">Jatin Awankar</p>
            <p className="text-xs text-muted-foreground">
              Full-Stack SaaS Developer
            </p>
          </div>
        </div>

        {/* Socials minimal */}
        <div className="flex gap-3 opacity-70">
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

      {/* Main content */}
      <div className="max-w-3xl flex flex-col gap-5">
        <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
          I build scalable MVPs & SaaS products for startups
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          From idea to production — fast, reliable, and built to scale. I help
          founders launch products with clean backend systems, real-time
          features, and architecture that won’t break as you grow.
        </p>

        {/* CTA */}
        <div className="flex gap-4 mt-2">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Start a Project
          </Link>

          <Link
            href="#projects"
            className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-2.5 text-sm font-medium hover:bg-card transition"
          >
            View Work
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
