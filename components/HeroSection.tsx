"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import useSound from "use-sound";
import { DottedMap } from "./ui/dotted-map";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: "easeOut" },
  },
};

export default function HeroSection() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [play] = useSound("/sound/ZapFlip.wav", { volume: 0.8 });

  const handleFlip = () => {
    play();
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid items-start gap-8 text-left lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.62fr)] lg:gap-10"
    >
      <div className="order-2 flex flex-col gap-6 lg:order-1">
        <motion.div
          variants={itemVariants}
          className="inline-flex w-fit items-center rounded-full border border-border/75 bg-card/40 px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground"
        >
          Software Engineering
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="max-w-3xl text-[2.15rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.85rem] lg:text-[3.15rem]"
        >
          I build scalable MVPs & SaaS products for startups
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          From idea to production &mdash; fast, reliable, and built to scale. I
          help founders launch products with clean backend systems, real-time
          features, and architecture that won&apos;t break as you grow.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <Button
            asChild
            size="lg"
            className="h-11 rounded-xl px-6 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Link href="#contact">
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 rounded-xl border-border/85 bg-card/30 px-6 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Link href="#projects">View Work</Link>
          </Button>
        </motion.div>
      </div>

      <motion.aside variants={itemVariants} className="order-1 lg:order-2">
        <div className="group h-48 perspective-[1000px]">
          <motion.div
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 360,
              damping: 20,
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative h-full w-full rounded-3xl border border-border/80 bg-card/38 shadow-lg"
          >
            {/* Front Side */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0 h-full w-full p-5"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-3xl border border-border/85 bg-background/70 p-1.5 shadow-inner">
                  <Image
                    src="/my-profile.jpg"
                    alt="Jatin"
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-xl object-cover"
                    priority
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Jatin Awankar
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Full-Stack SaaS Developer
                  </p>
                </div>
              </div>

              <div className="flex flex-row justify-between mt-6">
                <div className="flex items-center gap-2.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="https://github.com/jatin-awankar"
                        target="_blank"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/55 text-muted-foreground transition-colors duration-200 hover:bg-accent/55 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>GitHub</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="https://www.linkedin.com/in/jatin-awankar"
                        target="_blank"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/55 text-muted-foreground transition-colors duration-200 hover:bg-accent/55 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <button
                  onClick={handleFlip}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/55 hover:bg-accent/55 transition-colors"
                >
                  @
                </button>
              </div>
            </div>

            {/* Back Side */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="absolute inset-0 h-full w-full rounded-3xl overflow-hidden"
            >
              <div className="relative h-full w-full">
                {isFlipped && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.5 }}
                    className="absolute inset-0 p-2"
                  >
                    <DottedMap
                      dotRadius={0.2}
                      markers={[
                        {
                          lat: 21,
                          lng: 78,
                          pulse: true,
                          dotColor: "white",
                          size: 1.8,
                        },
                      ]}
                    />
                  </motion.div>
                )}

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-xs font-medium uppercase tracking-widest">
                    Available for Remote Work
                  </p>
                  <p className="mt-1 text-[10px]">Based in India</p>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents accidental double-triggers
                      handleFlip();
                    }}
                    className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/55 hover:bg-accent/55 transition-colors"
                  >
                    @
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </motion.section>
  );
}
