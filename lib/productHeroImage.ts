import type { Product } from "@/types/product";

/** Hero image for cards, product pages, and JSON-LD: PA-API image when set, else editorial placeholder. */
export function productHeroImageSrc(product: Product): string {
  return product.amazonImageUrl ?? product.imageSrc;
}
