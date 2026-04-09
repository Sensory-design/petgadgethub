"use client";

import { useMemo, useState } from "react";

import { generateRentalResumePdf } from "@/lib/rental-resume/generatePdf";
import type { RentalResumeForm, UkBreedOption } from "@/types/rental-resume";

const BREEDS: { value: UkBreedOption; label: string }[] = [
  { value: "labrador", label: "Labrador Retriever" },
  { value: "french_bulldog", label: "French Bulldog" },
  { value: "cocker_spaniel", label: "Cocker Spaniel" },
  { value: "golden_retriever", label: "Golden Retriever" },
  { value: "staffordshire_bull_terrier", label: "Staffordshire Bull Terrier" },
  { value: "other", label: "Other (specify below)" },
];

/** Illustrative figures — replace with your own research sources for production copy. */
const BENCHMARKS = [
  {
    label: "French Bulldog",
    detail: "Around £121/mo illustrative total (insurance and health risk can dominate).",
  },
  {
    label: "Doberman",
    detail: "Illustrative lifetime total around £23,000 — varies hugely by insurance and vet luck.",
  },
  {
    label: "Golden Retriever",
    detail: "Around £126/mo illustrative (food, joint care, and insurance add up).",
  },
] as const;

const empty: RentalResumeForm = {
  ownerName: "",
  petName: "",
  breed: "labrador",
  breedOther: "",
  behaviorTraining: "",
  behaviorPledge: "",
  healthVaccinations: "",
  healthParasite: "",
  insuranceNote: "",
};

export function RentalResumeTool() {
  const [form, setForm] = useState<RentalResumeForm>(empty);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutMsg, setCheckoutMsg] = useState<string | null>(null);

  const canPdf = useMemo(
    () => form.ownerName.trim().length > 0 && form.petName.trim().length > 0,
    [form.ownerName, form.petName],
  );

  function set<K extends keyof RentalResumeForm>(key: K, value: RentalResumeForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onDownloadPdf() {
    setPdfBusy(true);
    try {
      generateRentalResumePdf(form);
    } finally {
      setPdfBusy(false);
    }
  }

  async function onPremium() {
    setCheckoutMsg(null);
    setCheckoutBusy(true);
    try {
      const res = await fetch("/api/checkout/rental-pack", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setCheckoutMsg(data.error ?? "Checkout is not configured yet. Add Stripe keys in Vercel.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setCheckoutMsg("Network error.");
    } finally {
      setCheckoutBusy(false);
    }
  }

  return (
    <div className="space-y-16">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-600)]">
          UK renters · May 2026 readiness
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Pet Rental Approval Tool
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
          Get landlord-ready language and a clean PDF you can send with a polite email. Designed for
          renters preparing under the{" "}
          <strong className="text-[var(--color-ink)]">
            Renters&apos; Rights Act 2025 (effective May 2026)
          </strong>
          — always confirm details against your own tenancy and, if needed, a qualified adviser.
        </p>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm leading-relaxed text-amber-950">
          <strong>Not legal advice.</strong> PetGadgetHub is not a law firm. This page helps you
          present information clearly; it does not guarantee approval.
        </p>
      </header>

      <section className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
            Resume generator
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Top UK breeds are listed first; pick &quot;Other&quot; for anything else.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-[var(--color-ink)]">
              Your name
              <input
                className="mt-2 w-full rounded-xl border border-[var(--color-border)] px-4 py-3"
                value={form.ownerName}
                onChange={(e) => set("ownerName", e.target.value)}
                autoComplete="name"
              />
            </label>
            <label className="block text-sm font-medium text-[var(--color-ink)]">
              Pet&apos;s name
              <input
                className="mt-2 w-full rounded-xl border border-[var(--color-border)] px-4 py-3"
                value={form.petName}
                onChange={(e) => set("petName", e.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[var(--color-ink)]">
              Breed
              <select
                className="mt-2 w-full rounded-xl border border-[var(--color-border)] px-4 py-3"
                value={form.breed}
                onChange={(e) => set("breed", e.target.value as UkBreedOption)}
              >
                {BREEDS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </label>
            {form.breed === "other" && (
              <label className="block text-sm font-medium text-[var(--color-ink)]">
                Breed details
                <input
                  className="mt-2 w-full rounded-xl border border-[var(--color-border)] px-4 py-3"
                  value={form.breedOther}
                  onChange={(e) => set("breedOther", e.target.value)}
                />
              </label>
            )}

            <label className="block text-sm font-medium text-[var(--color-ink)]">
              Training & behaviour (certs, classes, day care)
              <textarea
                className="mt-2 min-h-[88px] w-full rounded-xl border border-[var(--color-border)] px-4 py-3"
                value={form.behaviorTraining}
                onChange={(e) => set("behaviorTraining", e.target.value)}
                placeholder="e.g. Kennel Club Good Citizen — Bronze (2025)…"
              />
            </label>
            <label className="block text-sm font-medium text-[var(--color-ink)]">
              Good citizen pledge (your words)
              <textarea
                className="mt-2 min-h-[88px] w-full rounded-xl border border-[var(--color-border)] px-4 py-3"
                value={form.behaviorPledge}
                onChange={(e) => set("behaviorPledge", e.target.value)}
                placeholder="I commit to prompt waste pick-up, noise awareness, and…"
              />
            </label>
            <label className="block text-sm font-medium text-[var(--color-ink)]">
              Vaccination & vet care
              <textarea
                className="mt-2 min-h-[72px] w-full rounded-xl border border-[var(--color-border)] px-4 py-3"
                value={form.healthVaccinations}
                onChange={(e) => set("healthVaccinations", e.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[var(--color-ink)]">
              Flea & worming status
              <textarea
                className="mt-2 min-h-[64px] w-full rounded-xl border border-[var(--color-border)] px-4 py-3"
                value={form.healthParasite}
                onChange={(e) => set("healthParasite", e.target.value)}
              />
            </label>
            <label className="block text-sm font-medium text-[var(--color-ink)]">
              Insurance notes (policy type, insurer, cover level)
              <textarea
                className="mt-2 min-h-[72px] w-full rounded-xl border border-[var(--color-border)] px-4 py-3"
                value={form.insuranceNote}
                onChange={(e) => set("insuranceNote", e.target.value)}
                placeholder="e.g. Lifetime cover, £X excess, insurer name…"
              />
            </label>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              disabled={!canPdf || pdfBusy}
              onClick={onDownloadPdf}
              className="rounded-xl bg-[var(--color-brand-800)] px-5 py-3 text-sm font-medium text-white hover:bg-[var(--color-brand-600)] disabled:opacity-50"
            >
              {pdfBusy ? "Preparing PDF…" : "Download PDF resume"}
            </button>
            {!canPdf && (
              <span className="text-sm text-[var(--color-muted)]">Add your name and pet name first.</span>
            )}
          </div>

          <div className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-brand-50)] p-4 text-sm text-[var(--color-ink)]">
            <p className="font-semibold">Insurance — compare cover (affiliate)</p>
            <p className="mt-2 text-[var(--color-muted)]">
              Replace these with your programme links when approved. Buttons use{" "}
              <code className="text-xs">rel=&quot;sponsored nofollow&quot;</code>.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href="https://www.petplan.co.uk/"
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium hover:bg-[var(--color-brand-50)]"
              >
                Petplan (example)
              </a>
              <a
                href="https://www.whistle.com/"
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium hover:bg-[var(--color-brand-50)]"
              >
                Whistle (example)
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
              Lifetime budgeter (illustrative)
            </h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              April 2026-style benchmarks for planning conversations — not quotes for your pet.
            </p>
            <ul className="mt-6 space-y-4">
              {BENCHMARKS.map((b) => (
                <li
                  key={b.label}
                  className="rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm leading-relaxed"
                >
                  <span className="font-semibold text-[var(--color-ink)]">{b.label}</span>
                  <span className="mt-1 block text-[var(--color-muted)]">{b.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--color-brand-600)]/30 bg-white p-6 shadow-sm">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
              Premium Rental Pack — £2.99
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              Extra landlord-ready wording, legal guidance pointers, and a richer budget worksheet.
              Paid via Stripe when configured.
            </p>
            <button
              type="button"
              onClick={onPremium}
              disabled={checkoutBusy}
              className="mt-6 w-full rounded-xl bg-[var(--color-ink)] px-4 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {checkoutBusy ? "Redirecting…" : "Unlock Premium Rental Pack"}
            </button>
            {checkoutMsg && <p className="mt-3 text-sm text-red-700">{checkoutMsg}</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
