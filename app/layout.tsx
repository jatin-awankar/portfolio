import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jatinawankar.dev"),

  title: "Jatin Awankar | Full-Stack SaaS & MVP Developer",

  description:
    "I build scalable MVPs and SaaS products with clean backend systems, real-time features, and production-ready architecture.",

  applicationName: "Jatin Awankar Portfolio",
  authors: [{ name: "Jatin Awankar" }],
  creator: "Jatin Awankar",

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },

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
      <body
        className={`${poppins.className} ${geistMono.variable} editorial-body antialiased`}
      >
        <ThemeProvider>
          <BackgroundWrapper>
            <Navbar />
            {children}
            <Analytics />
          </BackgroundWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
