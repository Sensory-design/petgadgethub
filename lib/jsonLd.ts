import type { AffiliateRegion } from "@/lib/affiliateTag";
import { buildProductUrl } from "@/lib/buildAffiliateUrl";
import type { Product } from "@/types/product";
import { getSiteOrigin } from "@/lib/siteUrl";

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
  const core: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.solution,
    image: product.imageSrc.startsWith("http")
      ? product.imageSrc
      : `${base}${product.imageSrc}`,
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
