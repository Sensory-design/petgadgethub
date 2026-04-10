import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
              PetGadgetHub
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--color-muted)]">
              Practical picks for people who love animals and dislike guesswork. We explain the problem
              first, then point you to a product that tends to help.
            </p>
          </div>
          <div className="text-sm">
            <p className="font-medium text-[var(--color-ink)]">Explore</p>
            <ul className="mt-2 space-y-2 text-[var(--color-muted)]">
              <li>
                <Link href="/guides" className="hover:text-[var(--color-ink)]">
                  Guides &amp; buying advice
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[var(--color-ink)]">
                  All picks by category
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-[var(--color-ink)]">
                  Pet problem solver quizzes
                </Link>
              </li>
            </ul>
            <p className="mt-6 font-medium text-[var(--color-ink)]">Transparency</p>
            <ul className="mt-2 space-y-2 text-[var(--color-muted)]">
              <li>
                <Link href="/about" className="hover:text-[var(--color-ink)]">
                  How we choose products
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[var(--color-ink)]">
                  Privacy Policy
                </Link>
              </li>
              <li>Amazon Associates disclosure appears site-wide.</li>
            </ul>
            <p className="mt-6 font-medium text-[var(--color-ink)]">Tools</p>
            <ul className="mt-2 space-y-2 text-[var(--color-muted)]">
              <li>
                <Link href="/tools/rental-resume" className="hover:text-[var(--color-ink)]">
                  UK pet rental resume (side tool)
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xs text-[var(--color-muted)]">
          {"\u00a9"} {year} PetGadgetHub. Not affiliated with Amazon. Product names are trademarks of
          their respective owners.
        </p>
      </div>
    </footer>
  );
}
