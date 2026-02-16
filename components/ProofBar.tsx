"use client";

import { motion } from "framer-motion";
import TrueFocus from "./TrueFocus";

export default function ProofBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-10"
    >
      <div className="pt-8 text-sm text-muted-foreground">
        <TrueFocus
          sentence="Backend-Systems Billing-Infrastructure Concurrency-Handling Failure-Safe-Design SaaS-Architecture"
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

// System-Design Usage-Based Billing (UsageFlow)
