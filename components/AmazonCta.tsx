import { AffiliateLink } from "@/components/AffiliateLink";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  isFallback: boolean;
  intro: string;
  className?: string;
};

/** Repeated Amazon outbound block with consistent copy and compliance line on fallback. */
export function AmazonCta({ href, isFallback, intro, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm",
        className,
      )}
    >
      <p className="text-sm leading-relaxed text-[var(--color-muted)]">{intro}</p>
      <AffiliateLink
        href={href}
        className="mt-4 w-full rounded-xl bg-[var(--color-brand-800)] px-4 py-3 text-center text-sm text-white hover:bg-[var(--color-brand-600)] sm:inline-flex sm:w-auto sm:min-w-[14rem]"
      >
        See it on Amazon &rarr;
      </AffiliateLink>
      {isFallback && (
        <p className="mt-3 text-xs text-[var(--color-muted)]">
          We do not show a live price on PetGadgetHub. What you pay is set at checkout on Amazon.
        </p>
      )}
    </div>
  );
}
