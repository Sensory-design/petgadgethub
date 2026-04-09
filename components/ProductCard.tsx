import Image from "next/image";
import Link from "next/link";

import { AffiliateLink } from "@/components/AffiliateLink";
import { buildProductUrl } from "@/lib/buildAffiliateUrl";
import type { AffiliateRegion } from "@/lib/affiliateTag";
import { amazonSocialProofLine } from "@/lib/formatAmazonSocialProof";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  region: AffiliateRegion;
  isFallback: boolean;
};

export function ProductCard({ product, region, isFallback }: Props) {
  const href = buildProductUrl(product.asin, region);
  const social = amazonSocialProofLine(product.rating, product.reviewCountApprox);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] bg-[var(--color-brand-50)]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-600)]">
          {product.category}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-[var(--color-ink)]">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            {product.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{product.tagline}</p>
        {social && (
          <p className="mt-2 text-xs text-[var(--color-brand-700)]">{social}</p>
        )}
        <p className="mt-3 text-sm font-medium leading-snug text-[var(--color-ink)]">
          Why we picked it: {product.whyWePicked}
        </p>
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[var(--color-ink)]">
          {product.problem}
        </p>
        <div className="mt-auto pt-6">
          <AffiliateLink
            href={href}
            className="w-full rounded-xl bg-[var(--color-brand-800)] px-4 py-3 text-sm text-white hover:bg-[var(--color-brand-600)]"
          >
            See it on Amazon &rarr;
          </AffiliateLink>
          {isFallback && (
            <p className="mt-2 text-center text-xs text-[var(--color-muted)]">
              We do not show live prices here. What you pay depends on Amazon at checkout.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
