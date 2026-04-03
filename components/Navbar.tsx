"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const NAV_ITEMS = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "About", href: "#about", id: "about" },
  { label: "Writing", href: "#writing", id: "writing" },
] as const;

const SECTION_IDS = ["home", ...NAV_ITEMS.map((item) => item.id)];

const TRANSITION_DURATION = 0.46;

type ThemeFlowState = {
  x: number;
  y: number;
  theme: "light" | "dark";
} | null;

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [themeFlow, setThemeFlow] = useState<ThemeFlowState>(null);
  const { resolvedTheme, setTheme } = useTheme();

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

  const playThemeTick = () => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    try {
      const context = new AudioCtx();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startAt = context.currentTime;

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(740, startAt);
      oscillator.frequency.exponentialRampToValueAtTime(960, startAt + 0.06);

      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(0.02, startAt + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.095);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startAt);
      oscillator.stop(startAt + 0.1);

      oscillator.onended = () => {
        void context.close();
      };
    } catch {
      return;
    }
  };

  const onToggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    if (!resolvedTheme) return;

    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const rect = event.currentTarget.getBoundingClientRect();

    setThemeFlow({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      theme: nextTheme,
    });

    playThemeTick();
    setTheme(nextTheme);

    window.setTimeout(() => {
      setThemeFlow(null);
    }, TRANSITION_DURATION * 1000);
  };

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <AnimatePresence>
        {themeFlow && (
          <motion.div
            key={`theme-flow-${themeFlow.theme}`}
            className="pointer-events-none fixed inset-0 z-[70]"
            style={{
              background:
                themeFlow.theme === "dark"
                  ? "radial-gradient(circle at center, rgba(201, 214, 241, 0.34), rgba(8, 10, 14, 0.88) 62%)"
                  : "radial-gradient(circle at center, rgba(255, 255, 255, 0.92), rgba(220, 227, 239, 0.8) 62%)",
              clipPath: `circle(0px at ${themeFlow.x}px ${themeFlow.y}px)`,
            }}
            initial={{ clipPath: `circle(0px at ${themeFlow.x}px ${themeFlow.y}px)`, opacity: 0.8 }}
            animate={{ clipPath: `circle(150vmax at ${themeFlow.x}px ${themeFlow.y}px)`, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION, ease: [0.22, 0.61, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
          >
            <div className="mx-auto max-w-6xl rounded-[1.15rem] border border-black/10 bg-background/78 shadow-[0_10px_36px_rgba(0,0,0,0.12)] backdrop-blur-xl supports-[backdrop-filter]:backdrop-saturate-150 dark:border-white/10 dark:bg-background/72 dark:shadow-[0_12px_38px_rgba(0,0,0,0.34)]">
              <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                <Link
                  href="#home"
                  className="rounded-md text-sm font-semibold tracking-[0.02em] text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Jatin Awankar
                </Link>

                <nav className="hidden items-center gap-1.5 rounded-full border border-black/[0.08] bg-black/[0.02] p-1 dark:border-white/[0.08] dark:bg-white/[0.03] md:flex">
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
                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                          />
                        )}
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="hidden items-center gap-2 md:flex">
                  <button
                    type="button"
                    aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                    onClick={onToggleTheme}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-foreground transition-all duration-200 hover:-translate-y-px hover:scale-[1.02] hover:bg-black/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.11]"
                  >
                    <motion.span
                      key={isDark ? "sun" : "moon"}
                      initial={{ rotate: -40, scale: 0.7, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </motion.span>
                  </button>

                  <Link
                    href="#contact"
                    className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_9px_20px_rgba(32,45,67,0.24)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_24px_rgba(32,45,67,0.3)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_10px_22px_rgba(37,99,235,0.45)]"
                  >
                    Hire me
                  </Link>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                  <button
                    type="button"
                    aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                    onClick={onToggleTheme}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-foreground transition-colors duration-200 hover:bg-black/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.11]"
                  >
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>

                  <button
                    type="button"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-foreground transition hover:bg-black/[0.06] dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.1]"
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
                      <button
                        type="button"
                        onClick={(event) => {
                          onToggleTheme(event);
                          setIsMenuOpen(false);
                        }}
                        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/80 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-accent/45"
                      >
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        {isDark ? "Switch to light mode" : "Switch to dark mode"}
                      </button>
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
    </>
  );
}
