import { readFile } from "fs/promises";
import path from "path";

import { guidesFileSchema, type Guide } from "@/types/guide";

export async function getGuides(): Promise<Guide[]> {
  const filePath = path.join(process.cwd(), "data", "guides.json");
  const raw = await readFile(filePath, "utf8");
  const parsed = guidesFileSchema.parse(JSON.parse(raw));
  return parsed.guides;
}

export async function getGuide(slug: string): Promise<Guide | null> {
  const guides = await getGuides();
  return guides.find((g) => g.slug === slug) ?? null;
}
