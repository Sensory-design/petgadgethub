import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/ProductCard";
import { breadcrumbLd, faqLd } from "@/lib/jsonLd";
import { getGuide, getGuides } from "@/lib/getGuides";
import { getProducts } from "@/lib/getProducts";
import { getSiteOrigin } from "@/lib/siteUrl";
import { getAffiliateRegion } from "@/lib/regionFromRequest";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};
  const base = getSiteOrigin().replace(/\/$/, "");
  return {
    title: guide.title,
    description: guide.summary.slice(0, 160),
    alternates: { canonical: `${base}/guides/${slug}` },
    openGraph: {
      title: `${guide.title} — PetGadgetHub`,
      description: guide.summary.slice(0, 160),
      type: "article",
      images: [{ url: guide.heroImageSrc, alt: guide.heroImageAlt }],
      publishedTime: guide.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.summary.slice(0, 160),
    },
  };
}

function articleLd(guide: { slug: string; title: string; summary: string; publishedAt: string; heroImageSrc: string }) {
  const base = getSiteOrigin().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    image: guide.heroImageSrc,
    datePublished: guide.publishedAt,
    dateModified: guide.publishedAt,
    url: `${base}/guides/${guide.slug}`,
    author: { "@type": "Organization", name: "PetGadgetHub", url: base },
    publisher: { "@type": "Organization", name: "PetGadgetHub", url: base },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const [guide, { products, isFallback }, region] = await Promise.all([
    getGuide(slug),
    getProducts(),
    getAffiliateRegion(),
  ]);

  if (!guide) notFound();

  const relatedProducts = (guide.relatedProductSlugs ?? [])
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean) as NonNullable<(typeof products)[number]>[];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd(guide)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: guide.title, path: `/guides/${slug}` },
            ]),
          ),
        }}
      />
      {guide.faq && guide.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(guide.faq)) }}
        />
      )}

      <nav className="text-sm text-[var(--color-muted)]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <Link href="/guides" className="hover:underline">
          Guides
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-[var(--color-ink)]">{guide.title}</span>
      </nav>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-600)]">
        {guide.category}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
        {guide.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">{guide.summary}</p>
      <p className="mt-3 text-sm text-[var(--color-muted)]">
        {guide.readingTimeMinutes} min read &middot; Published {guide.publishedAt}
      </p>

      <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-brand-50)]">
        <Image
          src={guide.heroImageSrc}
          alt={guide.heroImageAlt}
          fill
          className="object-cover"
          priority
          sizes="(max-width:768px) 100vw, 768px"
        />
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-10 rounded-xl border border-[var(--color-brand-200)] bg-[var(--color-brand-50)] p-4 text-sm text-[var(--color-ink)]">
          <p className="font-semibold">Jump to our recommendations:</p>
          <ul className="mt-2 space-y-1">
            {relatedProducts.map((p) => (
              <li key={p.slug}>
                <a href={`#pick-${p.slug}`} className="text-[var(--color-brand-800)] hover:underline">
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-lg mt-10 max-w-none text-[var(--color-ink)]">
        {guide.body.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2
                key={i}
                className="mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]"
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === "intro") {
            return (
              <p
                key={i}
                className="mt-6 text-lg font-medium leading-relaxed text-[var(--color-ink)]"
              >
                {block.text}
              </p>
            );
          }
          return (
            <p key={i} className="mt-4 leading-relaxed text-[var(--color-ink)]">
              {block.text}
            </p>
          );
        })}
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-[var(--color-border)] pt-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
            Products mentioned in this guide
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Each link is an affiliate link to Amazon. We earn a small commission at no extra cost to
            you.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {relatedProducts.map((p) => (
              <div key={p.slug} id={`pick-${p.slug}`}>
                <ProductCard product={p} region={region} isFallback={isFallback} />
              </div>
            ))}
          </div>
        </section>
      )}

      {guide.faq && guide.faq.length > 0 && (
        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
            Common questions
          </h2>
          <dl className="mt-6 divide-y divide-[var(--color-border)]">
            {guide.faq.map(({ q, a }) => (
              <div key={q} className="py-5">
                <dt className="font-semibold text-[var(--color-ink)]">{q}</dt>
                <dd className="mt-2 leading-relaxed text-[var(--color-muted)]">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="mt-14 border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-muted)]">
        <p>
          <span className="font-semibold text-[var(--color-ink)]">PetGadgetHub</span> is an Amazon
          Associate. We earn from qualifying purchases. Prices and availability are accurate at time
          of writing but may change.
        </p>
      </div>
    </article>
  );
}
