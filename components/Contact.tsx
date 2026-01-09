import Link from "next/link";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

export default function Footer() {
  const socialLinks = [
    {
      id: 1,
      link: "mailto:jatinawankar02@gmail.com",
      icon: "/gmail.png",
      label: "Email",
    },
    {
      id: 2,
      link: "https://github.com/jatin-awankar",
      icon: "/github.png",
      label: "GitHub",
    },
    {
      id: 3,
      link: "https://www.linkedin.com/in/jatin-awankar",
      icon: "/linkedin.png",
      label: "LinkedIn",
    },
    {
      id: 4,
      link: "https://x.com/awankar_jay",
      icon: "/twitter.png",
      label: "X",
    },
  ];

  return (
    <footer className="mt-32 max-w-3xl border-t border-border pt-6 text-start">
      <p className="text-sm text-muted-foreground">
        Open to internship and full-time opportunities.
      </p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground opacity-70">
          © {new Date().getFullYear()} Jatin Kishor Awankar
        </p>

        <div className="flex gap-6">
          {socialLinks.map((social) => (
            <Tooltip key={social.id}>
              <TooltipTrigger asChild>
                <Button asChild variant="link" className="p-0">
                  <Link
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Image
                      src={social.icon}
                      alt={social.label}
                      width={social.label === "Email"? 18 : social.label === "X"? 14 : 16}
                      height={social.label === "Email"? 18 : social.label === "X"? 14 : 16}
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
    </footer>
  );
}
