import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { CookieBanner } from "@/components/CookieBanner";
import { DisclosureBanner } from "@/components/DisclosureBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getMetadataBase } from "@/lib/siteUrl";

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
  metadataBase: getMetadataBase(),
  keywords: [
    "pet tech",
    "pet gadgets",
    "best pet camera",
    "automatic pet feeder",
    "GPS dog tracker",
    "pet water fountain",
    "biodegradable dog poop bags",
    "pet hair remover",
  ],
  openGraph: {
    type: "website",
    siteName: "PetGadgetHub",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    site: "@petgadgethub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="MpdFmMN2iGgYOMnT6E8PPexqUHFclY7UQ6UQYf63X1s"
        />
      </head>
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
