export type PageIntroProps = {
  count: number;
};

export function PageIntro({ count }: PageIntroProps) {
  return (
    <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/20 px-4 py-4">
      <p className="project-label mb-2">
        <span className="project-highlight-marker">$ ls /writings</span> · {count} {count === 1 ? "post" : "posts"}
      </p>
      <h1 className="font-display text-2xl font-semibold text-zinc-100 sm:text-3xl">Engineering notes.</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
        Notes on architecture, payments, and concurrency, grounded in the systems I build.
      </p>
    </div>
  );
}
