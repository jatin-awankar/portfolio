import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { FloatingTerminal } from "@/components/portfolio/FloatingTerminal";
import { StatusBar } from "@/components/portfolio/StatusBar";
import { TerminalDataProvider } from "@/components/portfolio/TerminalDataProvider";
import { IntroProvider } from "@/components/portfolio/IntroProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://jatinawankar.dev"),

  title: "Jatin Awankar | Full-Stack Engineer",

  description:
    "Full-stack engineer building AI-powered products and integrations.",

  applicationName: "Jatin Awankar Portfolio",
  authors: [{ name: "Jatin Awankar" }],
  creator: "Jatin Awankar",

  keywords: [
    "Jatin Awankar",
    "Software Engineer",
    "Full-Stack Engineer",
    "AI Products",
    "AI Integration",
    "Developer Tools",
    "Agent Evaluation",
    "Next.js",
    "PostgreSQL",
    "Multi-Tenant Systems",
  ],

  openGraph: {
    title: "Jatin Awankar | Full-Stack Engineer",
    description:
      "Full-stack engineer building AI-powered products and integrations.",
    url: "https://jatinawankar.dev",
    siteName: "Jatin Awankar",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Jatin Awankar | Full-Stack Engineer",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jatin Awankar | Full-Stack Engineer",
    description:
      "Full-stack engineer building AI-powered products and integrations.",
    images: ["/og.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-950 text-zinc-200 antialiased">
        <IntroProvider>
          <TerminalDataProvider>
            <div className="min-h-screen portfolio-shell">
              <StatusBar />
              <a href="#main-content" className="skip-link">
                Skip to content
              </a>
              <main
                id="main-content"
                className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:py-10"
              >
                {children}
              </main>
              <FloatingTerminal />
              <Analytics />
            </div>
          </TerminalDataProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
