"use client";

import { useCallback, useEffect, useState } from "react";
import { IntroScreen } from "@/components/portfolio/IntroScreen";

const SESSION_KEY = "ja_intro_seen";

export function IntroProvider({ children }: { children: React.ReactNode }) {
  // null = not yet checked (avoids flash), false = show intro, true = skip
  const [skip, setSkip] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion — skip intro entirely
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || sessionStorage.getItem(SESSION_KEY)) {
      setSkip(true);
    } else {
      setSkip(false);
    }
  }, []);

  const handleComplete = useCallback(() => {
    setDone(true);
  }, []);

  // Still checking sessionStorage — render nothing to avoid flash
  if (skip === null) return null;

  return (
    <>
      {children}
      {!skip && !done && <IntroScreen onComplete={handleComplete} />}
    </>
  );
}
