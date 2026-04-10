import Image from "next/image";
import Link from "next/link";

import { productHeroImageSrc } from "@/lib/productHeroImage";
import type { Product } from "@/types/product";

type Props = {
  label: string;
  slug: string;
  count: number;
  topPick: Product;
  intro: string;
};

export function CategoryCard({ label, slug, count, topPick, intro }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/9] bg-[var(--color-brand-50)]">
        <Image
          src={productHeroImageSrc(topPick)}
          alt={topPick.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-[var(--color-ink)] shadow-sm">
          {count} guide{count === 1 ? "" : "s"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-[var(--color-ink)]">
          <Link href={`/categories/${slug}`} className="hover:underline">
            {label}
          </Link>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{intro}</p>
        <p className="mt-3 text-xs font-medium text-[var(--color-brand-800)]">
          Top pick: {topPick.title}
        </p>
        <div className="mt-auto pt-5">
          <Link
            href={`/categories/${slug}`}
            className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--color-brand-800)] px-4 py-2.5 text-sm font-semibold text-[var(--color-brand-800)] transition-colors hover:bg-[var(--color-brand-800)] hover:text-white"
          >
            See all {count} {label.toLowerCase()} picks &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
