import { z } from "zod";

const quizOptionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  boosts: z.array(z.string().min(1)),
});

const quizQuestionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  options: z.array(quizOptionSchema).min(2),
});

export const quizSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  category: z.string().min(1),
  heroImageSrc: z.string().min(1),
  heroImageAlt: z.string().min(1),
  disclaimer: z.string().min(1),
  relatedGuideSlugs: z.array(z.string()).optional(),
  questions: z.array(quizQuestionSchema).min(1),
});

export const quizzesFileSchema = z.object({
  quizzes: z.array(quizSchema),
});

export type Quiz = z.infer<typeof quizSchema>;
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type QuizOption = z.infer<typeof quizOptionSchema>;
