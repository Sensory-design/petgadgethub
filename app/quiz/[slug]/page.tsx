import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { QuizFlow } from "@/components/QuizFlow";
import { breadcrumbLd } from "@/lib/jsonLd";
import { getQuiz, getQuizzes } from "@/lib/getQuizzes";
import { getGuide } from "@/lib/getGuides";
import { getProducts } from "@/lib/getProducts";
import { getSiteOrigin } from "@/lib/siteUrl";
import { getAffiliateRegion } from "@/lib/regionFromRequest";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const quizzes = await getQuizzes();
  return quizzes.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const quiz = await getQuiz(slug);
  if (!quiz) return {};
  const base = getSiteOrigin().replace(/\/$/, "");
  return {
    title: quiz.title,
    description: quiz.subtitle,
    alternates: { canonical: `${base}/quiz/${slug}` },
    openGraph: {
      title: `${quiz.title} — PetGadgetHub`,
      description: quiz.subtitle,
      type: "website",
      images: [{ url: quiz.heroImageSrc, alt: quiz.heroImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: quiz.title,
      description: quiz.subtitle,
    },
  };
}

export default async function QuizPage({ params }: Props) {
  const { slug } = await params;
  const [quiz, { products, isFallback }, region] = await Promise.all([
    getQuiz(slug),
    getProducts(),
    getAffiliateRegion(),
  ]);

  if (!quiz) notFound();

  // Collect every product slug referenced in any option's boosts
  const boostSlugs = new Set<string>();
  for (const q of quiz.questions) {
    for (const opt of q.options) {
      for (const s of opt.boosts) {
        boostSlugs.add(s);
      }
    }
  }
  const poolProducts = products.filter((p) => boostSlugs.has(p.slug));

  // Resolve the first related guide (if any) for the skip-link
  const firstGuideSlug = quiz.relatedGuideSlugs?.[0] ?? null;
  const relatedGuide = firstGuideSlug ? await getGuide(firstGuideSlug) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Quizzes", path: "/quiz" },
              { name: quiz.title, path: `/quiz/${slug}` },
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
        <Link href="/quiz" className="hover:underline">
          Quizzes
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-[var(--color-ink)]">{quiz.title}</span>
      </nav>

      <div className="relative mt-6 aspect-[21/9] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-brand-50)]">
        <Image
          src={quiz.heroImageSrc}
          alt={quiz.heroImageAlt}
          fill
          className="object-cover"
          priority
          sizes="(max-width:768px) 100vw, 1152px"
        />
      </div>

      <section className="mt-10">
        <QuizFlow
          quiz={quiz}
          products={poolProducts}
          region={region}
          isFallback={isFallback}
          relatedGuideSlug={firstGuideSlug}
          relatedGuideTitle={relatedGuide?.title ?? null}
        />
      </section>
    </div>
  );
}
