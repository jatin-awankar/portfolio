import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

const HeroSection = () => {
  const socialLinks = [
    {
      id: 1,
      link: "https://x.com/awankar_jay",
      icon: <Image src="/twitter.png" alt="X" width={18} height={18} />,
      label: "X",
    },
    {
      id: 2,
      link: "https://github.com/jatin-awankar",
      icon: <Image src="/github.png" alt="X" width={18} height={18} />,
      label: "Github",
    },
    {
      id: 3,
      link: "https://www.linkedin.com/in/jatin-awankar",
      icon: <Image src="/linkedin.png" alt="X" width={18} height={18} />,
      label: "LinkedIn",
    },
  ];

  return (
    <section className="mb-6 flex flex-col gap-6">
      <div className="flex flex-row justify-between">
        <Image
          src="/my-profile.jpg"
          alt="my-profile"
          width={120}
          height={120}
          quality={75}
          style={{ objectFit: "contain", borderRadius: "20px" }}
        />
        <div className="flex flex-row justify-between gap-2 md:gap-4">
          {socialLinks.map((socialMedia) => (
            <Tooltip key={socialMedia.id}>
              <TooltipTrigger asChild>
                <Button variant="link">
                  <Link
                    href={socialMedia.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {socialMedia.icon}
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{socialMedia.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="text-start flex flex-col">
        <span className="text-3xl font-semibold">Hi! I&apos;m Jatin</span>
        <span className="text-muted-foreground">
          21, Amravati | Full Stack Developer
        </span>
      </div>
      <div className="text-start text-muted-foreground font-light text-base sm:text-lg leading-relaxed">
        I build production-grade web applications
        <br /> with a focus on scalability, clean architecture, and real-world
        constraints.
      </div>
      <div className="text-start flex gap-4">
        <Link
          href="#projects"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          View Projects
        </Link>

        <Link
          href="/jatinresume.pdf"
          target="_blank"
          className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-card transition"
        >
          Resume
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
