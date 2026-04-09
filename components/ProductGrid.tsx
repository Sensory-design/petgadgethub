import { ProductCard } from "@/components/ProductCard";
import type { AffiliateRegion } from "@/lib/affiliateTag";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
  region: AffiliateRegion;
  isFallback: boolean;
};

export function ProductGrid({ products, region, isFallback }: Props) {
  if (products.length === 0) return null;
  const [first, second, ...rest] = products;

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
      <div className={products.length > 1 ? "xl:col-span-2" : "xl:col-span-3"}>
        <ProductCard
          product={first}
          region={region}
          isFallback={isFallback}
          featured
        />
      </div>
      {second && (
        <div className="xl:col-span-1">
          <ProductCard product={second} region={region} isFallback={isFallback} />
        </div>
      )}
      {rest.map((p) => (
        <div key={p.slug} className="xl:col-span-1">
          <ProductCard product={p} region={region} isFallback={isFallback} />
        </div>
      ))}
    </div>
  );
}
