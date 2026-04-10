import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGrid } from "@/components/ProductGrid";
import { breadcrumbLd, collectionPageLd } from "@/lib/jsonLd";
import { labelFromSlug, slugFromCategory } from "@/lib/categorySlug";
import { getProducts } from "@/lib/getProducts";
import { getAffiliateRegion } from "@/lib/regionFromRequest";
import { getSiteOrigin } from "@/lib/siteUrl";
import categoriesData from "@/data/categories.json";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const { products } = await getProducts();
  const labels = [...new Set(products.map((p) => p.category))];
  return labels.map((c) => ({ category: slugFromCategory(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const { products } = await getProducts();
  const labels = [...new Set(products.map((p) => p.category))];
  const label = labelFromSlug(slug, labels);
  if (!label) return {};
  const base = getSiteOrigin().replace(/\/$/, "");
  const description = `PetGadgetHub guides: ${label.toLowerCase()} gear we recommend, with honest pros and cons.`;
  return {
    title: `${label} picks`,
    description,
    alternates: { canonical: `${base}/categories/${slug}` },
    openGraph: {
      title: `${label} picks — PetGadgetHub`,
      description,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${label} picks — PetGadgetHub`, description },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const [{ products, isFallback, updated }, region] = await Promise.all([
    getProducts(),
    getAffiliateRegion(),
  ]);

  const labels = [...new Set(products.map((p) => p.category))];
  const label = labelFromSlug(slug, labels);
  if (!label) notFound();

  const filtered = products.filter((p) => p.category === label);
  const categoryIntro =
    categoriesData.categories.find((c) => c.slug === slug)?.intro ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "All picks", path: "/categories" },
              { name: label, path: `/categories/${slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageLd(label, slug, filtered)),
        }}
      />
      <nav className="text-sm text-[var(--color-muted)]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <Link href="/categories" className="hover:underline">
          All picks
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-[var(--color-ink)]">{label}</span>
      </nav>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
        {label}
      </h1>
      {categoryIntro && (
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
          {categoryIntro}
        </p>
      )}
      <p className="mt-3 text-sm text-[var(--color-muted)]">
        {filtered.length} guide{filtered.length === 1 ? "" : "s"}. Last updated {updated}.
      </p>
      <div className="mt-10">
        <ProductGrid products={filtered} region={region} isFallback={isFallback} />
      </div>
    </div>
  );
}
