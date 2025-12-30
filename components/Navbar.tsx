"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 120);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <span className="text-sm font-medium text-foreground">
              Jatin Awankar
            </span>

            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#about" className="hover:text-foreground transition">
                About
              </Link>
              <Link href="#projects" className="hover:text-foreground transition">
                Projects
              </Link>
              <Link href="#skills" className="hover:text-foreground transition">
                Skills
              </Link>
              <Link href="#contact" className="hover:text-foreground transition">
                Contact
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
