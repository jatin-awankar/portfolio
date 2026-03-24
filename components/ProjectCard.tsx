"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Github,
  Lock,
  X,
} from "lucide-react";
import { ProjectCardProps } from "./FeaturedProjects";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function ProjectCard({
  title,
  description,
  demo,
  highlights,
  stack,
  github,
  live,
  image,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<"email" | "password" | null>(
    null,
  );

  const primaryStack = useMemo(() => stack.slice(0, 6), [stack]);
  const extraStackCount = Math.max(0, stack.length - primaryStack.length);

  const copy = async (value: string, field: "email" | "password") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1100);
    } catch {
      // if clipboard is blocked, no-op (user can still select text)
      setCopiedField(null);
    }
  };

  return (
    <>
      <article className="relative">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-card/20 text-left shadow-[0_18px_55px_rgba(0,0,0,0.35)] backdrop-blur-xl transition",
            "hover:-translate-y-1 hover:border-white/15 hover:bg-card/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
          aria-label={`Open ${title} case study`}
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(520px_circle_at_25%_10%,rgba(59,130,246,0.22),transparent_55%)]" />
              <div className="absolute inset-0 opacity-80 mask-[linear-gradient(to_bottom,black,transparent_70%)] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-size-[22px_22px]" />
            </div>

            {image ? (
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/25 to-black/70" />
              </div>
            ) : (
              <div className="h-[220px] bg-white/5" />
            )}

            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="truncate text-xl font-semibold leading-tight text-foreground">
                    {title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
                    {description}
                  </p>
                </div>

                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90 transition group-hover:bg-white/10">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-2">
              {primaryStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground transition group-hover:bg-white/10"
                >
                  {tech}
                </span>
              ))}
              {extraStackCount > 0 && (
                <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                  +{extraStackCount}
                </span>
              )}
            </div>

            <div className="mt-5 grid gap-2 text-sm text-muted-foreground">
              {highlights.slice(0, 3).map((h) => (
                <div key={h} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                  <p className="leading-relaxed">{h}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {live && (
                <Button asChild className="rounded-xl">
                  <Link
                    href={live}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {github && (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <Link
                    href={github}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </Link>
                </Button>
              )}

              {demo && (
                <span className="ml-auto inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5 text-primary/90" />
                  Demo creds inside
                </span>
              )}
            </div>
          </div>
        </button>
      </article>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              aria-label="Close modal"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <div className="absolute inset-0 overflow-y-auto p-4 sm:p-6">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${title} case study`}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18, scale: 0.985 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 12, scale: 0.99 }
                }
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-background/80 shadow-[0_30px_120px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_5%,rgba(59,130,246,0.22),transparent_55%)]" />

                <div className="relative flex items-start justify-between gap-3 p-5 sm:p-6">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                      Case study
                    </div>
                    <h4 className="mt-3 truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                      {title}
                    </h4>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {description}
                    </p>
                  </div>

                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {image && (
                  <div className="relative mx-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:mx-6">
                    <div className="relative h-[220px] sm:h-[320px]">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/15 to-black/60" />
                    </div>
                  </div>
                )}

                <div className="relative grid gap-6 p-5 sm:p-6">
                  {demo && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold">Demo login</p>
                        <span className="text-xs text-muted-foreground">
                          Click to copy
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-background/40 px-3 py-2">
                          <div className="min-w-0">
                            <p className="text-[11px] text-muted-foreground">
                              Email
                            </p>
                            <p className="truncate text-sm">{demo.email}</p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                size="icon-sm"
                                variant="outline"
                                className="rounded-lg border-white/10 bg-white/5 hover:bg-white/10"
                                onClick={() => copy(demo.email, "email")}
                              >
                                {copiedField === "email" ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {copiedField === "email" ? "Copied" : "Copy"}
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-background/40 px-3 py-2">
                          <div className="min-w-0">
                            <p className="text-[11px] text-muted-foreground">
                              Password
                            </p>
                            <p className="truncate text-sm">{demo.password}</p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                size="icon-sm"
                                variant="outline"
                                className="rounded-lg border-white/10 bg-white/5 hover:bg-white/10"
                                onClick={() => copy(demo.password, "password")}
                              >
                                {copiedField === "password" ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {copiedField === "password" ? "Copied" : "Copy"}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold">Highlights</p>
                      <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                        {highlights.map((h) => (
                          <div key={h} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                            <p className="leading-relaxed">{h}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold">Stack</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Built for maintainability, performance, and safer
                        production releases.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {live && (
                      <Button asChild className="rounded-xl">
                        <Link href={live} target="_blank">
                          Live
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {github && (
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        <Link href={github} target="_blank">
                          <Github className="h-4 w-4" />
                          Source
                        </Link>
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-auto rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
