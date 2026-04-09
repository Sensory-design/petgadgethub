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
  imageSrc: z.string().min(1),
  imageAlt: z.string().min(1),
});

export const productsFileSchema = z.object({
  updated: z.string(),
  products: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;
