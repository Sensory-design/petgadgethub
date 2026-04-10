import { z } from "zod";

const guideBodyBlockSchema = z.object({
  type: z.enum(["intro", "h2", "paragraph"]),
  text: z.string().min(1),
});

export const guideSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  summary: z.string().min(1),
  publishedAt: z.string().min(1),
  heroImageSrc: z.string().min(1),
  heroImageAlt: z.string().min(1),
  readingTimeMinutes: z.number().int().positive(),
  relatedProductSlugs: z.array(z.string()).optional(),
  faq: z
    .array(z.object({ q: z.string().min(1), a: z.string().min(1) }))
    .optional(),
  body: z.array(guideBodyBlockSchema),
});

export const guidesFileSchema = z.object({
  guides: z.array(guideSchema),
});

export type Guide = z.infer<typeof guideSchema>;
export type GuideBodyBlock = z.infer<typeof guideBodyBlockSchema>;
