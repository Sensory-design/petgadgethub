/** US + CA + default ? .com tag. UK ? .co.uk tag. */
export type AffiliateRegion = "us" | "uk";

export const AFFILIATE_IDS = {
  us: "petgadgethu06-20",
  uk: "petgadgethub9-21",
} as const;

export const AMAZON_HOSTS = {
  us: "www.amazon.com",
  uk: "www.amazon.co.uk",
} as const;

/** Map ISO country code from Vercel header to our region. */
export function countryToRegion(code: string | undefined): AffiliateRegion {
  if (!code) return "us";
  const upper = code.toUpperCase();
  if (upper === "GB" || upper === "UK") return "uk";
  return "us";
}

export function regionToAffiliate(region: AffiliateRegion) {
  return {
    region,
    tag: AFFILIATE_IDS[region],
    host: AMAZON_HOSTS[region],
  };
}
