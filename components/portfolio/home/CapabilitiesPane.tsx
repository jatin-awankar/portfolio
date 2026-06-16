import Link from "next/link";
import type { SkillGroup } from "@/lib/portfolio-data";
import { skillGroups } from "@/lib/portfolio-data";

function CapabilityCard({ icon: Icon, title, items }: SkillGroup) {
  return (
    <article className="rounded-md border border-zinc-800/60 bg-zinc-950/30 p-5 transition-colors hover:border-orange-400/40 motion-reduce:transition-none">
      <Icon className="mb-3 h-4 w-4 text-orange-400" />
      <h3 className="mb-2 font-display text-sm font-medium text-zinc-100">
        {title}
      </h3>
      <ul className="space-y-1 text-xs text-zinc-500">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-orange-400/50">&gt;</span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function CapabilitiesPane() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-display text-xs text-zinc-500">
          {"// 03 - what I work with"}
        </p>
        <Link
          href="/about"
          className="rounded-sm font-display text-xs text-zinc-500 transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
        >
          cd /about -&gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <CapabilityCard key={group.title} {...group} />
        ))}
      </div>
    </div>
  );
}
