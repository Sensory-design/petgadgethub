import type { AffiliateRegion } from "@/lib/affiliateTag";
import { buildProductUrl } from "@/lib/buildAffiliateUrl";
import type { Product } from "@/types/product";
import { getSiteOrigin } from "@/lib/siteUrl";
import { productHeroImageSrc } from "@/lib/productHeroImage";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PetGadgetHub",
    url: getSiteOrigin(),
    description:
      "Problem-first guides to pet tech: hydration, safety, walks, and home life.",
    email: "petgadgethub@protonmail.com",
  };
}

export function websiteLd() {
  const base = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PetGadgetHub",
    url: base,
  };
}

export function productLd(product: Product, region: AffiliateRegion) {
  const base = getSiteOrigin();
  const hero = productHeroImageSrc(product);
  const core: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.solution,
    image: hero.startsWith("http") ? hero : `${base}${hero}`,
    url: `${base}/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: buildProductUrl(product.asin, region),
      seller: { "@type": "Organization", name: "Amazon" },
      priceCurrency: region === "uk" ? "GBP" : "USD",
    },
  };

  if (product.score != null) {
    core.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.score,
      bestRating: 10,
      worstRating: 1,
      reviewCount: product.reviewCountApprox ?? 1,
    };
    core.review = [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: product.score,
          bestRating: 10,
          worstRating: 1,
        },
        author: { "@type": "Organization", name: "PetGadgetHub" },
        reviewBody: product.verdict ?? product.whyWePicked,
      },
    ];
  }

  return core;
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  const base = getSiteOrigin().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  };
}

export function collectionPageLd(
  label: string,
  slug: string,
  products: Product[],
) {
  const base = getSiteOrigin().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label} picks — PetGadgetHub`,
    url: `${base}/categories/${slug}`,
    description: `PetGadgetHub guides: ${label.toLowerCase()} gear we recommend, with honest pros and cons.`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${base}/products/${p.slug}`,
        name: p.title,
      })),
    },
  };
}
