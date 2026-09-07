"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LiveClock } from "@/components/portfolio/LiveClock";
import { portfolioPages } from "@/lib/portfolio-data";

function pathnameToLabel(pathname: string): string {
  if (pathname === "/") {
    return "home";
  }

  return pathname.replace(/^\//, "");
}

export function StatusBar() {
  const pathname = usePathname();
  const currentPath = pathnameToLabel(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 font-display text-xs">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <span className="text-orange-400">~</span>
          <Link href="/" className="brand-link">
            jatin awankar<span className="text-orange-400">.</span>
          </Link>
          <span className="sr-only">{currentPath}</span>
        </div>

        <nav className="hidden items-center gap-4 md:flex" aria-label="Primary">
          {portfolioPages.map((page) => {
            const active = pathname === page.href;
            return (
              <Link
                key={page.key}
                href={page.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-link rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 motion-reduce:transition-none",
                  active
                    ? "text-orange-400"
                    : "text-zinc-400 hover:text-zinc-200",
                )}
              >
                /{page.key}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          <LiveClock />
        </div>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-zinc-800/40 px-4 font-display text-xs md:hidden"
        aria-label="Mobile primary"
      >
        {portfolioPages.map((page) => {
          const active = pathname === page.href;
          return (
            <Link
              key={page.key}
              href={page.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "whitespace-nowrap nav-link rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 motion-reduce:transition-none",
                active ? "text-orange-400" : "text-zinc-400",
              )}
            >
              /{page.key}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
