import type { Metadata } from "next";
import Link from "next/link";

import { CategoryCard } from "@/components/CategoryCard";
import { breadcrumbLd } from "@/lib/jsonLd";
import { slugFromCategory } from "@/lib/categorySlug";
import { getProducts } from "@/lib/getProducts";
import { getSiteOrigin } from "@/lib/siteUrl";
import categoriesData from "@/data/categories.json";

export const metadata: Metadata = {
  title: "All picks by category",
  description:
    "Every PetGadgetHub product guide, browsable by category. Independent reviews with clear Amazon disclosures.",
  alternates: { canonical: `${getSiteOrigin().replace(/\/$/, "")}/categories` },
  openGraph: {
    title: "All picks by category — PetGadgetHub",
    description:
      "Every PetGadgetHub product guide, browsable by category. Independent reviews with clear Amazon disclosures.",
    type: "website",
  },
};

export default async function AllCategoriesPage() {
  const { products, updated } = await getProducts();

  const sortedLabels = [...new Set(products.map((p) => p.category))].sort();

  const categoryItems = sortedLabels.map((label) => {
    const slug = slugFromCategory(label);
    const categoryProducts = products.filter((p) => p.category === label);
    const topPick = categoryProducts[0];
    const intro =
      categoriesData.categories.find((c) => c.slug === slug)?.intro ??
      `PetGadgetHub picks for ${label.toLowerCase()}: honest reviews with Amazon disclosures.`;
    return { label, slug, count: categoryProducts.length, topPick, intro };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "All picks", path: "/categories" },
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
        <span className="text-[var(--color-ink)]">All picks</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
          Browse by category
        </h1>
        <p className="mt-3 text-[var(--color-muted)]">
          {products.length} guides across {sortedLabels.length} categories. Last updated {updated}.
          Pick a category below to see all our picks with honest pros, cons, and Amazon links.
        </p>
      </header>

      <section className="mt-12" aria-label="Product categories">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {categoryItems.map(({ label, slug, count, topPick, intro }) => (
            <CategoryCard
              key={slug}
              label={label}
              slug={slug}
              count={count}
              topPick={topPick}
              intro={intro}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
