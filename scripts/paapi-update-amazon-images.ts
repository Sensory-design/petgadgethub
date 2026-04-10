/**
 * PA-API 5 GetItems → `amazonImageUrl` (Images.Primary.Large) in data/products.json.
 *
 * Prerequisites: Amazon Associates account with Product Advertising API approved; keys from Associates Central.
 *
 * Environment (see .env.example):
 *   AMAZON_PA_API_ACCESS_KEY
 *   AMAZON_PA_API_SECRET_KEY
 *   AMAZON_PA_API_PARTNER_TAG
 *   AMAZON_PA_API_HOST      optional, default webservices.amazon.co.uk
 *   AMAZON_PA_API_REGION    optional, default eu-west-1 (pair with UK host)
 *
 * Run: npx tsx scripts/paapi-update-amazon-images.ts
 */

import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { productsFileSchema } from "../types/product";

const require = createRequire(import.meta.url);
// Official Amazon PA-API 5 SDK (CommonJS, no bundled types).
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const PA: any = require("paapi5-nodejs-sdk");

const ROOT = process.cwd();
const PRODUCTS_PATH = path.join(ROOT, "data", "products.json");

const BATCH = 10;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v.trim();
}

function primaryImageUrl(item: Record<string, unknown> | undefined): string | null {
  if (!item) return null;
  const images = item.Images as Record<string, unknown> | undefined;
  const primary = images?.Primary as Record<string, unknown> | undefined;
  const large = primary?.Large as { URL?: string } | undefined;
  const medium = primary?.Medium as { URL?: string } | undefined;
  const url = large?.URL ?? medium?.URL;
  return typeof url === "string" && url.startsWith("https://") ? url : null;
}

function getItemsBatch(
  api: { getItems: (req: unknown, cb: (err: Error | null, data: unknown) => void) => void },
  partnerTag: string,
  itemIds: string[],
): Promise<unknown> {
  const getItemsRequest = new PA.GetItemsRequest();
  getItemsRequest.PartnerTag = partnerTag;
  getItemsRequest.PartnerType = "Associates";
  getItemsRequest.ItemIds = itemIds;
  getItemsRequest.Condition = "New";
  getItemsRequest.Resources = ["Images.Primary.Large", "Images.Primary.Medium"];

  return new Promise((resolve, reject) => {
    api.getItems(getItemsRequest, (err: Error | null, data: unknown) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

async function main() {
  const accessKey = requireEnv("AMAZON_PA_API_ACCESS_KEY");
  const secretKey = requireEnv("AMAZON_PA_API_SECRET_KEY");
  const partnerTag = requireEnv("AMAZON_PA_API_PARTNER_TAG");
  const host = process.env.AMAZON_PA_API_HOST?.trim() || "webservices.amazon.co.uk";
  const region = process.env.AMAZON_PA_API_REGION?.trim() || "eu-west-1";

  const raw = await readFile(PRODUCTS_PATH, "utf8");
  const data = productsFileSchema.parse(JSON.parse(raw));

  const client = PA.ApiClient.instance;
  client.accessKey = accessKey;
  client.secretKey = secretKey;
  client.host = host;
  client.region = region;

  const api = new PA.DefaultApi();

  const asinToUrl = new Map<string, string>();

  const asins = [...new Set(data.products.map((p) => p.asin))];
  for (let i = 0; i < asins.length; i += BATCH) {
    const chunk = asins.slice(i, i + BATCH);
    const responseData = await getItemsBatch(api, partnerTag, chunk);
    const parsed = PA.GetItemsResponse.constructFromObject(responseData) as {
      ItemsResult?: { Items?: Array<Record<string, unknown>> };
      Errors?: Array<{ Code?: string; Message?: string }>;
    };

    if (parsed.Errors?.length) {
      const e = parsed.Errors[0];
      throw new Error(`PA-API error: ${e?.Code ?? "?"} — ${e?.Message ?? ""}`);
    }

    const items = parsed.ItemsResult?.Items ?? [];
    for (const item of items) {
      const asin = item.ASIN as string | undefined;
      const url = primaryImageUrl(item);
      if (asin && url) asinToUrl.set(asin, url);
    }
  }

  let updatedCount = 0;
  for (const p of data.products) {
    const url = asinToUrl.get(p.asin);
    if (url && url !== p.amazonImageUrl) {
      p.amazonImageUrl = url;
      updatedCount += 1;
    }
  }

  await writeFile(PRODUCTS_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(
    `Wrote ${PRODUCTS_PATH}: ${updatedCount} product(s) got or refreshed amazonImageUrl (${asinToUrl.size} ASINs resolved).`,
  );
}

main().catch((e: unknown) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
