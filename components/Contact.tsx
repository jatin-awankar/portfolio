import Link from "next/link";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

export default function Contact() {
  const socialLinks = [
    {
      id: 1,
      link: "mailto:jatinawankar02@gmail.com",
      icon: <Image src="/gmail.png" alt="Gmail" width={18} height={18} />,
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
      link: "https://github.com/jatin-awankar",
      icon: <Image src="/github.png" alt="Github" width={16} height={16} />,
      label: "Github",
    },
    {
      id: 4,
      link: "https://www.linkedin.com/in/jatin-awankar",
      icon: <Image src="/linkedin.png" alt="Linkedin" width={16} height={16} />,
      label: "LinkedIn",
    },
  ];

  return (
    <section className="mt-32 max-w-3xl text-start">
      <p className="mt-2 text-muted-foregound">
        Open to internship and full-time opportunities.
      </p>
      <div className="mt-4 flex flex-col lg:flex-row justify-between items-center gap-3">
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
      </div>
    </section>
  );
}
