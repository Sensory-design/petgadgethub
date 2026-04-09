const TEAM = [
  {
    name: "Maya Chen",
    role: "Editor, pet behaviour and safety",
    bio: "Maya writes with one foot in veterinary clinics and one in living rooms - she cares about what actually happens when a product shows up at your door.",
    initials: "MC",
  },
] as const;

export function AuthorBlock() {
  const author = TEAM[0];
  return (
    <aside className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
        Editorial
      </p>
      <div className="mt-4 flex gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-100)] text-lg font-semibold text-[var(--color-brand-800)]"
          aria-hidden
        >
          {author.initials}
        </div>
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
            {author.name}
          </p>
          <p className="text-sm text-[var(--color-muted)]">{author.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">{author.bio}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-[var(--color-muted)]">
        We do not accept payment for placement. If we link to a product, it is because we believe it
        solves a real problem - and we disclose affiliate relationships clearly.
      </p>
    </aside>
  );
}
