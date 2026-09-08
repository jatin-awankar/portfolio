import Link from "next/link";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";

export function HomePane() {
  return (
    <div className="hero-layout">
      <div>
        <p className="eyebrow">
          <span className="status-dot" /> Open to engineering roles · India /
          remote
        </p>
        <h1 className="hero-title">
          Jatin Awankar.
          <br />
          <span>From idea to product.</span>
        </h1>
        <p className="hero-description">
          Full-stack engineer building AI-powered products and integrations.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/Jatin_Awankar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="action-primary"
          >
            View Resume <ArrowUpRight size={17} />
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </Link>
          <a href="#selected-work" className="action-secondary">
            Explore my work <ArrowDown size={16} />
          </a>
        </div>
        <div className="hero-socials">
          <Link
            href="https://github.com/jatin-awankar"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-action"
            aria-label="GitHub"
          >
            <Github size={18} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/jatin-awankar"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-action"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </Link>
          <Link href="mailto:jatinawankar02@gmail.com" className="text-action">
            Get in touch <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="build-note" aria-label="My approach to building products">
        <div className="build-note-header">
          <span>THE WAY I BUILD</span>
          <span className="text-orange-400">01 → 03</span>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <strong>Understand the problem.</strong>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Build the essential.</strong>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Account for the edges.</strong>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
