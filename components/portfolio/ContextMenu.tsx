"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  FolderOpen,
  FileText,
  Github,
  Linkedin,
  Code,
  Eye,
  X,
} from "lucide-react";

interface MenuItem {
  type: "item" | "divider";
  label?: string;
  command?: string;
  icon?: React.ReactNode;
  action?: () => void;
}

interface Position {
  x: number;
  y: number;
}

export function ContextMenu() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const hide = () => setVisible(false);

  const menuItems: MenuItem[] = [
    {
      type: "item",
      label: "about",
      command: "whoami",
      icon: <User className="h-3.5 w-3.5" />,
      action: () => {
        router.push("/about");
        hide();
      },
    },
    {
      type: "item",
      label: "projects",
      command: "ls /projects",
      icon: <FolderOpen className="h-3.5 w-3.5" />,
      action: () => {
        router.push("/projects");
        hide();
      },
    },
    {
      type: "item",
      label: "resume",
      command: "cat resume.pdf",
      icon: <FileText className="h-3.5 w-3.5" />,
      action: () => {
        window.open(
          "/Jatin_Awankar_Resume.pdf",
          "_blank",
          "noopener,noreferrer",
        );
        hide();
      },
    },
    {
      type: "item",
      label: "github",
      command: "open --source",
      icon: <Github className="h-3.5 w-3.5" />,
      action: () => {
        window.open(
          "https://github.com/jatin-awankar",
          "_blank",
          "noopener,noreferrer",
        );
        hide();
      },
    },
    {
      type: "item",
      label: "linkedin",
      command: "open --linkedin",
      icon: <Linkedin className="h-3.5 w-3.5" />,
      action: () => {
        window.open(
          "https://www.linkedin.com/in/jatin-awankar",
          "_blank",
          "noopener,noreferrer",
        );
        hide();
      },
    },
    { type: "divider" },
    {
      type: "item",
      label: "inspect",
      command: "F12 / Ctrl+Shift+I",
      icon: <Code className="h-3.5 w-3.5" />,
      action: () => hide(), // just closes the menu
    },
    {
      type: "item",
      label: "view source",
      command: "open --repo",
      icon: <Eye className="h-3.5 w-3.5" />,
      action: () => {
        window.open(
          "https://github.com/jatin-awankar/portfolio",
          "_blank",
          "noopener,noreferrer",
        );
        hide();
      },
    },
  ];

  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      // Don't intercept right-clicks on inputs, textareas, or the terminal
      const target = e.target as HTMLElement;
      if (
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("aside[aria-label='Floating terminal']")
      ) {
        return;
      }

      e.preventDefault();

      // Keep menu within viewport bounds
      const menuWidth = 260;
      const menuHeight = 280;
      const x =
        e.clientX + menuWidth > window.innerWidth
          ? e.clientX - menuWidth
          : e.clientX;
      const y =
        e.clientY + menuHeight > window.innerHeight
          ? e.clientY - menuHeight
          : e.clientY;

      setPos({ x, y });
      setVisible(true);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("click", hide);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("click", hide);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Re-check bounds after render when we know the actual menu height
  useEffect(() => {
    if (!visible || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    setPos((prev) => ({
      x:
        prev.x + rect.width > window.innerWidth
          ? window.innerWidth - rect.width - 8
          : prev.x,
      y:
        prev.y + rect.height > window.innerHeight
          ? window.innerHeight - rect.height - 8
          : prev.y,
    }));
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Site context menu"
      style={{ top: pos.y, left: pos.x }}
      className="fixed z-9999 w-[260px] overflow-hidden rounded-lg border border-zinc-800/60 bg-zinc-950/95 font-display text-xs shadow-2xl shadow-black/60 backdrop-blur-md"
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-zinc-800/60 bg-zinc-900/40 px-3 py-2 text-zinc-500">
        <span>jatin@portfolio: context-menu</span>
        <button
          onClick={hide}
          aria-label="Close context menu"
          className="text-zinc-600 transition-colors hover:text-orange-400"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* items */}
      <div className="py-1">
        {menuItems.map((item, i) => {
          if (item.type === "divider") {
            return <div key={i} className="my-1 border-t border-zinc-800/60" />;
          }

          return (
            <button
              key={i}
              role="menuitem"
              onClick={item.action}
              className="group flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-zinc-800/60 focus-visible:bg-zinc-800/60 focus-visible:outline-none"
            >
              <span className="text-orange-400/60 transition-colors group-hover:text-orange-400">
                {item.icon}
              </span>
              <span className="flex-1 text-zinc-200">{item.label}</span>
              <span className="text-zinc-600 transition-colors group-hover:text-zinc-500">
                {item.command}
              </span>
            </button>
          );
        })}
      </div>

      {/* footer */}
      <div className="border-t border-zinc-800/60 bg-zinc-900/20 px-3 py-1.5 text-zinc-600">
        esc to close · right-click anywhere
      </div>
    </div>
  );
}
