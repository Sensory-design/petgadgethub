import type { Metadata } from "next";
import Link from "next/link";

import { GuideCard } from "@/components/GuideCard";
import { breadcrumbLd } from "@/lib/jsonLd";
import { getGuides } from "@/lib/getGuides";
import { getSiteOrigin } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "Guides & buying advice",
  description:
    "In-depth pet tech guides from PetGadgetHub: honest comparisons, buying tips, and real-world picks. No hype.",
  alternates: { canonical: `${getSiteOrigin().replace(/\/$/, "")}/guides` },
  openGraph: {
    title: "Guides & buying advice — PetGadgetHub",
    description:
      "In-depth pet tech guides from PetGadgetHub: honest comparisons, buying tips, and real-world picks. No hype.",
    type: "website",
  },
};

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
            ]),
          ),
        }}
      />
      <nav className="text-sm text-[var(--color-muted)]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-[var(--color-ink)]">Guides</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
          Guides &amp; buying advice
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-[var(--color-muted)]">
          Longer reads on the questions that matter most to pet owners — which tracker is worth the
          subscription, what to look for in a water fountain, whether that camera is useful or just
          expensive peace of mind.
        </p>
      </header>

      <section className="mt-12" aria-label="All guides">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </div>
  );
}
