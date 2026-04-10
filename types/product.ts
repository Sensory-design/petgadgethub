import { z } from "zod";

export const productSchema = z.object({
  slug: z.string().min(1),
  asin: z.string().length(10),
  title: z.string().min(1),
  tagline: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  honestNote: z.string().optional(),
  category: z.string().min(1),
  /** Editorial fallback when `amazonImageUrl` is unset (Unsplash/Pexels). */
  imageSrc: z.string().min(1),
  /** Amazon CDN hero from PA-API `Images.Primary.Large` when populated (optional). */
  amazonImageUrl: z.string().url().optional(),
  imageAlt: z.string().min(1),
  whyWePicked: z.string().min(1),
  rating: z.number().min(1).max(5).optional(),
  reviewCountApprox: z.number().int().positive().optional(),
  faq: z
    .array(z.object({ q: z.string().min(1), a: z.string().min(1) }))
    .optional(),
  score: z.number().int().min(1).max(10).optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  verdict: z.string().optional(),
});

export const productsFileSchema = z.object({
  updated: z.string(),
  products: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;
