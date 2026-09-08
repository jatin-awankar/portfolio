import type { Metadata } from "next";
import { FocusedPane } from "@/components/portfolio/FocusedPane";
import { Pane } from "@/components/portfolio/Pane";
import { BioPane } from "@/components/portfolio/about/BioPane";
import { GitHubActivityPane } from "@/components/portfolio/about/GitHubActivityPane";
import { getContributionGraph, getOpenSourcePRs } from "@/lib/github";

const description =
  "Meet Jatin Awankar, a full-stack engineer building web applications from interfaces to APIs and databases. Explore his interests and open-source contributions.";

export const metadata: Metadata = {
  title: "About Jatin Awankar | Full-Stack Engineer",
  description,
  openGraph: {
    title: "About Jatin Awankar | Full-Stack Engineer",
    description,
    url: "https://jatinawankar.dev/about",
    images: [{ url: "/og.webp", width: 1200, height: 630, alt: "Jatin Awankar | Full-Stack Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Jatin Awankar | Full-Stack Engineer",
    description,
    images: ["/og.webp"],
  },
};

export default async function AboutPage() {
  const [graphResult, prsResult] = await Promise.allSettled([
    getContributionGraph(),
    getOpenSourcePRs(),
  ]);

  const graph =
    graphResult.status === "fulfilled" ? graphResult.value : undefined;
  const prs = prsResult.status === "fulfilled" ? prsResult.value : undefined;

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-zinc-800/60 bg-zinc-900/20 px-4 py-3 font-display text-xs text-zinc-500">
        <span className="text-orange-400">$ whoami</span>
        <h1 className="font-display text-2xl font-semibold text-zinc-100 sm:text-3xl">Jatin Awankar</h1>
      </div>

      <FocusedPane title="~/about/bio.tsx">
        <BioPane />
      </FocusedPane>

      <Pane title="~/about/github.tsx">
        <GitHubActivityPane
          contributionDays={graph?.days}
          contributionTotal={graph?.totalContributions}
          prs={prs}
        />
      </Pane>
    </>
  );
}
