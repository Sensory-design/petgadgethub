/**
 * Fetches main product image URLs from Amazon UK (then US) HTML and writes
 * `amazonImageUrl` into data/products.json. Run: node scripts/fetch-amazon-product-images.mjs
 *
 * Uses ~2.5s delay between requests. Requires network.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const productsPath = join(__dirname, "..", "data", "products.json");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

const hiResRe = /"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/;
const ogImageRe =
  /<meta\s+property="og:image"\s+content="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/i;

function extractImage(html) {
  let m = html.match(hiResRe);
  if (m) return m[1];
  m = html.match(ogImageRe);
  if (m) return m[1];
  return null;
}

async function fetchImageForAsin(asin) {
  const urls = [
    `https://www.amazon.co.uk/dp/${asin}`,
    `https://www.amazon.com/dp/${asin}`,
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": UA,
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-GB,en;q=0.9",
        },
        redirect: "follow",
      });
      const html = await res.text();
      if (html.length < 5000) continue;
      const img = extractImage(html);
      if (img) return { url: img, source: url.includes(".co.uk") ? "uk" : "us" };
    } catch {
      /* try next */
    }
  }
  return null;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const raw = readFileSync(productsPath, "utf8");
  const data = JSON.parse(raw);
  const { products, updated } = data;

  let ok = 0;
  let fail = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    process.stdout.write(`[${i + 1}/${products.length}] ${p.slug} (${p.asin}) ... `);

    if (p.amazonImageUrl) {
      console.log("skip (already set)");
      continue;
    }

    const result = await fetchImageForAsin(p.asin);
    if (result) {
      p.amazonImageUrl = result.url;
      console.log(`OK (${result.source})`);
      ok++;
    } else {
      console.log("FAIL");
      fail++;
    }

    await sleep(2500);
  }

  const out = JSON.stringify({ updated, products }, null, 2) + "\n";
  writeFileSync(productsPath, out, "utf8");

  console.log(`\nDone. amazonImageUrl set: ${ok}, failed: ${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
