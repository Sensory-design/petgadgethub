# PetGadgetHub - agent rules

## Product hub vs tools

- **Primary:** Homepage picks + `/products/[slug]` (Amazon affiliate, `data/products.json`, geo tags).
- **Secondary:** `/tools/rental-resume` - footer "Tools" only, not main nav.

## Affiliate tags

- US / CA / default region: `petgadgethu06-20` on `www.amazon.com`
- UK: `petgadgethub9-21` on `www.amazon.co.uk`
- Geo: `middleware.ts` reads `x-vercel-ip-country`, sets cookie `pgb_region` (`us` | `uk`)

## Links

- Amazon outbound: `rel="sponsored nofollow noopener noreferrer"` via `components/AffiliateLink.tsx`
- Build URLs with `lib/buildAffiliateUrl.ts` - never hand-roll tags in JSX

## Pricing / data

- No API or 403: `getProducts()` uses `data/products.json`, `isFallback: true`
- When `isFallback`: hide prices; use "Check availability on Amazon"

## File hygiene

- Small files; avoid barrel `index.ts`
- Products: `types/product.ts` (Zod) + `data/products.json` together

## Privacy / cookies

- `/privacy` - footer + nav
- `CookieBanner`: `pgb_cookie_banner` in `localStorage`

## Internal routes

- `INTERNAL_SECRET` set: `/internal/*` except `/internal/login` needs cookie `pgb_internal_ok` via `POST /api/internal/unlock`
- Unset: `/internal/*` open for local dev
