import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type Props = { product: Product; className?: string };

function scoreBand(score: number): "red" | "amber" | "green" {
  if (score < 5) return "red";
  if (score < 8) return "amber";
  return "green";
}

/** Editorial scorecard: The Good / The Bad / verdict (Verge-style). */
export function ScoreBox({ product, className }: Props) {
  if (product.score == null || !product.pros?.length || !product.cons?.length || !product.verdict)
    return null;

  const band = scoreBand(product.score);
  const badge =
    band === "red"
      ? "bg-red-50 text-red-900 ring-red-200"
      : band === "amber"
        ? "bg-amber-50 text-amber-950 ring-amber-200"
        : "bg-emerald-50 text-emerald-950 ring-emerald-200";

  return (
    <aside
      className={cn(
        "rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            PetGadgetHub score
          </p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">Editorial pick (1-10)</p>
        </div>
        <div
          className={cn(
            "flex min-w-[7rem] items-baseline justify-center gap-1 rounded-2xl px-4 py-3 text-3xl font-semibold ring-1",
            badge,
          )}
        >
          <span>{product.score}</span>
          <span className="text-lg font-medium opacity-70">/ 10</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-[var(--color-ink)]">The good</p>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--color-muted)]">
            {product.pros.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-0.5 text-emerald-600" aria-hidden>
                  +
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--color-ink)]">The bad</p>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--color-muted)]">
            {product.cons.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-0.5 text-rose-600" aria-hidden>
                  -
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-brand-50)] p-4 text-sm leading-relaxed text-[var(--color-ink)]">
        <span className="font-semibold">Verdict: </span>
        {product.verdict}
      </p>
    </aside>
  );
}
