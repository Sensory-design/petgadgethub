import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";

export const metadata: Metadata = {
  title: "Sales tracker (internal)",
  robots: { index: false, follow: false },
};

type Tracker = {
  note: string;
  periodStart: string;
  qualifyingSalesLast30Days: number;
  target: number;
  lastChecked: string;
};

async function loadTracker(): Promise<Tracker> {
  try {
    const raw = await readFile(path.join(process.cwd(), "data", "sales-tracker.json"), "utf8");
    return JSON.parse(raw) as Tracker;
  } catch {
    return {
      note: "Create data/sales-tracker.json to track progress locally.",
      periodStart: new Date().toISOString().slice(0, 10),
      qualifyingSalesLast30Days: 0,
      target: 10,
      lastChecked: new Date().toISOString().slice(0, 10),
    };
  }
}

export default async function InternalSalesPage() {
  const t = await loadTracker();
  const pct = Math.min(100, Math.round((t.qualifyingSalesLast30Days / t.target) * 100));

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
        Creators API threshold (internal)
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
        This page is not indexed. It is a lightweight reminder to monitor qualifying sales in Amazon
        Associates Central. Official numbers always win over anything stored here.
      </p>

      <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
        <p className="text-sm text-[var(--color-muted)]">Trailing window (manual)</p>
        <p className="mt-2 text-4xl font-semibold text-[var(--color-ink)]">
          {t.qualifyingSalesLast30Days}{" "}
          <span className="text-lg font-medium text-[var(--color-muted)]">/ {t.target}</span>
        </p>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[var(--color-brand-50)]">
          <div
            className="h-full rounded-full bg-[var(--color-brand-600)] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-4 text-sm text-[var(--color-ink)]">{t.note}</p>
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          Last updated in repo: {t.lastChecked} - Period note: {t.periodStart}
        </p>
      </div>
    </div>
  );
}
