import { FocusedPane } from "@/components/portfolio/FocusedPane";
import { Pane } from "@/components/portfolio/Pane";
import { BioPane } from "@/components/portfolio/about/BioPane";
import { GitHubActivityPane } from "@/components/portfolio/about/GitHubActivityPane";
import { getContributionGraph, getOpenSourcePRs } from "@/lib/github";

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
        <span className="text-zinc-200">jatin-awankar</span>
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
