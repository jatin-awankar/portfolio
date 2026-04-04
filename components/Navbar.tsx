"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const NAV_ITEMS = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "About", href: "#about", id: "about" },
  { label: "Writing", href: "#writing", id: "writing" },
] as const;

const SECTION_IDS = ["home", ...NAV_ITEMS.map((item) => item.id)];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 120);

      const midpoint = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTION_IDS.length - 1; i >= 0; i -= 1) {
        const section = document.getElementById(SECTION_IDS[i]);
        if (section && midpoint >= section.offsetTop) {
          setActiveSection(SECTION_IDS[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMenuOpen]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
        >
          <div className="mx-auto max-w-6xl rounded-[1.15rem] border border-black/10 bg-background/78 shadow-[0_10px_36px_rgba(0,0,0,0.12)] backdrop-blur-xl supports-backdrop-filter:backdrop-saturate-150 dark:border-white/10 dark:bg-background/72 dark:shadow-[0_12px_38px_rgba(0,0,0,0.34)]">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <Link
                href="#home"
                className="rounded-md text-sm font-semibold tracking-[0.02em] text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Jatin Awankar
              </Link>

              <nav className="hidden items-center gap-1.5 rounded-full border border-black/8 bg-black/2 p-1 dark:border-white/8 dark:bg-white/3 md:flex">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`relative rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-primary/14"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                        />
                      )}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="hidden items-center gap-2 md:flex">
                <AnimatedThemeToggler
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/3 text-foreground transition-all duration-200 hover:-translate-y-px hover:scale-[1.02] hover:bg-black/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/11"
                  aria-label="Toggle theme"
                />

                <Link
                  href="#contact"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_9px_20px_rgba(32,45,67,0.24)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_24px_rgba(32,45,67,0.3)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_10px_22px_rgba(37,99,235,0.45)]"
                >
                  Hire me
                </Link>
              </div>

              <div className="flex items-center gap-2 md:hidden">
                <AnimatedThemeToggler
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/3 text-foreground transition-colors duration-200 hover:bg-black/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/11"
                  aria-label="Toggle theme"
                />

                <button
                  type="button"
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/3 text-foreground transition hover:bg-black/6 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span className="sr-only">Open menu</span>
                  <div className="relative h-4 w-5">
                    <span
                      className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition ${
                        isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                      }`}
                    />
                    <span
                      className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current transition ${
                        isMenuOpen ? "opacity-0" : ""
                      }`}
                    />
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-5 rounded bg-current transition ${
                        isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden border-t border-black/10 md:hidden dark:border-white/10"
                >
                  <div className="space-y-1 px-4 py-3">
                    {NAV_ITEMS.map((item) => {
                      const isActive = activeSection === item.id;

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block rounded-lg px-3 py-2 text-sm transition ${
                            isActive
                              ? "bg-primary/20 text-primary"
                              : "text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5"
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                    <div className="mt-2 flex w-full items-center justify-center rounded-lg border border-border/80 px-3 py-2">
                      <AnimatedThemeToggler
                        className="inline-flex w-full items-center justify-center text-sm font-medium text-foreground"
                        aria-label="Toggle theme"
                      />
                    </div>
                    <Link
                      href="#contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="mt-2 block rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
                    >
                      Hire me
                    </Link>
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
