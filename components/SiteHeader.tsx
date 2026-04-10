import Link from "next/link";

import { cn } from "@/lib/utils";

/** Core site first - tools (e.g. rental resume) live in the footer. */
const nav: { href: string; label: string; hideOnMobile?: boolean }[] = [
  { href: "/", label: "Home" },
  { href: "/#picks", label: "Our picks", hideOnMobile: true },
  { href: "/categories", label: "All picks" },
  { href: "/guides", label: "Guides" },
  { href: "/quiz", label: "Quiz" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy", hideOnMobile: true },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-ink)]">
            PetGadgetHub
          </span>
          <span className="hidden text-sm text-[var(--color-muted)] sm:inline">Honest pet tech picks</span>
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-4 text-sm font-medium sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]",
                item.hideOnMobile && "hidden sm:inline",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
