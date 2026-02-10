import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Analytics } from "@vercel/analytics/next";
// import Navbar from "@/components/Navbar";

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

  title: "Jatin Awankar | Full-Stack Developer",
  description:
    "Full-stack developer building production-grade web applications with a focus on scalability, clean architecture, and real-world engineering constraints.",

  applicationName: "Jatin Awankar Portfolio",
  authors: [{ name: "Jatin Awankar" }],
  creator: "Jatin Awankar",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },

  keywords: [
    "Jatin Awankar",
    "portfolio",
    "Full Stack Developer",
    "Next.js Developer",
    "Software Engineer",
    "Web Developer Portfolio",
    "SaaS Applications",
    "System Design",
    "Real Time Applications",
    "Map Based Applications",
    "Authentication Systems",
    "Production Grade Applications",
  ],

  openGraph: {
    title: "Jatin Awankar | Full-Stack Developer",
    description:
      "Full-stack developer building production-grade web applications with a focus on scalability, clean architecture, and real-world engineering constraints.",
    url: "https://jatinawankar.dev",
    siteName: "Jatin Awankar",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jatin Awankar - Full-Stack Developer",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jatin Awankar | Full-Stack Developer",
    description:
      "Full-stack developer building production-grade web applications with a focus on scalability, clean architecture, and real-world engineering constraints.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${geistMono.variable} antialiased`}
      >
        <BackgroundWrapper>
          {/* <Navbar /> */}
          {children}
          <Analytics />
        </BackgroundWrapper>
      </body>
    </html>
  );
}
