/** Safe base URL for metadata, sitemap, Stripe redirects. Empty/invalid env never crashes the build. */
const FALLBACK = "http://localhost:3000";

export function getSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK;
  try {
    return new URL(raw).origin;
  } catch {
    return FALLBACK;
  }
}

export function getMetadataBase(): URL {
  return new URL(getSiteOrigin() + "/");
}
