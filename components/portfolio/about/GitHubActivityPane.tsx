import Link from "next/link";
import { PRCard } from "@/components/portfolio/PRCard";
import {
  getFeaturedOpenSourcePRs,
  type ContributionDay,
  type PullRequest,
} from "@/lib/github";
import { AchievementBadge } from "./AchievementBadge";
import { ContributionGraph } from "./ContributionGraph";

export type GitHubActivityPaneProps = {
  prs?: PullRequest[];
  contributionDays?: ContributionDay[];
  contributionTotal?: number;
};

const defaultPRs: PullRequest[] = getFeaturedOpenSourcePRs();

export function GitHubActivityPane({
  prs = defaultPRs,
  contributionDays,
  contributionTotal,
}: GitHubActivityPaneProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-xs text-zinc-500">
          {"// 02 - github activity"}
        </h2>
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
            Full-stack engineer with a backend focus.
          </p>
          <p className="mt-1 font-display text-xs text-zinc-500">
            Based in India · open-source contributor
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 rounded-md border border-zinc-800 bg-zinc-950/40 p-4 sm:flex sm:flex-wrap sm:gap-6">
        <AchievementBadge
          src="https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png"
          label="Pair Extraordinaire"
        />
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
        <h3 className="mb-2 font-display text-xs text-zinc-500">
          $ gh pr list --author jatin-awankar
        </h3>
        <div className="grid gap-3">
          {prs.map((pr) => (
            <PRCard
              key={pr.url}
              repo={pr.repo}
              title={pr.title}
              status={pr.status}
              href={pr.url}
              description={pr.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
