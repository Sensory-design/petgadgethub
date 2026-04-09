import type { AffiliateRegion } from "./affiliateTag";
import { AMAZON_HOSTS, AFFILIATE_IDS } from "./affiliateTag";

/** Builds a compliant Amazon product URL with the correct tracking tag. */
export function buildProductUrl(asin: string, region: AffiliateRegion): string {
  const host = AMAZON_HOSTS[region];
  const tag = AFFILIATE_IDS[region];
  return `https://${host}/dp/${encodeURIComponent(asin)}?tag=${encodeURIComponent(tag)}`;
}
