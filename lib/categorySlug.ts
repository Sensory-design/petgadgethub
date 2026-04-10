/** URL slug for a product category label (matches data/products.json `category` field). */
export function slugFromCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Reverse: slug -> display label when valid. */
export function labelFromSlug(slug: string, validLabels: string[]): string | null {
  const found = validLabels.find((c) => slugFromCategory(c) === slug);
  return found ?? null;
}
