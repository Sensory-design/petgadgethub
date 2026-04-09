"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function InternalLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/internal/sales";

  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/internal/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Could not sign in");
        setPending(false);
        return;
      }
      router.replace(nextPath.startsWith("/internal") ? nextPath : "/internal/sales");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
        Internal access
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
        Set <code className="rounded bg-[var(--color-brand-50)] px-1">INTERNAL_SECRET</code> in your
        host environment to require a password for <code className="rounded bg-[var(--color-brand-50)] px-1">/internal/*</code>{" "}
        routes.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-[var(--color-ink)]">
          Access token
          <input
            type="password"
            autoComplete="off"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[var(--color-ink)]"
          />
        </label>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-[var(--color-brand-800)] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--color-brand-600)] disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Continue"}
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-[var(--color-muted)]">
        <Link href="/" className="underline underline-offset-2">
          Back to site
        </Link>
      </p>
    </div>
  );
}
