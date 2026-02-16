"use client";

import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  const socialLinks = [
    {
      id: 1,
      link: "https://github.com/jatin-awankar",
      icon: "/github.png",
      label: "GitHub",
    },
    {
      id: 2,
      link: "https://www.linkedin.com/in/jatin-awankar",
      icon: "/linkedin.png",
      label: "LinkedIn",
    },
    {
      id: 3,
      link: "https://x.com/awankar_jay",
      icon: "/twitter.png",
      label: "X",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-6 flex flex-col gap-6"
    >
      <div className="flex justify-between">
        <Image
          src="/my-profile.jpg"
          alt="Jatin Awankar"
          width={120}
          height={120}
          quality={75}
          className="rounded-2xl object-cover"
          priority
        />
        <div className="flex flex-row justify-between gap-2 md:gap-4">
          {socialLinks.map((social) => (
            <Tooltip key={social.id}>
              <TooltipTrigger asChild>
                <Button asChild variant="link">
                  <Link
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Image
                      src={social.icon}
                      alt={social.label}
                      width={18}
                      height={18}
                      className="opacity-70 hover:opacity-100 transition"
                    />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{social.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="text-start flex flex-col">
        <h1 className="text-3xl font-semibold">Jatin Awankar</h1>
        <p className="text-muted-foreground">
          Product Engineer — Backend Systems
        </p>
      </div>
      <p className="text-start text-muted-foreground font-light text-base sm:text-lg leading-relaxed">
        I design and ship production-focused SaaS systems —
        <br /> solving real problems around data integrity, concurrency, and
        system reliability. constraints.
      </p>
      <div className="text-start flex gap-4">
        <Link
          href="#projects"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          View Projects
        </Link>

        <Link
          href="/Jatin_Awankar_Resume.pdf"
          target="_blank"
          className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-card transition"
        >
          Resume
        </Link>
      </div>
    </motion.section>
  );
};

export default HeroSection;
