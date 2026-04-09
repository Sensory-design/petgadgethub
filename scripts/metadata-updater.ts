/**
 * Suggest page titles/descriptions using a small "trending terms" list you maintain.
 * Does not call paid APIs � keeps costs at zero.
 *
 * Run: npm run metadata:update
 * Output: scripts/output/meta-suggestions.json
 */

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { productsFileSchema } from "../types/product";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "scripts", "output");

/** Edit this list as you learn what people search for (free research: Search Console, etc.). */
const TRENDING_PET_TECH_TERMS = [
  "automatic pet feeder",
  "GPS dog collar",
  "pet camera no subscription",
  "cat water fountain stainless steel",
  "dog poop bags biodegradable",
] as const;

async function main() {
  const raw = await readFile(path.join(ROOT, "data", "products.json"), "utf8");
  const data = productsFileSchema.parse(JSON.parse(raw));

  const suggestions = data.products.map((p) => {
    const term = TRENDING_PET_TECH_TERMS[0];
    return {
      slug: p.slug,
      suggestedTitle: `${p.title} � ${term} | PetGadgetHub`,
      suggestedDescription: `${p.tagline} ${term}.`,
    };
  });

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(
    path.join(OUT_DIR, "meta-suggestions.json"),
    JSON.stringify({ updated: new Date().toISOString(), suggestions }, null, 2),
    "utf8",
  );

  console.log(`Wrote ${suggestions.length} suggestions to scripts/output/meta-suggestions.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
