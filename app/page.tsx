import { AuthorBlock } from "@/components/AuthorBlock";
import { ProductGrid } from "@/components/ProductGrid";
import { organizationLd, websiteLd } from "@/lib/jsonLd";
import { getProducts } from "@/lib/getProducts";
import { getAffiliateRegion } from "@/lib/regionFromRequest";

export default async function HomePage() {
  const [{ products, isFallback, updated }, region] = await Promise.all([
    getProducts(),
    getAffiliateRegion(),
  ]);

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

      <section id="picks" className="mt-16 scroll-mt-24" aria-labelledby="picks-heading">
        <h2
          id="picks-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]"
        >
          What we are recommending right now
        </h2>
        <div className="mt-10">
          <ProductGrid products={products} region={region} isFallback={isFallback} />
        </div>
      </section>

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
