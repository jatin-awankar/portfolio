"use client"

import TrueFocus from "./TrueFocus";

export default function ProofBar() {
  return (
    <section className="mt-10"
    >
      <div className="pt-8 text-sm text-muted-foreground">
        <TrueFocus
          sentence="Next.js Full-Stack SaaS System-Design Usage-Based Billing (LedgerFlow) Real-Time Maps Auth Production-Focused"
          manualMode={false}
          blurAmount={2}
          borderColor="green"
          animationDuration={1}
          pauseBetweenAnimations={0.5}
        />
      </div>
    </section>
  );
}
