"use client";

// import Section from "./MotionSectionWrapper";

export default function About() {
  return (
    <div
      className="mt-32 max-w-3xl text-start"
    >
      <h3 className="text-2xl font-medium text-primary">
        About
      </h3>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        I am a computer science engineering student focused on full-stack
        development and system-oriented thinking.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        I enjoy building applications end-to-end — from database schema design
        and authentication flows to frontend architecture and deployment.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        My approach emphasizes clarity, maintainability, and scalability over
        quick demos or surface-level features. I prefer designing systems first,
        then implementing them with clean, readable code.
      </p>

      <p className="mt-4 text-muted-foreground leading-relaxed">
        I care deeply about how software behaves in real-world conditions.
      </p>
    </div>
  );
}
