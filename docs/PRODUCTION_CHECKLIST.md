# Production checklist (after DNS is live)

Do these once `https://petgadgethub.co.uk` loads the Next.js site. Nothing here is committed to git — it is all in **Vercel**, **Google**, and **Amazon** dashboards.

## Status snapshot (2026-04-11)

- **DNS:** `petgadgethub.co.uk` → Vercel (SiteGround DNS Zone Editor; not WordPress for web).
- **Search Console:** Verified via **HTML tag** in `app/layout.tsx`. Property accessed with **hull.rory@googlemail.com**. Overview may show **“Processing data…”** for a few days — normal.
- **Sitemap:** Submit **`sitemap.xml`** in Search Console if not already (**Sitemaps** → add `sitemap.xml` → Submit).
- **Handover doc for new contributors/AI:** [HANDOVER.md](HANDOVER.md).

## 1. Vercel — environment variable

1. [Vercel Dashboard](https://vercel.com) → **PetGadgetHub** project → **Settings** → **Environment Variables**.
2. Add or edit:
   - **Name:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://petgadgethub.co.uk` (no trailing slash)
   - **Environments:** enable **Production** (and **Preview** if you want correct URLs on preview builds).
3. **Deployments** → open the latest **Production** deployment → **⋯** → **Redeploy** (so metadata and sitemap pick up the variable).

## 2. Vercel — primary domain

**Settings** → **Domains**: set **petgadgethub.co.uk** (or **www**) as **Primary** if you want one canonical hostname. Vercel can redirect the other hostname to primary.

## 3. Google Search Console

1. [Search Console](https://search.google.com/search-console) → property **`https://petgadgethub.co.uk`** (URL prefix).
2. **Sitemaps** → add: `https://petgadgethub.co.uk/sitemap.xml`
3. Optional: **URL Inspection** → request indexing for `/` and `/guides` after big content updates.

## 4. Amazon Associates

1. Log in to [Associates Central](https://affiliate-program.amazon.co.uk) (UK) and the US programme if you use US links.
2. Confirm tracking IDs match the site: **`petgadgethub9-21`** (UK) and **`petgadgethu06-20`** (US) — see [`lib/affiliateTag.ts`](../lib/affiliateTag.ts).
3. Check **Reports** after traffic arrives to verify clicks record.

## 5. Optional — remove hosts file override

If you added a line to `C:\Windows\System32\drivers\etc\hosts` pointing **petgadgethub.co.uk** to an IP, remove it once DNS is healthy everywhere (`nslookup` shows **216.198.79.1** without hacks).

## 6. Repo checks (local)

```bash
npm run verify:domain
npm run build
```

`verify:domain` should exit **0** when the live domain serves Vercel/Next.js, not WordPress.
