import Section from "./MotionSectionWrapper";
import Link from "next/link";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

export default function Contact() {
  const socialLinks = [
    {
      id: 1,
      link: "mailto:jatinawankar02@gmail.com",
      icon: <Image src="/mail.png" alt="X" width={18} height={18} />,
      label: "Gmail",
    },
    {
      id: 2,
      link: "https://x.com/awankar_jay",
      icon: <Image src="/twitter.png" alt="X" width={14} height={14} />,
      label: "X",
    },
    {
      id: 3,
      link: "https://github.com/jay-awankar",
      icon: <Image src="/github.png" alt="X" width={14} height={14} />,
      label: "Github",
    },
    {
      id: 4,
      link: "https://www.linkedin.com/in/jatin-awankar",
      icon: <Image src="/linkedin.png" alt="X" width={14} height={14} />,
      label: "LinkedIn",
    },
  ];

  return (
    <Section className="mt-32 max-w-3xl text-start">
      {/* <h3 className="text-lg font-medium">
        Contact
      </h3> */}

      <p className="mt-2 text-muted-foregound">
        Open to internship and full-time opportunities.
      </p>
      <div className="mt-4 flex flex-col lg:flex-row justify-between gap-3">
        <p className="text-sm text-accent font-light opacity-70">Jatin Kishor Awankar</p>
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
        {/* <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link
          href="mailto:your.email@example.com"
          className="rounded-lg border border-border px-4 py-2 hover:bg-card transition"
        >
          Email
        </Link>

        <Link
          href="https://github.com/yourusername"
          target="_blank"
          className="rounded-lg border border-border px-4 py-2 hover:bg-card transition"
        >
          GitHub
        </Link>

        <Link
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          className="rounded-lg border border-border px-4 py-2 hover:bg-card transition"
        >
          LinkedIn
        </Link>
      </div> */}
      </div>
    </Section>
  );
}
