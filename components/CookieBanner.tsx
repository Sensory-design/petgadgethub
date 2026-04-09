"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "pgb_cookie_banner";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (window.localStorage.getItem(STORAGE_KEY)) return;
      setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-border)] bg-white/95 p-4 shadow-lg backdrop-blur-md sm:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:px-2">
        <p className="text-sm leading-relaxed text-[var(--color-ink)]">
          We use essential cookies to remember your region and site preferences. See our{" "}
          <Link href="/privacy" className="font-medium underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-xl bg-[var(--color-brand-800)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-brand-600)]"
        >
          OK
        </button>
      </div>
    </div>
  );
}
