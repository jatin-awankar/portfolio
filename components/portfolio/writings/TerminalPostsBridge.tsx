"use client";

import { useEffect } from "react";
import { useTerminalData } from "@/components/portfolio/TerminalDataProvider";
import type { BlogPost } from "@/lib/medium";

export type TerminalPostsBridgeProps = {
  posts: BlogPost[];
};

export function TerminalPostsBridge({ posts }: TerminalPostsBridgeProps) {
  const { setPosts } = useTerminalData();

  useEffect(() => {
    setPosts(posts);
  }, [posts, setPosts]);

  return null;
}
