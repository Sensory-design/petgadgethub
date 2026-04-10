import Image from "next/image";
import Link from "next/link";

import type { Quiz } from "@/types/quiz";

type Props = { quiz: Quiz };

export function QuizCard({ quiz }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/9] bg-[var(--color-brand-50)]">
        <Image
          src={quiz.heroImageSrc}
          alt={quiz.heroImageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-[var(--color-brand-800)] shadow-sm">
          {quiz.category}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-[var(--color-ink)] shadow-sm">
          {quiz.questions.length} questions
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-[var(--color-ink)]">
          <Link href={`/quiz/${quiz.slug}`} className="hover:underline">
            {quiz.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          {quiz.subtitle}
        </p>
        <div className="mt-auto pt-5">
          <Link
            href={`/quiz/${quiz.slug}`}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--color-brand-800)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-600)]"
          >
            Take the quiz &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
