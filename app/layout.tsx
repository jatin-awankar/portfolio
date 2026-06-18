import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { FloatingTerminal } from "@/components/portfolio/FloatingTerminal";
import { StatusBar } from "@/components/portfolio/StatusBar";
import { TerminalDataProvider } from "@/components/portfolio/TerminalDataProvider";
import { ContextMenu } from "@/components/portfolio/ContextMenu";
import { IntroProvider } from "@/components/portfolio/IntroProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://jatinawankar.dev"),

  title: "Jatin Awankar | Full-Stack SaaS & MVP Developer",

  description:
    "I build scalable MVPs and SaaS products with clean backend systems, real-time features, and production-ready architecture.",

  applicationName: "Jatin Awankar Portfolio",
  authors: [{ name: "Jatin Awankar" }],
  creator: "Jatin Awankar",

  keywords: [
    "Jatin Awankar",
    "Software Engineer",
    "Scalable Systems",
    "SaaS Architecture",
    "System Design",
    "Concurrency",
    "Backend Engineering",
    "Next.js",
    "PostgreSQL",
    "Multi-Tenant Systems",
  ],

  openGraph: {
    title: "Jatin Awankar | Full-Stack SaaS & MVP Developer",
    description:
      "I build scalable MVPs and SaaS products with clean backend systems, real-time features, and production-ready architecture.",
    url: "https://jatinawankar.dev",
    siteName: "Jatin Awankar",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jatin Awankar | Full-Stack SaaS & MVP Developer",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jatin Awankar | Full-Stack SaaS & MVP Developer",
    description:
      "I build scalable MVPs and SaaS products with clean backend systems, real-time features, and production-ready architecture.",
    images: ["/og.png"],
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
          {" "}
          {/* ← wrap here */}
          <TerminalDataProvider>
            <div className="min-h-screen bg-[radial-gradient(...)]">
              <StatusBar />
              <main className="mx-auto max-w-6xl space-y-6 px-4 py-10">
                {children}
              </main>
              <FloatingTerminal />
              <ContextMenu />
              <Analytics />
            </div>
          </TerminalDataProvider>
        </IntroProvider>{" "}
        {/* ← close here */}
      </body>
    </html>
  );
}
