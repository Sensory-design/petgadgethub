import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { AmazonCta } from "@/components/AmazonCta";
import { AuthorBlock } from "@/components/AuthorBlock";
import { ScoreBox } from "@/components/ScoreBox";
import { buildProductUrl } from "@/lib/buildAffiliateUrl";
import { amazonSocialProofLine } from "@/lib/formatAmazonSocialProof";
import { faqLd, productLd } from "@/lib/jsonLd";
import { getProducts } from "@/lib/getProducts";
import { getAffiliateRegion } from "@/lib/regionFromRequest";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { products } = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { products } = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  const description = `${product.tagline} ${product.solution}`.slice(0, 160);
  return {
    title: `${product.title} - Is it worth it?`,
    description,
    openGraph: {
      title: `${product.title} - PetGadgetHub`,
      description,
      images: [{ url: product.imageSrc, alt: product.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: product.title, description },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [{ products, isFallback, updated }, region] = await Promise.all([
    getProducts(),
    getAffiliateRegion(),
  ]);
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const href = buildProductUrl(product.asin, region);
  const social = amazonSocialProofLine(product.rating, product.reviewCountApprox);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd(product, region)) }}
      />
      {product.faq && product.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(product.faq)) }}
        />
      )}
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-600)]">
        {product.category}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
        {product.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">{product.tagline}</p>
      {social && (
        <p className="mt-2 text-sm text-[var(--color-brand-800)]">{social} (approx., from Amazon)</p>
      )}
      <p className="mt-3 text-sm font-medium text-[var(--color-ink)]">
        Why we picked it: {product.whyWePicked}
      </p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">Page updated {updated}</p>

      <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-brand-50)]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="(max-width:768px) 100vw, 768px"
        />
      </div>

      <ScoreBox product={product} className="mt-8" />

      <AmazonCta
        href={href}
        isFallback={isFallback}
        intro="Want the current price, shipping options, and full Amazon reviews? One click opens the listing."
        className="mt-8"
      />

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          The problem
        </h2>
        <p className="mt-4 whitespace-pre-wrap leading-relaxed text-[var(--color-ink)]">
          {product.problem}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          What tends to help
        </h2>
        <p className="mt-4 whitespace-pre-wrap leading-relaxed text-[var(--color-ink)]">
          {product.solution}
        </p>
        {product.honestNote && (
          <p className="mt-6 rounded-xl border border-[var(--color-border)] bg-white p-4 text-sm leading-relaxed text-[var(--color-muted)]">
            <span className="font-semibold text-[var(--color-ink)]">A straight answer: </span>
            {product.honestNote}
          </p>
        )}
      </section>

      <AmazonCta
        href={href}
        isFallback={isFallback}
        intro="Ready to compare sellers, Prime eligibility, and the price today?"
        className="mt-12"
      />

      {product.faq && product.faq.length > 0 && (
        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
            Common questions
          </h2>
          <dl className="mt-6 divide-y divide-[var(--color-border)]">
            {product.faq.map(({ q, a }) => (
              <div key={q} className="py-5">
                <dt className="font-semibold text-[var(--color-ink)]">{q}</dt>
                <dd className="mt-2 leading-relaxed text-[var(--color-muted)]">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <AmazonCta
        href={href}
        isFallback={isFallback}
        intro="Still deciding? The Amazon page shows live price, delivery date, and questions from recent buyers."
        className="mt-14"
      />

      <div className="mt-14">
        <AuthorBlock />
      </div>
    </article>
  );
}
