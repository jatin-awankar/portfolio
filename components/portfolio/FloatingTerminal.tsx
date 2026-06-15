"use client";

import {
  FormEvent,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { Terminal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTerminalData } from "@/components/portfolio/TerminalDataProvider";
import { DEFAULT_POSTS } from "@/components/portfolio/writings/default-posts";
import { portfolioPages } from "@/lib/portfolio-data";
import { projects } from "@/lib/data/projects";

type TerminalLine = {
  type: "in" | "out";
  text: string;
};

type Position = {
  x: number;
  y: number;
};

function pathnameToPage(pathname: string): string {
  if (pathname === "/") {
    return "home";
  }

  return pathname.replace(/^\//, "");
}

function pageHref(input: string): string | undefined {
  const normalized = input.replace(/^\//, "").replace(/\/$/, "");
  const target = portfolioPages.find((page) => page.key === normalized);
  return target?.href;
}

function projectSlug(input: string): string | undefined {
  const normalized = input.replace(/^\//, "").replace(/\/$/, "");
  const target = projects.find((project) => project.slug === normalized);
  return target?.slug;
}

const ascii = [
  "  +------+",
  "  |  JA  |   jatin@portfolio",
  "  +------+   ---------------------",
  "  os      : Next.js 16",
  "  shell   : TypeScript + Tailwind",
  "  stack   : Postgres, Redis, BullMQ",
  "  repos   : 36, followers: 3",
  "  status  : available for work",
];

export function FloatingTerminal() {
  const router = useRouter();
  const pathname = usePathname();
  const { posts } = useTerminalData();
  const blogPosts = posts?.length ? posts : DEFAULT_POSTS;
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "out",
      text: "Welcome to jatin@portfolio. Type 'help' to see available commands.",
    },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const currentPath = pathnameToPage(pathname);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, open]);

  const onDragStart = (event: ReactMouseEvent<HTMLDivElement>) => {
    const startX = event.clientX;
    const startY = event.clientY;
    const origin = { ...pos };

    const onMove = (moveEvent: MouseEvent) => {
      setPos({
        x: origin.x + (moveEvent.clientX - startX),
        y: origin.y + (moveEvent.clientY - startY),
      });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) {
      return;
    }

    const [name, ...args] = cmd.split(/\s+/);
    let out: string[] = [];

    switch (name) {
      case "help":
        out = [
          "available commands:",
          "  help            this list",
          "  whoami          who am I?",
          "  neofetch        system info",
          "  ls              list project slugs",
          "  cd <page>       navigate",
          "  open <project>  open a project case study",
          "  cat about.md    short bio",
          "  cat resume      open resume",
          "  github          github stats",
          "  blog            list writings",
          "  projects        list project case studies",
          "  contact         get in touch",
          "  clear           clear the terminal",
          "  sudo <cmd>      try it",
        ];
        break;
      case "whoami":
        out = [
          "jatin-awankar -- full-stack SaaS & MVP developer, based in India.",
        ];
        break;
      case "neofetch":
      case "banner":
        out = [...ascii];
        break;
      case "github":
        out = [
          "jatin-awankar",
          "  repos      : 36",
          "  followers  : 3",
          "  starred    : 11",
          "  badges     : YOLO, Pull Shark x2, Quickdraw",
        ];
        break;
      case "blog":
        out = blogPosts.map(
          (post) => `  ${post.date.padEnd(12)} ${post.title}`,
        );
        break;
      case "ls":
        out = projects.map((project) => `  ${project.slug}/`);
        break;
      case "open": {
        const slug = projectSlug(args[0] ?? "");
        if (!slug) {
          out = [
            `open: no such project: ${args[0] ?? ""}`,
            `try: ${projects.map((project) => project.slug).join(", ")}`,
          ];
          break;
        }

        if (pathname === "/projects") {
          document.getElementById(slug)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          window.history.replaceState(null, "", `/projects#${slug}`);
        } else {
          router.push(`/projects#${slug}`);
        }

        out = [`opening ~/projects/${slug}.tsx`];
        break;
      }
      case "cd": {
        const href = pageHref(args[0] ?? "");
        if (href) {
          router.push(href);
          out = [`navigating to ${href}`];
        } else {
          out = [
            `cd: no such page: ${args[0] ?? ""}`,
            `try: ${portfolioPages.map((page) => page.label).join(", ")}`,
          ];
        }
        break;
      }
      case "cat":
        if (args[0] === "about.md") {
          out = [
            "I design and build production-grade web applications from",
            "scratch -- focused on system design, performance, and",
            "understanding internals rather than just using abstractions.",
          ];
        } else if (args[0] === "resume" || args[0] === "resume.pdf") {
          window.open(
            "/Jatin_Awankar_Resume.pdf",
            "_blank",
            "noopener,noreferrer",
          );
          out = ["opening Jatin_Awankar_Resume.pdf in a new tab..."];
        } else {
          out = [`cat: ${args[0] ?? ""}: No such file`];
        }
        break;
      case "projects":
        out = projects.map(
          (project) => `${project.name.padEnd(21)} -- ${project.tagline}`,
        );
        break;
      case "contact":
        out = [
          "email    : jatinawankar02@gmail.com",
          "github   : github.com/jatin-awankar",
          "linkedin : linkedin.com/in/jatin-awankar",
        ];
        break;
      case "clear":
        setHistory([]);
        return;
      case "sudo":
        out = [
          "Permission denied: this shell only accepts user-level commands.",
        ];
        break;
      default:
        out = [`command not found: ${name} -- type 'help' for a list`];
    }

    setHistory((lines) => [
      ...lines,
      { type: "in", text: cmd },
      ...out.map<TerminalLine>((text) => ({ type: "out", text })),
    ]);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    run(input);
    setInput("");
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open terminal"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800/60 bg-zinc-900/70 text-orange-400 backdrop-blur-md transition-colors hover:border-orange-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 motion-reduce:transition-none"
      >
        <span className="absolute h-full w-full rounded-full border border-orange-400/40 motion-safe:animate-ping" />
        <Terminal className="relative h-5 w-5" />
      </button>
    );
  }

  return (
    <aside
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] max-w-[420px] overflow-hidden rounded-lg border border-zinc-800/60 bg-zinc-950/95 font-display text-xs shadow-2xl shadow-black/40 backdrop-blur-md sm:w-[420px]"
      aria-label="Floating terminal"
    >
      <div
        onMouseDown={onDragStart}
        className="flex cursor-grab items-center justify-between border-b border-zinc-800/60 bg-zinc-900/40 px-3 py-2 active:cursor-grabbing"
      >
        <div className="flex min-w-0 items-center gap-2 text-zinc-500">
          <Terminal className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">jatin@portfolio: ~/{currentPath}</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close terminal"
          className="rounded-sm text-zinc-500 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 motion-reduce:transition-none"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div
        ref={bodyRef}
        className="h-64 overflow-y-auto overflow-x-hidden px-3 py-2 text-zinc-400"
      >
        {history.map((line, index) => (
          <div
            key={`${line.type}-${line.text}-${index}`}
            className={cn(
              line.type === "in"
                ? "break-words text-zinc-100"
                : "whitespace-pre-wrap break-words text-zinc-500",
            )}
          >
            {line.type === "in" ? `$ ${line.text}` : line.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border-t border-zinc-800/60 px-3 py-2"
      >
        <span className="text-orange-400">$</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-1 rounded-sm bg-transparent text-zinc-100 outline-none placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-orange-400"
          placeholder="type a command..."
          autoFocus
        />
      </form>
    </aside>
  );
}
