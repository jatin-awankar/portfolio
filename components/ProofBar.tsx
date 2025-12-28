"use client";

import { motion } from "framer-motion";
import TrueFocus from './TrueFocus';

export default function ProofBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-10"
    >
      <div className="pt-6 text-sm text-muted-foreground">
        {/* <p className="max-w-4xl">
          Next.js Full-Stack · SaaS & System Design · Usage-Based Billing
          (LedgerFlow) · Real-Time Maps & Auth · Production-Focused
        </p> */}
        <TrueFocus 
            sentence="Next.js Full-Stack SaaS System-Design Usage-Based Billing (LedgerFlow) Real-Time Maps Auth Production-Focused"
            manualMode={false}
            blurAmount={2}
            borderColor="green"
            animationDuration={1}
            pauseBetweenAnimations={0.5}
        />
      </div>
    </motion.section>
  );
}
