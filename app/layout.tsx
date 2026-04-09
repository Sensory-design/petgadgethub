import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { CookieBanner } from "@/components/CookieBanner";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PetGadgetHub - Practical pet tech that fits real life",
    template: "%s | PetGadgetHub",
  },
  description:
    "Problem-first guides to pet tech: hydration, safety, walks, and home life. Clear writing, no hype, and transparent Amazon affiliate disclosures.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="min-h-screen font-sans">
        <DisclosureBanner />
        <SiteHeader />
        <main>{children}</main>
        <CookieBanner />
        <SiteFooter />
      </body>
    </html>
  );
}
