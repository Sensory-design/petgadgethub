import { ProductCard } from "@/components/ProductCard";
import type { AffiliateRegion } from "@/lib/affiliateTag";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
  region: AffiliateRegion;
  isFallback: boolean;
};

export function ProductGrid({ products, region, isFallback }: Props) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} region={region} isFallback={isFallback} />
      ))}
    </div>
  );
}
