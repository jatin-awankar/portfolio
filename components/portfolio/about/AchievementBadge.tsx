export type AchievementBadgeProps = {
  src: string;
  label: string;
  count?: number;
};

export function AchievementBadge({ src, label, count }: AchievementBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} className="h-12 w-12" />
      <span className="font-display text-xs text-zinc-500">
        {label}
        {count ? ` x${count}` : ""}
      </span>
    </div>
  );
}
