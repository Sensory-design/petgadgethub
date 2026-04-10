import { readFile } from "fs/promises";
import path from "path";

import { quizzesFileSchema, type Quiz } from "@/types/quiz";

export async function getQuizzes(): Promise<Quiz[]> {
  const filePath = path.join(process.cwd(), "data", "quizzes.json");
  const raw = await readFile(filePath, "utf8");
  const parsed = quizzesFileSchema.parse(JSON.parse(raw));
  return parsed.quizzes;
}

export async function getQuiz(slug: string): Promise<Quiz | null> {
  const quizzes = await getQuizzes();
  return quizzes.find((q) => q.slug === slug) ?? null;
}
