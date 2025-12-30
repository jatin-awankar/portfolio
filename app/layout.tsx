import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import BackgroundWrapper from "@/components/BackgroundWrapper";
// import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jatin Awankar | Full-Stack Developer",
  description: "Full-stack developer building production-grade web applications with a focus on scalability, clean architecture, and real-world engineering constraints.",

  openGraph: {
    title: "Jatin Awankar | Full-Stack Developer",
    description:
      "Full-stack developer building production-grade web applications with a focus on scalability, clean architecture, and real-world engineering constraints.",
    url: "https://jatin-awankar.netlify.app/",
    siteName: "Jatin Awankar Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jatin Awankar - Full-Stack Developer",
      },
    ],
    locale: "en_US",
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
        className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundWrapper>
          {/* <Navbar /> */}
          {children}
        </BackgroundWrapper>
      </body>
    </html>
  );
}
