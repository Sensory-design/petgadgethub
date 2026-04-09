import type { AffiliateRegion } from "@/lib/affiliateTag";
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
  const amazonHost = region === "uk" ? "amazon.co.uk" : "amazon.com";
  return {
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
      url: `https://www.${amazonHost}/dp/${product.asin}`,
      seller: { "@type": "Organization", name: "Amazon" },
      priceCurrency: region === "uk" ? "GBP" : "USD",
    },
  };
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
