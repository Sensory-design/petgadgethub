import type { AffiliateRegion } from "./affiliateTag";
import { AMAZON_HOSTS, AFFILIATE_IDS } from "./affiliateTag";

/**
 * Amazon product URL with Associates tag. Uses linkCode=ogi (standard text link)
 * per Amazon Associates link guidelines.
 */
export function buildProductUrl(asin: string, region: AffiliateRegion): string {
  const host = AMAZON_HOSTS[region];
  const tag = AFFILIATE_IDS[region];
  const path = `/dp/${encodeURIComponent(asin)}`;
  const q = new URLSearchParams({
    tag,
    linkCode: "ogi",
  });
  return `https://${host}${path}?${q.toString()}`;
}
