import type { Metadata } from "next";
import { Suspense } from "react";

import { getSiteOrigin } from "@/lib/siteUrl";

import { InternalLoginForm } from "./InternalLoginForm";

const base = getSiteOrigin().replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Internal login",
  robots: { index: false, follow: false },
  alternates: { canonical: `${base}/internal/login` },
};

export default function InternalLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-16 text-sm text-[var(--color-muted)] sm:px-6">
          Loading...
        </div>
      }
    >
      <InternalLoginForm />
    </Suspense>
  );
}
