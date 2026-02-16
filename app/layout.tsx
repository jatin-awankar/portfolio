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

  title: "Jatin Awankar | Backend-Focused Product Engineer",
  description:
    "Backend-focused product engineer building reliable SaaS systems with emphasis on concurrency handling, billing infrastructure, and failure-safe backend design.",

  applicationName: "Jatin Awankar Portfolio",
  authors: [{ name: "Jatin Awankar" }],
  creator: "Jatin Awankar",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },

  keywords: [
    "Jatin Awankar",
    "Backend Engineer",
    "Product Engineer",
    "SaaS Architecture",
    "Concurrency Handling",
    "Billing Systems",
    "Next.js Developer",
    "PostgreSQL",
    "System Design",
    "Multi-Tenant Applications",
  ],

  openGraph: {
    title: "Jatin Awankar | Backend-Focused Product Engineer",
    description:
      "Backend-focused product engineer building reliable SaaS systems with emphasis on concurrency handling, billing infrastructure, and failure-safe backend design.",
    url: "https://jatinawankar.dev",
    siteName: "Jatin Awankar",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jatin Awankar - Backend-Focused Product Engineer",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jatin Awankar | Backend-Focused Product Engineer",
    description:
      "Backend-focused product engineer building reliable SaaS systems with emphasis on concurrency handling, billing infrastructure, and failure-safe backend design.",
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
