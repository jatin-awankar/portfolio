"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

type DocumentWithTransition = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished?: Promise<void>;
  };
};

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const playToggleSound = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const AudioCtx =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      try {
        const context = new AudioCtx();
        const start = context.currentTime + 0.004;
        const osc = context.createOscillator();
        const gain = context.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(620, start);
        osc.frequency.exponentialRampToValueAtTime(10000, start + 0.05);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.075, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);

        osc.connect(gain);
        gain.connect(context.destination);
        osc.start(start);
        osc.stop(start + 0.17);
        osc.onended = () => {
          void context.close();
        };
      } catch {
        // Keep theme toggle functional if audio is blocked.
      }
    };

    playToggleSound();

    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y),
    );

    const applyTheme = () => {
      const newTheme = !isDark;
      setIsDark(newTheme);
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    const doc = document as DocumentWithTransition;
    if (typeof doc.startViewTransition !== "function") {
      applyTheme();
      return;
    }

    document.documentElement.classList.add("theme-transitioning");
    const transition = doc.startViewTransition(() => {
      flushSync(applyTheme);
    });

    const ready = transition?.ready;
    if (ready && typeof ready.then === "function") {
      ready.then(() => {
        document.documentElement.classList.add("theme-transitioning");
        const animation = document.documentElement.animate(
          {
            clipPath: [
              `circle(2px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
        void animation.finished.finally(() => {
          if (!transition.finished) {
            document.documentElement.classList.remove("theme-transitioning");
          }
        });
      });
    }

    const finish = transition.finished;
    if (finish && typeof finish.finally === "function") {
      void finish.finally(() => {
        document.documentElement.classList.remove("theme-transitioning");
      });
    } else {
      window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, duration + 120);
    }
  }, [isDark, duration]);

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      {...props}
    >
      {isDark ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
