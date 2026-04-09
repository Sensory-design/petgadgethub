import { z } from "zod";

export const productSchema = z.object({
  slug: z.string().min(1),
  asin: z.string().length(10),
  title: z.string().min(1),
  /** Short hook for cards — one sentence, plain English */
  tagline: z.string().min(1),
  /** The messy problem readers actually have */
  problem: z.string().min(1),
  /** How this product helps, without hype */
  solution: z.string().min(1),
  /** Optional nuance: who it is not for */
  honestNote: z.string().optional(),
  category: z.string().min(1),
  /** Decorative image — not Amazon hotlink; use your own or neutral art */
  imageSrc: z.string().min(1),
  imageAlt: z.string().min(1),
});

export const productsFileSchema = z.object({
  updated: z.string(),
  products: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;
