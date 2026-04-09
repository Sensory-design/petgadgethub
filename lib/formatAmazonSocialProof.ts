/** Human-readable line for product cards; counts are rounded approximations from listings. */
export function amazonSocialProofLine(
  rating: number | undefined,
  reviewCountApprox: number | undefined,
): string | null {
  if (rating == null && reviewCountApprox == null) return null;
  const parts: string[] = [];
  if (rating != null) parts.push(`${rating.toFixed(1)} avg`);
  if (reviewCountApprox != null) {
    parts.push(
      `${new Intl.NumberFormat("en-GB").format(reviewCountApprox)}+ ratings on Amazon`,
    );
  }
  return parts.join(" · ");
}
