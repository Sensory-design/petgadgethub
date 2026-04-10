import Link from "next/link";

type Item = { slug: string; label: string };

/** Wirecutter-style category pill row. */
export function CategoryNav({ categories }: { categories: Item[] }) {
  return (
    <nav aria-label="Browse by category" className="flex flex-wrap gap-2">
      {categories.map(({ slug, label }) => (
        <Link
          key={slug}
          href={`/categories/${slug}`}
          className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-ink)] shadow-sm transition-colors hover:border-[var(--color-brand-600)] hover:bg-[var(--color-brand-50)]"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
