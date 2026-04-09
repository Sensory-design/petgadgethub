import Link from "next/link";

/** Core site first - tools (e.g. rental resume) live in the footer. */
const nav = [
  { href: "/", label: "Home" },
  { href: "/#picks", label: "Our picks" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
] as const;

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
        <nav aria-label="Main" className="flex items-center gap-6 text-sm font-medium">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
