export function DisclosureBanner() {
  return (
    <div
      role="region"
      aria-label="Affiliate disclosure"
      className="sticky top-0 z-50 border-b border-amber-200/80 bg-amber-50/95 px-4 py-2.5 text-center text-sm text-amber-950 backdrop-blur-sm"
    >
      <p className="mx-auto max-w-4xl leading-relaxed">
        As an Amazon Associate, I earn from qualifying purchases.
      </p>
    </div>
  );
}
