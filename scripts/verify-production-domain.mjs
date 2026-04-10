/**
 * Ensures the public production hostname serves this Next.js app on Vercel,
 * not legacy WordPress hosting (wrong DNS).
 *
 * Usage:
 *   node scripts/verify-production-domain.mjs
 *   PRODUCTION_ORIGIN=https://petgadgethub.co.uk node scripts/verify-production-domain.mjs
 *
 * Exit 0: domain looks correct (Vercel/Next.js signals).
 * Exit 1: domain still points at WordPress or another unknown stack.
 */

const DEFAULT_ORIGIN = "https://petgadgethub.co.uk";
const CHECK_PATH = "/guides";

const origin = (process.env.PRODUCTION_ORIGIN || DEFAULT_ORIGIN).replace(/\/$/, "");
const url = `${origin}${CHECK_PATH}`;

function looksLikeWordPressHeaders(headers) {
  const link = headers.get("link") || "";
  if (link.includes("wp-json") || link.includes("api.w.org")) return true;
  const poweredBy = (headers.get("x-powered-by") || "").toLowerCase();
  if (poweredBy.includes("php") && headers.get("link")?.includes("wp-json")) return true;
  return false;
}

function looksLikeVercelNext(headers) {
  if (headers.get("x-vercel-id")) return true;
  if (headers.get("x-vercel-cache")) return true;
  const server = (headers.get("server") || "").toLowerCase();
  if (server.includes("vercel")) return true;
  for (const key of headers.keys()) {
    if (key.toLowerCase().startsWith("x-nextjs")) return true;
  }
  return false;
}

function looksLikeWordPressBody(snippet) {
  const s = snippet.slice(0, 120_000).toLowerCase();
  if (s.includes("/wp-content/") || s.includes("/wp-includes/")) return true;
  if (s.includes("wp-embed.min.js")) return true;
  if (s.includes("xmlrpc.php")) return true;
  return false;
}

function looksLikeNextBody(snippet) {
  return (
    snippet.includes("_next/static") ||
    snippet.includes("__NEXT_DATA__") ||
    snippet.includes("next-router") ||
    snippet.includes('id="__next"')
  );
}

/** Drain body so Node can exit cleanly (avoids Windows libuv assertion after fetch). */
async function drain(res) {
  try {
    await res.arrayBuffer();
  } catch {
    /* ignore */
  }
}

async function main() {
  console.log(`Checking ${url} …`);

  const res = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "PetGadgetHub-domain-check/1.0" },
  });

  const finalUrl = res.url;
  console.log(`Final URL: ${finalUrl}`);
  console.log(`HTTP ${res.status}`);

  if (looksLikeWordPressHeaders(res.headers)) {
    await drain(res);
    console.log(
      "\nFAIL: Response headers look like WordPress (e.g. Link: …/wp-json/).\n" +
        "Your domain DNS is still pointing at old hosting, not Vercel.\n" +
        "Fix: docs/DOMAIN.md — add the domain in Vercel and update DNS at your registrar.\n",
    );
    return 1;
  }

  if (looksLikeVercelNext(res.headers)) {
    await drain(res);
    console.log("OK: Vercel / Next.js headers detected.");
    return 0;
  }

  const text = await res.text();

  if (looksLikeWordPressBody(text)) {
    console.log(
      "\nFAIL: HTML looks like WordPress (wp-content / wp-includes).\n" +
        "DNS for this hostname is not serving the Vercel deployment.\n" +
        "See docs/DOMAIN.md.\n",
    );
    return 1;
  }

  if (looksLikeNextBody(text)) {
    console.log("OK: Next.js markers found in HTML.");
    return 0;
  }

  console.log(
    "\nFAIL: Could not confirm Vercel/Next.js. Headers/body do not match expected stack.\n" +
      `If ${origin} is correct, inspect the response manually.\n`,
  );
  return 1;
}

main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((err) => {
    console.log(err);
    process.exitCode = 1;
  });
