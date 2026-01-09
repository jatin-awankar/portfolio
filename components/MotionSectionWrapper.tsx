"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function Section({ children, className, id }: SectionProps) {
  return (
    <motion.section
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.6,
      ease: "easeOut",
    }}
      id={id}
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
