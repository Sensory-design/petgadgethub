import Image from "next/image";
import Link from "next/link";

import type { Guide } from "@/types/guide";

type Props = { guide: Guide };

export function GuideCard({ guide }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/9] bg-[var(--color-brand-50)]">
        <Image
          src={guide.heroImageSrc}
          alt={guide.heroImageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-[var(--color-brand-800)] shadow-sm">
          {guide.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-[var(--color-muted)]">
          {guide.readingTimeMinutes} min read &middot; {guide.publishedAt}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-[var(--color-ink)]">
          <Link href={`/guides/${guide.slug}`} className="hover:underline">
            {guide.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{guide.summary}</p>
        <div className="mt-auto pt-5">
          <Link
            href={`/guides/${guide.slug}`}
            className="inline-flex items-center text-sm font-semibold text-[var(--color-brand-800)] hover:underline"
          >
            Read the guide &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
