"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
          <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-background/70 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <Link
                href="#home"
                className="rounded-md text-sm font-semibold tracking-wide text-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Jatin Awankar
              </Link>

              <nav className="hidden items-center gap-1 md:flex">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`relative rounded-full px-3 py-1.5 text-sm transition ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <Link
                href="#contact"
                className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_20px_rgba(37,99,235,0.45)] transition hover:-translate-y-px hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_12px_25px_rgba(37,99,235,0.5)] md:inline-flex"
              >
                Hire me
              </Link>

              <button
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition hover:bg-white/10 md:hidden"
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

            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden border-t border-white/10 md:hidden"
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
                              : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
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
