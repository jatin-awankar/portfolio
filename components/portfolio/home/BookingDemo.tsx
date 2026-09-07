"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

export function BookingDemo() {
  const [ran, setRan] = useState(false);
  return (
    <div className="booking-demo">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow !mb-0">A small systems experiment</p>
        <span className="font-display text-xs text-zinc-400">
          Interactive simulation
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-zinc-100">
        Two riders. One remaining seat.
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
        An atomic booking lets one request claim the seat. The other sees it’s
        taken, instead of creating a second booking.
      </p>
      <div className="booking-flow" aria-live="polite" aria-atomic="true">
        <span>
          Rider A <strong>{ran ? "Confirmed" : "Ready"}</strong>
        </span>
        <ArrowRight size={16} aria-hidden="true" />
        <span className="booking-seat">
          {ran ? "0 seats left" : "1 seat left"}
        </span>
        <ArrowRight size={16} className="rotate-180" aria-hidden="true" />
        <span>
          Rider B <strong>{ran ? "Seat unavailable" : "Ready"}</strong>
        </span>
      </div>
      <button
        className="text-action text-orange-400"
        onClick={() => setRan(!ran)}
      >
        {ran ? <RotateCcw size={15} /> : <ArrowRight size={15} />}
        {ran ? "Reset experiment" : "Simulate competing requests"}
      </button>
      <p className="mt-2 text-xs leading-relaxed text-zinc-400">
        Illustrates the booking rule; no live requests are sent. Request order
        is fixed for this example.
      </p>
    </div>
  );
}
