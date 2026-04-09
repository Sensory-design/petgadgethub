import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How PetGadgetHub handles data, cookies, and affiliate disclosures in line with common UK/EU expectations.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-[var(--color-muted)]">Last updated: 9 April 2026</p>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          Who we are
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
          PetGadgetHub is an editorial website that recommends pet-related products and may earn
          commissions through the Amazon Associates programme. This page explains what we collect,
          why, and what choices you have.
        </p>
        <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
          Contact:{" "}
          <a className="font-medium underline underline-offset-2" href="mailto:petgadgethub@protonmail.com">
            petgadgethub@protonmail.com
          </a>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          Affiliate disclosure
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
          Some links on this site are affiliate links. If you click an affiliate link and make a
          qualifying purchase, we may earn a commission at no extra cost to you. Amazon and the
          Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. We are not employed by
          Amazon.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          Cookies and similar technologies
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
          We may use cookies and local storage for essential functions, including remembering your
          region (for correct Amazon store links) and whether you have dismissed the cookie notice.
          If we add analytics or marketing tools later, we will update this policy and, where
          required, ask for your consent before non-essential cookies are set.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          Data we process
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
          When you browse this site, our hosting provider (for example Vercel) may process technical
          data such as IP address, user agent, and request logs for security and reliability. We do
          not use this site to collect names, postal addresses, or payment details - purchases happen
          on Amazon’s checkout, under Amazon’s terms and privacy notice.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          Your rights
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
          Depending on where you live, you may have rights to access, correct, or delete personal
          data, and to object to certain processing. If you have a privacy question or request,
          contact us using the details we publish on this site when available. We will respond within
          a reasonable time.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          Changes
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
          We may update this policy from time to time. The “Last updated” date at the top will change
          when we do.
        </p>
      </section>

      <p className="mt-12 text-sm text-[var(--color-muted)]">
        <Link href="/" className="underline underline-offset-2">
          Back to home
        </Link>
      </p>
    </div>
  );
}
