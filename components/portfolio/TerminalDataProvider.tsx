"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import type { BlogPost } from "@/lib/medium";

type TerminalData = {
  posts?: BlogPost[];
  setPosts: (posts: BlogPost[] | undefined) => void;
};

const TerminalDataContext = createContext<TerminalData | undefined>(undefined);

export function TerminalDataProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[] | undefined>();
  const value = useMemo(() => ({ posts, setPosts }), [posts]);

  return (
    <TerminalDataContext.Provider value={value}>
      {children}
    </TerminalDataContext.Provider>
  );
}

export function useTerminalData(): TerminalData {
  const context = useContext(TerminalDataContext);

  if (!context) {
    throw new Error("useTerminalData must be used inside TerminalDataProvider");
  }

  return context;
}
