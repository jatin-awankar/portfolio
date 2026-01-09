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
          squareSize={40}
          borderColor="#454545"
          hoverFillColor="#222"
        />
      </div>
      {/* Page content */}
      <main className="relative z-10 text-center my-20 mx-8 md:mx-40 lg:mx-80 xl:mx-100">{children}</main>
    </div>
  );
}
