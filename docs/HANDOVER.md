# Handover — PetGadgetHub (for new Cursor sessions)

**Last updated:** 2026-04-10. Treat this as the **onboarding snapshot** for AI assistants and humans joining the project.

---

## What this repo is

**PetGadgetHub** — Next.js 15 (App Router) affiliate review site: problem-first copy, Amazon links with disclosed tags, deployed on **Vercel**, GitHub **`Sensory-design/petgadgethub`**.

---

## Live URLs

| Environment | URL |
|-------------|-----|
| Production (custom domain) | **https://petgadgethub.co.uk** (and **www** if configured in Vercel) |
| Vercel default hostname | **https://petgadgethub.vercel.app** |
| Sitemap | **https://petgadgethub.co.uk/sitemap.xml** |

**DNS:** Domain DNS is managed in **SiteGround** (DNS Zone Editor). Apex **A** points to Vercel IP (**216.198.79.1** per Vercel’s current instructions); **www** is **CNAME** to the hostname Vercel shows in **Domains**. Old WordPress hosting is no longer the target for web traffic once DNS propagated.

---

## Vercel

- **Team / scope:** `sensory-designs-projects`
- **Project name:** `petgadgethub`
- **CLI:** Repo can be linked with `npx vercel link --project petgadgethub` (creates local `.vercel/`, gitignored).
- **Env:** `NEXT_PUBLIC_SITE_URL` should match the **primary** public URL (typically `https://petgadgethub.co.uk` **or** `https://www.petgadgethub.co.uk` — align with **Settings → Domains → primary**). Redeploy after changing it so metadata/sitemap use the right origin.
- **Build:** Push to **`main`** deploys production.

---

## Google Search Console

- **Verification:** **HTML meta tag** in `app/layout.tsx` (`google-site-verification`). Do **not** remove it.
- **Property:** URL-prefix style, **`https://petgadgethub.co.uk`** (confirm in dashboard).
- **Owner Google account used for verification:** **hull.rory@googlemail.com** (use this login to open Search Console for this property).
- **Overview “Processing data…”:** Normal for **days** after verification; charts fill in later.
- **Sitemaps:** Submit **`sitemap.xml`** once under **Sitemaps** (not the raw URL list — only the filename in the add box). Google re-fetches the sitemap on its own after deploys.

---

## Amazon Associates

- Tags are hardcoded in **`lib/affiliateTag.ts`**: UK **`petgadgethub9-21`** (`amazon.co.uk`), US/default **`petgadgethu06-20`** (`amazon.com`).
- **Geo:** `middleware.ts` sets `pgb_region` from `x-vercel-ip-country`; `getAffiliateRegion()` reads cookie + headers.
- Product URLs: **`lib/buildAffiliateUrl.ts`** — always use this, not hand-built Amazon links in UI.

---

## Content & data

| Area | Location |
|------|----------|
| Products (50) | `data/products.json` + `types/product.ts` (Zod) |
| Category blurbs | `data/categories.json` |
| Long-form guides | `data/guides.json` + `types/guide.ts`; routes `/guides`, `/guides/[slug]`; optional `relatedQuizSlug` links to `/quiz/[slug]` |
| Quizzes | `data/quizzes.json` + `types/quiz.ts`; routes `/quiz`, `/quiz/[slug]` (client-side scoring, no stored answers) |
| Homepage | Hero, then **quiz CTA** (above categories), category nav, featured picks, **newest 3 guides** (`getGuides()` sorted by `publishedAt` desc) |

**Internal sales / tools:** `/internal/*` (gated if `INTERNAL_SECRET`), `/tools/rental-resume` (Stripe — see `.env.example`).

---

## Scripts & CI

| Command / workflow | Purpose |
|--------------------|---------|
| `npm run verify:domain` | Fails if `petgadgethub.co.uk` still looks like WordPress (DNS wrong) |
| `npm run fix:dns:windows` | Windows DNS flush helper |
| `python scripts/link-health.py --domain www.amazon.co.uk` | HTTP check of each product ASIN on Amazon UK |
| `.github/workflows/domain-health.yml` | Weekly domain check (fails until DNS correct; can disable in Actions if noisy) |
| `.github/workflows/ci.yml` | lint + build on push/PR |

---

## Docs map

| Doc | Use |
|-----|-----|
| [CONTENT_GUIDE.md](CONTENT_GUIDE.md) | Voice, copy standards, field-by-field guidance, model selection |
| [DOMAIN.md](DOMAIN.md) | Custom domain, DNS, GSC notes, local DNS troubleshooting |
| [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) | Vercel env, Search Console, Associates — dashboard checklist |
| [CHANGELOG.md](../CHANGELOG.md) | Release history |
| [public/llms.txt](../public/llms.txt) | LLM-oriented site summary (served at `/llms.txt`) |

---

## Security / ops (for agents)

- **Never** ask the owner to paste passwords or session tokens into chat. Use **password managers**, **Vercel/GitHub logged-in browser**, **official CLI** (`vercel login`).
- **Secrets:** `.env.local` gitignored; follow `.env.example` for names only.

---

## Suggested next steps (product)

1. **Ship quizzes to production:** push `main`, confirm Vercel deploy, then in **Search Console** use **URL Inspection** on `https://petgadgethub.co.uk/quiz` (optional) — the sitemap already includes `/quiz` and each `/quiz/{slug}`.
2. Confirm **Search Console** shows submitted **`sitemap.xml`** as Success; wait for Performance data.
3. **Associates** reports when traffic grows; watch whether quiz result pages drive more outbound clicks than browse-only paths.
4. Add guides / products / new quiz flows via JSON; run **`npm run build`** before merge.
5. Optional: **`amazonImageUrl`** on products + PA-API script when Associates/API access allows.

---

## Version

See **`package.json`** `version` and **[CHANGELOG.md](../CHANGELOG.md)** — v1.0.x adds Pet Problem Solver quizzes (`/quiz`); earlier work includes category hub, guides, SEO (canonical, JSON-LD), DNS tooling.
