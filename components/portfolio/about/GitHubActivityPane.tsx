import Link from "next/link";
import { PRCard } from "@/components/portfolio/PRCard";
import type { ContributionDay, PullRequest } from "@/lib/github";
import { AchievementBadge } from "./AchievementBadge";
import { ContributionGraph } from "./ContributionGraph";

export type GitHubActivityPaneProps = {
  prs?: PullRequest[];
  contributionDays?: ContributionDay[];
  contributionTotal?: number;
};

const defaultPRs: PullRequest[] = [
  {
    repo: "openstatusHQ/openstatus #2261 · 8.7k★",
    title:
      "Added a loading skeleton to the status pages list -- replaced the blank loading state with a DataTableSkeleton component",
    status: "Merged",
    url: "https://github.com/openstatusHQ/openstatus/pull/2261",
  },
  {
    repo: "openstatusHQ/openstatus #2276 · 8.7k★",
    title:
      "Added a loading state to DomainConfiguration -- wired the existing isLoading flag to show a spinner during domain queries",
    status: "In review",
    url: "https://github.com/openstatusHQ/openstatus/pull/2276",
  },
];

export function GitHubActivityPane({
  prs = defaultPRs,
  contributionDays,
  contributionTotal,
}: GitHubActivityPaneProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-display text-xs text-zinc-500">
          {"// 02 - github activity"}
        </p>
        <Link
          href="https://github.com/jatin-awankar"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm font-display text-xs text-zinc-500 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
        >
          $ open github.com/jatin-awankar ↗
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://avatars.githubusercontent.com/u/161307361?v=4"
          alt="jatin-awankar avatar"
          className="h-14 w-14 rounded-full border border-zinc-800"
        />
        <div>
          <p className="font-display text-sm font-medium text-zinc-100">
            jatin-awankar
          </p>
          <p className="text-sm text-zinc-400">
            Software Engineer building scalable SaaS systems.
          </p>
          <p className="mt-1 font-display text-xs text-zinc-500">
            36 repositories · 3 followers · 11 starred · India
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 rounded-md border border-zinc-800 bg-zinc-950/40 p-4">
        <AchievementBadge
          src="https://github.githubassets.com/assets/yolo-default-be0bbff04951.png"
          label="YOLO"
        />
        <AchievementBadge
          src="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png"
          label="Pull Shark"
          count={2}
        />
        <AchievementBadge
          src="https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png"
          label="Quickdraw"
        />
      </div>

      <ContributionGraph days={contributionDays} total={contributionTotal} />

      <div>
        <p className="mb-2 font-display text-xs text-zinc-500">
          $ gh pr list --author jatin-awankar
        </p>
        <div className="grid gap-3">
          {prs.map((pr) => (
            <PRCard
              key={pr.url}
              repo={pr.repo}
              title={pr.title}
              status={pr.status}
              href={pr.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
