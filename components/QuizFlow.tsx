"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import type { AffiliateRegion } from "@/lib/affiliateTag";
import { slugFromCategory } from "@/lib/categorySlug";
import type { Product } from "@/types/product";
import type { Quiz } from "@/types/quiz";

type Props = {
  quiz: Quiz;
  products: Product[];
  region: AffiliateRegion;
  isFallback: boolean;
  relatedGuideSlug: string | null;
  relatedGuideTitle: string | null;
};

export function QuizFlow({
  quiz,
  products,
  region,
  isFallback,
  relatedGuideSlug,
  relatedGuideTitle,
}: Props) {
  const totalQuestions = quiz.questions.length;
  const [step, setStep] = useState(0); // 0 = intro, 1..n = questions, n+1 = results
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = useCallback(
    (questionId: string, optionId: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
      setStep((s) => s + 1);
    },
    [],
  );

  const handleBack = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const handleRestart = useCallback(() => {
    setStep(0);
    setAnswers({});
  }, []);

  const rankedProducts = useMemo(() => {
    const tally: Record<string, number> = {};
    for (const question of quiz.questions) {
      const chosen = answers[question.id];
      if (!chosen) continue;
      const option = question.options.find((o) => o.id === chosen);
      if (!option) continue;
      for (const slug of option.boosts) {
        tally[slug] = (tally[slug] ?? 0) + 1;
      }
    }
    const sorted = Object.entries(tally)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([slug]) => slug);
    return sorted
      .map((slug) => products.find((p) => p.slug === slug))
      .filter(Boolean) as Product[];
  }, [answers, products, quiz.questions]);

  const categorySlug = slugFromCategory(quiz.category);
  const isResults = step > totalQuestions;

  // Intro screen
  if (step === 0) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
          {quiz.title}
        </h2>
        <p className="mt-3 text-lg text-[var(--color-muted)]">{quiz.subtitle}</p>

        <button
          type="button"
          onClick={() => setStep(1)}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-[var(--color-brand-800)] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[var(--color-brand-600)]"
        >
          Start the quiz
        </button>

        <div className="mt-8 space-y-2 text-sm text-[var(--color-muted)]">
          {relatedGuideSlug && relatedGuideTitle && (
            <p>
              Or skip to our{" "}
              <Link
                href={`/guides/${relatedGuideSlug}`}
                className="font-semibold text-[var(--color-brand-800)] hover:underline"
              >
                {relatedGuideTitle}
              </Link>
            </p>
          )}
          <p>
            Or{" "}
            <Link
              href={`/categories/${categorySlug}`}
              className="font-semibold text-[var(--color-brand-800)] hover:underline"
            >
              browse all {quiz.category.toLowerCase()} picks
            </Link>
          </p>
        </div>

        <p className="mt-6 text-xs text-[var(--color-muted)]">{quiz.disclaimer}</p>
      </div>
    );
  }

  // Results screen
  if (isResults) {
    return (
      <div>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
            Based on your answers, we&rsquo;d start with{" "}
            {rankedProducts.length === 1 ? "this" : "these"}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Ranked by how well they match what you told us.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rankedProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              region={region}
              isFallback={isFallback}
            />
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-brand-50)] p-5 text-sm text-[var(--color-muted)]">
          <p>{quiz.disclaimer}</p>
          <p className="mt-2">
            We are an Amazon Associate. Links earn us a commission at no extra
            cost to you.
          </p>
          <p className="mt-2">
            Recommendations are based on your answers, not personalised health
            data. No data is stored.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-xl border border-[var(--color-brand-800)] px-5 py-2.5 font-semibold text-[var(--color-brand-800)] transition-colors hover:bg-[var(--color-brand-800)] hover:text-white"
          >
            Retake quiz
          </button>
          {relatedGuideSlug && relatedGuideTitle && (
            <Link
              href={`/guides/${relatedGuideSlug}`}
              className="rounded-xl border border-[var(--color-border)] px-5 py-2.5 font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-brand-50)]"
            >
              Read our {relatedGuideTitle}
            </Link>
          )}
          <Link
            href={`/categories/${categorySlug}`}
            className="rounded-xl border border-[var(--color-border)] px-5 py-2.5 font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-brand-50)]"
          >
            Browse all {quiz.category.toLowerCase()} picks
          </Link>
        </div>
      </div>
    );
  }

  // Question screen
  const question = quiz.questions[step - 1];
  const progressPct = (step / totalQuestions) * 100;

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
          <span>
            Question {step} of {totalQuestions}
          </span>
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="font-semibold text-[var(--color-brand-800)] hover:underline"
            >
              &larr; Back
            </button>
          )}
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-brand-100)]">
          <div
            className="h-full rounded-full bg-[var(--color-brand-800)] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        {question.text}
      </h2>

      <div className="mt-6 space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(question.id, option.id)}
            className="w-full rounded-xl border border-[var(--color-border)] bg-white px-5 py-4 text-left text-base font-medium text-[var(--color-ink)] shadow-sm transition-all hover:border-[var(--color-brand-800)] hover:shadow-md"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
