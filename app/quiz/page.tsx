import type { Metadata } from "next";
import Link from "next/link";

import { QuizCard } from "@/components/QuizCard";
import { breadcrumbLd } from "@/lib/jsonLd";
import { getQuizzes } from "@/lib/getQuizzes";
import { getSiteOrigin } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "Pet problem solver quizzes",
  description:
    "Not sure what your pet needs? Answer a few quick questions and we will point you to the right gear. No sign-up, no data stored.",
  alternates: { canonical: `${getSiteOrigin().replace(/\/$/, "")}/quiz` },
  openGraph: {
    title: "Pet problem solver quizzes — PetGadgetHub",
    description:
      "Not sure what your pet needs? Answer a few quick questions and we will point you to the right gear.",
    type: "website",
  },
};

export default async function QuizListPage() {
  const quizzes = await getQuizzes();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Quizzes", path: "/quiz" },
            ]),
          ),
        }}
      />

      <nav className="text-sm text-[var(--color-muted)]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-[var(--color-ink)]">Quizzes</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">
          Not sure where to start?
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-[var(--color-muted)]">
          Pick a problem, answer a few quick questions, and we&rsquo;ll point
          you to the gear that usually helps. No sign-up, no data stored &mdash;
          just honest recommendations.
        </p>
      </header>

      <section className="mt-12" aria-label="All quizzes">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.slug} quiz={quiz} />
          ))}
        </div>
      </section>

      <p className="mt-12 text-sm text-[var(--color-muted)]">
        Prefer to browse directly?{" "}
        <Link
          href="/categories"
          className="font-semibold text-[var(--color-brand-800)] hover:underline"
        >
          See all product picks
        </Link>{" "}
        or{" "}
        <Link
          href="/guides"
          className="font-semibold text-[var(--color-brand-800)] hover:underline"
        >
          read our buying guides
        </Link>
        .
      </p>
    </div>
  );
}
