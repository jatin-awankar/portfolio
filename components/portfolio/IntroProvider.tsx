import type { ReactNode } from "react";

// The portfolio is immediately readable, including before JavaScript loads.
export function IntroProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
