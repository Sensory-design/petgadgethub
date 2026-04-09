import { AuthorBlock } from "@/components/AuthorBlock";
import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/lib/getProducts";
import { getAffiliateRegion } from "@/lib/regionFromRequest";

export default async function HomePage() {
  const [{ products, isFallback, updated }, region] = await Promise.all([
    getProducts(),
    getAffiliateRegion(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-600)]">
          Pet tech, explained for humans
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Find gear that matches the messiness of real pet life.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
          Most product pages shout features. We start with the awkward truth: the spilled water bowl,
          the surprise escape, the sofa that mysteriously grew fur. Then we suggest something that
          usually helps - with clear affiliate disclosures and no fake review voice.
        </p>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Last updated {updated}.{" "}
          {isFallback
            ? "We are not displaying live prices while we rely on static product data."
            : "Pricing comes from Amazon when available."}
        </p>
      </header>

      <section id="picks" className="mt-16 scroll-mt-24" aria-labelledby="picks-heading">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="picks-heading"
            className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]"
          >
            Problem-solution matchups
          </h2>
          <p className="text-sm text-[var(--color-muted)]">
            {region === "uk" ? "Links use our Amazon.co.uk tag." : "Links use our Amazon.com tag."}
          </p>
        </div>
        <div className="mt-10">
          <ProductGrid products={products} region={region} isFallback={isFallback} />
        </div>
      </section>

      <section className="mt-20 max-w-3xl">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          Why this site exists
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--color-ink)]">
          Buying pet tech online is easy. Buying the right item on the first try is not. PetGadgetHub
          is a small editorial project: fewer products, clearer context, and writing that sounds like
          something you would tell a friend - not a catalogue.
        </p>
      </section>

      <div className="mt-14 max-w-2xl">
        <AuthorBlock />
      </div>
    </div>
  );
}
