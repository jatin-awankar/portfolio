"use client";

import Squares from "./Squares";

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
      <div className="editorial-atmosphere pointer-events-none fixed inset-0 -z-20" />
      <div className="editorial-atmosphere-grain pointer-events-none fixed inset-0 -z-10" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        <Squares
          borderColor="rgba(198, 198, 201, 0.16)"
          squareSize={56}
          hoverFillColor="transparent"
        />
      </div>
      <main className="editorial-shell relative z-10 mx-auto w-full px-5 pb-20 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        {children}
      </main>
    </div>
  );
}
