import type { Metadata } from "next";
import Link from "next/link";

import { AuthorBlock } from "@/components/AuthorBlock";
import { CategoryNav } from "@/components/CategoryNav";
import { GuideCard } from "@/components/GuideCard";
import { ProductGrid } from "@/components/ProductGrid";
import { organizationLd, websiteLd } from "@/lib/jsonLd";
import { slugFromCategory } from "@/lib/categorySlug";
import { getGuides } from "@/lib/getGuides";
import { getProducts } from "@/lib/getProducts";
import { getAffiliateRegion } from "@/lib/regionFromRequest";
import { getSiteOrigin } from "@/lib/siteUrl";

const HOMEPAGE_PICKS = 9;

const siteBase = getSiteOrigin().replace(/\/$/, "");

export const metadata: Metadata = {
  alternates: { canonical: siteBase },
  openGraph: { url: siteBase },
};

export default async function HomePage() {
  const [{ products, isFallback, updated }, region, guides] = await Promise.all([
    getProducts(),
    getAffiliateRegion(),
    getGuides(),
  ]);

  const categoryNavItems = [...new Set(products.map((p) => p.category))]
    .sort()
    .map((label) => ({ slug: slugFromCategory(label), label }));

  const featuredProducts = products.slice(0, HOMEPAGE_PICKS);
  const guideTeaser = guides.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd()) }}
      />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-600)]">
          Pet tech, explained for humans
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Honest picks for the cat who ignores the water bowl, the dog who found a hole in the fence,
          and the sofa that grew fur overnight.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
          You are not here for a spec sheet. You are here because something specific is going wrong
          at home. Each guide names that problem first, then points to gear that usually helps. We
          earn from Amazon affiliate links and say so up front - no fake review voice, no list of 47
          random products.
        </p>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Last updated {updated}.{" "}
          {isFallback
            ? "We are not displaying live prices while we rely on static product data."
            : "Pricing comes from Amazon when available."}
        </p>
      </header>

      <section className="mt-12 rounded-2xl border border-[var(--color-brand-200)] bg-[var(--color-brand-50)] p-8 sm:p-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          Not sure where to start?
        </h2>
        <p className="mt-3 text-[var(--color-muted)]">
          Take a 30-second quiz and we&rsquo;ll point you to the right gear. No sign-up, no data
          stored.
        </p>
        <p className="mt-5">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--color-brand-800)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-600)]"
          >
            See all quizzes &rarr;
          </Link>
        </p>
      </section>

      <div className="mt-12 max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-600)]">
          Browse by category
        </p>
        <div className="mt-4">
          <CategoryNav categories={categoryNavItems} />
        </div>
      </div>

      <section id="picks" className="mt-16 scroll-mt-24" aria-labelledby="picks-heading">
        <h2
          id="picks-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]"
        >
          Top picks right now
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted)]">
          A short list of what we would buy first. Full guides live on each product page.
        </p>
        <div className="mt-10">
          <ProductGrid products={featuredProducts} region={region} isFallback={isFallback} />
        </div>
        <p className="mt-10">
          <Link
            href="/categories"
            className="text-sm font-semibold text-[var(--color-brand-800)] underline-offset-4 hover:underline"
          >
            See all {products.length} picks
          </Link>
        </p>
      </section>

      {guideTeaser.length > 0 && (
        <section className="mt-20" aria-labelledby="guides-teaser-heading">
          <h2
            id="guides-teaser-heading"
            className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]"
          >
            From the guides
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--color-muted)]">
            Longer reads on trackers, fountains, cameras, and what actually matters before you buy.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {guideTeaser.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
          <p className="mt-10">
            <Link
              href="/guides"
              className="text-sm font-semibold text-[var(--color-brand-800)] underline-offset-4 hover:underline"
            >
              See all guides
            </Link>
          </p>
        </section>
      )}

      <section className="mt-20 max-w-3xl">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          Why this site exists
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
          PetGadgetHub exists because most review sites dump dozens of affiliate links and call it
          research. Here you get one problem, one straight answer, and one clear link to Amazon when
          you are ready. Affiliate income pays for hosting and time - it does not buy a spot on the
          page. If we link to something, it is because we think it solves a real headache.
        </p>
      </section>

      <div className="mt-14 max-w-2xl">
        <AuthorBlock />
      </div>
    </div>
  );
}
