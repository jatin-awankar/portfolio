"use client";

import Squares from "./Squares";

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
      {/* background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Squares
          borderColor="rgba(255,255,255,0.07)"
          squareSize={48}
          hoverFillColor="transparent"
        />
      </div>
      {/* Page content */}
      <main className="relative z-10 my-16 max-w-6xl mx-auto px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
