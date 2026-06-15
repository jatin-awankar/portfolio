export type PageIntroProps = {
  count: number;
};

export function PageIntro({ count }: PageIntroProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-zinc-800/60 bg-zinc-900/20 px-4 py-3 font-display text-xs text-zinc-500">
      <span className="text-orange-400">
        $ curl -s medium.com/feed/@jatinawankar02 | jq &apos;.title&apos;
      </span>
      <span className="text-zinc-200">{count} posts</span>
    </div>
  );
}
