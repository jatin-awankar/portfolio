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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      id={id}
    >
      {children}
    </motion.section>
  );
}
