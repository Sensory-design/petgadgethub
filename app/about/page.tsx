import type { Metadata } from "next";

import { AuthorBlock } from "@/components/AuthorBlock";

export const metadata: Metadata = {
  title: "About",
  description:
    "How PetGadgetHub chooses products, discloses affiliate relationships, and writes for readers first.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
        How we work
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
        PetGadgetHub is built around one idea: readers should understand the problem before they see
        a product name. If we cannot explain who a pick is for (and who it is not for), we should not
        recommend it.
      </p>
      <p className="mt-4 text-sm text-[var(--color-muted)]">
        Contact:{" "}
        <a className="underline underline-offset-2" href="mailto:petgadgethub@protonmail.com">
          petgadgethub@protonmail.com
        </a>
      </p>

      <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        Affiliate relationships
      </h2>
      <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
        We participate in the Amazon Associates programme. When you purchase qualifying items through
        our links, we may earn a commission at no extra cost to you. That relationship does not change
        our editorial approach: we still choose products we would recommend even without a link.
      </p>

      <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        Pricing and availability
      </h2>
      <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
        Prices change. Stock changes. When we cannot reliably sync live data, we hide price displays
        and point you to Amazon for current details. That keeps the site honest and avoids showing
        stale numbers beside a buy button.
      </p>

      <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        Originality
      </h2>
      <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
        You will not find copy-paste spec lists here. Every page is written to add context: what
        breaks in real homes, what owners usually misunderstand, and what a product can (and cannot)
        fix.
      </p>

      <div className="mt-14">
        <AuthorBlock />
      </div>
    </div>
  );
}
