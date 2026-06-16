import type { ContributionDay } from "@/lib/github";

export type ContributionGraphProps = {
  days?: ContributionDay[];
  total?: number;
};

type GraphDay = ContributionDay & {
  date: string;
};

type GraphWeek = {
  key: string;
  days: Array<GraphDay | undefined>;
};

type MonthLabel = {
  month: string;
  column: number;
};

const weekdayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

const levelStyles = [
  "border-zinc-800/80 bg-zinc-900",
  "border-zinc-700/70 bg-zinc-800",
  "border-zinc-700/80 bg-zinc-700",
  "border-orange-400/50 bg-orange-400/40",
  "border-orange-300/80 bg-orange-400",
];

function contributionLevel(index: number): number {
  const value = (index * 13 + (index % 7) * 5) % 17;
  if (value < 7) return 0;
  if (value < 11) return 1;
  if (value < 14) return 2;
  if (value < 16) return 3;
  return 4;
}

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function startOfWeek(date: Date): Date {
  return addDays(date, -date.getDay());
}

function formatDayLabel(dateKey: string): string {
  if (!dateKey) {
    return "No contributions";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateKey}T00:00:00`));
}

function pluralizeContributions(count: number): string {
  return `${count} contribution${count === 1 ? "" : "s"}`;
}

function makePlaceholderDays(): GraphDay[] {
  const today = new Date();
  const start = addDays(today, -363);

  return Array.from({ length: 364 }, (_, index) => {
    const date = addDays(start, index);
    const level = contributionLevel(index);
    const count = level === 0 ? 0 : level + ((index * 3) % 4);

    return {
      date: toDateKey(date),
      count,
      level,
    };
  });
}

function normalizeDays(days: ContributionDay[] | undefined): GraphDay[] {
  if (!days?.length) {
    return [];
  }

  return days
    .filter((day) => day.date && !Number.isNaN(Date.parse(day.date)))
    .map((day) => ({
      ...day,
      count: Math.max(0, day.count),
      level: Math.min(Math.max(day.level, 0), 4),
    }));
}

function buildWeeks(cells: GraphDay[]): GraphWeek[] {
  if (!cells.length) {
    return [];
  }

  const sorted = [...cells].sort((a, b) => a.date.localeCompare(b.date));
  const byDate = new Map(sorted.map((cell) => [cell.date, cell]));
  const first = startOfWeek(new Date(`${sorted[0].date}T00:00:00`));
  const last = new Date(`${sorted[sorted.length - 1].date}T00:00:00`);
  const weeks: GraphWeek[] = [];

  for (
    let weekStart = first;
    weekStart <= last;
    weekStart = addDays(weekStart, 7)
  ) {
    const weekDays = Array.from({ length: 7 }, (_, day) => {
      const date = addDays(weekStart, day);
      return byDate.get(toDateKey(date));
    });

    weeks.push({
      key: toDateKey(weekStart),
      days: weekDays,
    });
  }

  return weeks;
}

function getMonthLabels(weeks: GraphWeek[]): MonthLabel[] {
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });
  const labels: MonthLabel[] = [];
  let previousMonth = "";

  weeks.forEach((week, column) => {
    const firstDay = week.days.find(Boolean);
    if (!firstDay) {
      return;
    }

    const date = new Date(`${firstDay.date}T00:00:00`);
    const month = formatter.format(date);

    if (month !== previousMonth) {
      labels.push({ month, column });
      previousMonth = month;
    }
  });

  return labels;
}

export function ContributionGraph({ days, total }: ContributionGraphProps) {
  const liveCells = normalizeDays(days);
  const isLive = liveCells.length > 0;
  const cells = isLive ? liveCells : makePlaceholderDays();
  const weeks = buildWeeks(cells);
  const monthLabels = getMonthLabels(weeks);
  const contributionTotal =
    total ?? cells.reduce((sum, cell) => sum + cell.count, 0);

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 font-display text-xs text-zinc-500">
        <span>
          contributions.svg
          {contributionTotal != null
            ? ` - ${contributionTotal} in the last 12 months`
            : " - last 12 months"}
        </span>
        {!isLive ? (
          <span className="text-zinc-600">
            fallback preview - GitHub data unavailable
          </span>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-md border border-zinc-800 bg-zinc-950/40 p-3">
        <div className="w-full min-w-[720px]">
          <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-2">
            <div aria-hidden="true" />
            <div
              className="grid h-4 items-start"
              style={{
                gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
              }}
              aria-hidden="true"
            >
              {monthLabels.map((label) => (
                <span
                  key={`${label.month}-${label.column}`}
                  className="font-display text-[10px] leading-none text-zinc-600"
                  style={{ gridColumnStart: label.column + 1 }}
                >
                  {label.month}
                </span>
              ))}
            </div>

            <div className="grid grid-rows-7 gap-1 font-display text-[10px] leading-none text-zinc-600">
              {weekdayLabels.map((label, index) => (
                <span
                  key={`${label || "empty"}-${index}`}
                  className="flex h-full items-center justify-end"
                >
                  {label}
                </span>
              ))}
            </div>
            <div
              className="grid grid-flow-col grid-rows-7 gap-1"
              style={{
                gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
              }}
              role="grid"
              aria-label={`${contributionTotal} GitHub contributions in the last 12 months`}
            >
              {weeks.flatMap((week, weekIndex) =>
                week.days.map((cell, day) => {
                    const level = cell?.level ?? 0;
                    const count = cell?.count ?? 0;
                    const dateLabel = cell?.date
                      ? formatDayLabel(cell.date)
                      : "";
                    const tooltip = cell
                      ? `${pluralizeContributions(count)} on ${dateLabel}`
                      : "No data";
                    const tooltipAlignment =
                      weekIndex > weeks.length - 6
                        ? "right-0 translate-x-0"
                        : weekIndex < 5
                          ? "left-0 translate-x-0"
                          : "left-1/2 -translate-x-1/2";
                    const tooltipArrowAlignment =
                      weekIndex > weeks.length - 6
                        ? "right-1"
                        : weekIndex < 5
                          ? "left-1"
                          : "left-1/2 -translate-x-1/2";
                    const tooltipVertical =
                      day < 2 ? "top-full mt-2" : "bottom-full mb-2";
                    const tooltipArrowVertical =
                      day < 2
                        ? "bottom-full translate-y-1/2 border-l border-t"
                        : "top-full -translate-y-1/2 border-b border-r";

                    return (
                      <div
                        key={`${week.key}-${day}`}
                        role="gridcell"
                        tabIndex={cell ? 0 : -1}
                        aria-label={tooltip}
                        className="group relative aspect-square min-h-2.5 min-w-2.5 rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                      >
                        <span
                          className={`block h-full w-full rounded-[2px] border transition-transform duration-150 group-hover:scale-125 group-focus-visible:scale-125 motion-reduce:transition-none ${levelStyles[level]}`}
                        />
                        {cell ? (
                          <span
                            className={`pointer-events-none absolute z-20 hidden w-max max-w-52 rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-center font-display text-[10px] leading-snug text-zinc-200 shadow-xl shadow-black/40 group-hover:block group-focus-visible:block ${tooltipAlignment} ${tooltipVertical}`}
                          >
                            {tooltip}
                            <span
                              className={`absolute h-2 w-2 rotate-45 border-zinc-700 bg-zinc-950 ${tooltipArrowAlignment} ${tooltipArrowVertical}`}
                            />
                          </span>
                        ) : null}
                      </div>
                    );
                  }),
              )}
            </div>
          </div>

          {!isLive ? (
            <p className="mt-3 rounded border border-zinc-800 bg-zinc-950/40 px-3 py-2 font-display text-[10px] text-zinc-600">
              fallback: using deterministic preview activity until GitHub
              contribution data is available.
            </p>
          ) : null}

          <div className="mt-3 flex items-center justify-end gap-1.5 font-display text-[10px] text-zinc-600">
            <span>Less</span>
            {levelStyles.map((style, level) => (
              <span
                key={level}
                className={`h-2.5 w-2.5 rounded-[2px] border ${style}`}
                aria-hidden="true"
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
