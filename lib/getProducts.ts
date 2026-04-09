import { readFile } from "fs/promises";
import path from "path";

import { productsFileSchema, type Product } from "@/types/product";

export type ProductsResult = {
  products: Product[];
  isFallback: boolean;
  updated: string;
};

async function loadLocalJson(): Promise<ProductsResult> {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const raw = await readFile(filePath, "utf8");
  const parsed = productsFileSchema.parse(JSON.parse(raw));
  return {
    products: parsed.products,
    isFallback: true,
    updated: parsed.updated,
  };
}

/**
 * Waterfall: Creators API ? local JSON. If API is missing or returns 403, use fallback.
 * Until you have API access, this always returns local data with isFallback: true.
 */
export async function getProducts(): Promise<ProductsResult> {
  const base = process.env.AMAZON_CREATORS_API_BASE;
  const key = process.env.AMAZON_CREATORS_API_KEY;

  if (!base || !key) {
    return loadLocalJson();
  }

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/products`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: 3600 },
    });

    if (res.status === 403 || !res.ok) {
      return loadLocalJson();
    }

    const body = await res.json();
    const parsed = productsFileSchema.safeParse(body);
    if (!parsed.success) {
      return loadLocalJson();
    }

    return {
      products: parsed.data.products,
      isFallback: false,
      updated: parsed.data.updated,
    };
  } catch {
    return loadLocalJson();
  }
}
