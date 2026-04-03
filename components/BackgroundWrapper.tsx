"use client";

import SmokeFlow from "./SmokeFlow";
import { SMOKE_CONFIG } from "@/lib/visual-effects";

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
      <div className="editorial-atmosphere pointer-events-none fixed inset-0 -z-40" />
      <div className="pointer-events-none fixed inset-0 -z-30">
        <SmokeFlow
          density={SMOKE_CONFIG.density}
          intensity={SMOKE_CONFIG.intensity}
          speed={SMOKE_CONFIG.speed}
          maxFps={SMOKE_CONFIG.maxFps}
          qualityScale={SMOKE_CONFIG.qualityScale}
          paused={SMOKE_CONFIG.paused}
        />
      </div>
      <div className="editorial-atmosphere-grain pointer-events-none fixed inset-0 -z-20" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-42 dark:opacity-60">
        {/* <Squares
          borderColor="rgba(162, 165, 172, 0.15)"
          squareSize={56}
          hoverFillColor="transparent"
          vignetteColor="rgba(12, 14, 18, 0.38)"
        /> */}
      </div>
      <main className="editorial-shell relative z-10 mx-auto w-full px-5 pb-20 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        {children}
      </main>
    </div>
  );
}
