import { cookies, headers } from "next/headers";

import { countryToRegion, type AffiliateRegion } from "./affiliateTag";

const COOKIE = "pgb_region";

/** Read geo region: cookie set by middleware, else infer from Vercel country header. */
export async function getAffiliateRegion(): Promise<AffiliateRegion> {
  const store = await cookies();
  const c = store.get(COOKIE)?.value;
  if (c === "us" || c === "uk") return c;

  const h = await headers();
  const country = h.get("x-vercel-ip-country") ?? undefined;
  return countryToRegion(country);
}
