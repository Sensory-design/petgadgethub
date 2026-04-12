import type { Metadata } from "next";

import { RentalResumeTool } from "@/components/rental-resume/RentalResumeTool";
import { getSiteOrigin } from "@/lib/siteUrl";

const base = getSiteOrigin().replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Pet Rental Resume",
  description:
    "Build a landlord-ready pet resume PDF and see illustrative UK cost benchmarks. For renters navigating the Renters' Rights Act 2025 (effective May 2026). Not legal advice.",
  alternates: { canonical: `${base}/tools/rental-resume` },
};

export default function RentalResumePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <RentalResumeTool />
    </div>
  );
}
