import Link from "next/link";

export type PlaceholderPaneProps = {
  path: string;
};

export function PlaceholderPane({ path }: PlaceholderPaneProps) {
  return (
    <div className="flex flex-col items-start gap-3 text-zinc-500">
      <p className="font-display text-xs text-zinc-600">
        // {path} - coming up next
      </p>
      <p className="max-w-md text-sm leading-relaxed">
        TODO: replace this temporary scaffold with the real {path} page content.
        The routed shell, status bar, pane chrome, and terminal navigation are in
        place.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md border border-zinc-700 px-3 py-1.5 font-display text-xs text-zinc-200 transition-colors hover:border-orange-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 motion-reduce:transition-none"
      >
        cd home
      </Link>
    </div>
  );
}
