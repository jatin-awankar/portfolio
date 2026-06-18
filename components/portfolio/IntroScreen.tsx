"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";

const COMMAND = "initializing portfolio...";
const CHAR_INTERVAL_MS = 38; // typing speed per character
const POST_TYPE_PAUSE_MS = 320; // pause after typing before flying out
const SESSION_KEY = "ja_intro_seen";

type Phase =
  | "typing" // command is being typed out
  | "flying" // icon flies to bottom-right, portfolio fades in
  | "done"; // overlay removed from DOM

interface IntroScreenProps {
  onComplete: () => void; // called when overlay should be removed
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<Phase>("typing");
  const charIndex = useRef(0);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;

    const id = setInterval(() => {
      charIndex.current += 1;
      setTyped(COMMAND.slice(0, charIndex.current));

      if (charIndex.current >= COMMAND.length) {
        clearInterval(id);
        setTimeout(() => setPhase("flying"), POST_TYPE_PAUSE_MS);
      }
    }, CHAR_INTERVAL_MS);

    return () => clearInterval(id);
  }, [phase]);

  // After fly animation completes, remove overlay
  useEffect(() => {
    if (phase !== "flying") return;
    // CSS transition is 600ms — remove from DOM shortly after
    const id = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      onComplete();
    }, 700);
    return () => clearTimeout(id);
  }, [phase, onComplete]);

  const isFlying = phase === "flying";

  return (
    <>
      {/* Portfolio content fade-in overlay — zinc-950 that fades out as icon flies */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-60 bg-zinc-950 transition-opacity ease-in-out"
        style={{ opacity: isFlying ? 0 : 1, transitionDuration: "600ms" }}
      />

      {/* Centered intro panel — fades out as icon flies */}
      <div
        aria-hidden={isFlying}
        className="fixed inset-0 z-70 flex flex-col items-center justify-center transition-opacity ease-in-out"
        style={{
          opacity: isFlying ? 0 : 1,
          pointerEvents: isFlying ? "none" : "auto",
          transitionDuration: "500ms",
        }}
      >
        {/* Terminal icon — centered, then flies to bottom-right */}
        <div
          className="fixed z-80"
          style={{
            // Start: centered (use translate to offset the 48px button)
            // End: bottom-6 right-6 (matches FloatingTerminal button position)
            transition: isFlying
              ? "top 600ms cubic-bezier(0.4,0,0.2,1), left 600ms cubic-bezier(0.4,0,0.2,1), transform 600ms cubic-bezier(0.4,0,0.2,1)"
              : "none",
            top: isFlying ? "calc(100vh - 50px)" : "50%",
            left: isFlying ? "calc(100vw - 72px)" : "50%",
            transform: isFlying
              ? "translate(-100%, -100%)"
              : "translate(-50%, -50%)",
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800/60 bg-zinc-900/70 text-orange-400 backdrop-blur-md">
            {!isFlying && (
              <span className="absolute h-12 w-12 animate-ping rounded-full border border-orange-400/40" />
            )}
            <Terminal className="relative h-5 w-5" />
          </div>
        </div>

        {/* Typing area — centered below the icon */}
        <div
          className="mt-20 flex items-center gap-1 font-mono text-sm text-zinc-400"
          style={{
            transition: "opacity 300ms ease-out",
            opacity: isFlying ? 0 : 1,
          }}
        >
          <span className="text-orange-400">$</span>
          <span className="text-zinc-300">{typed}</span>
          <span
            className="ml-0.5 inline-block h-4 w-[2px] bg-orange-400"
            style={{ opacity: showCursor ? 1 : 0 }}
          />
        </div>
      </div>
    </>
  );
}
