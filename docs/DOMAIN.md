# Custom domain: petgadgethub.co.uk on Vercel

Use this checklist to point your UK domain at the Vercel deployment and preserve SEO (HTTPS, optional redirect from the `.vercel.app` URL).

## If you still see the old WordPress site

If `https://petgadgethub.co.uk` loads a **WordPress** theme (or response headers mention `wp-json` and **nginx** from your old host), the domain’s **DNS is not pointing at Vercel yet**. Your **new** PetGadgetHub (Next.js) is still served on the Vercel hostname, for example `https://petgadgethub.vercel.app` — open `/guides` there to confirm. Fix: complete [step 1](#1-add-the-domain-in-vercel) below and add the **A / CNAME records** Vercel shows at your **registrar** (or turn off the old host’s “parked” DNS). Propagation can take from a few minutes up to 48 hours.

## 1. Add the domain in Vercel

1. Open [Vercel Dashboard](https://vercel.com) → your **PetGadgetHub** project.
2. Go to **Settings** → **Domains**.
3. Click **Add** and enter: `petgadgethub.co.uk`
4. Also add `www.petgadgethub.co.uk` if you want both (recommended).
5. Vercel will show **DNS records** to add at your registrar (or SiteGround if DNS is there).

Typical setup:

- **Apex** `petgadgethub.co.uk`: use Vercel’s **A record** values (they may show multiple IPs) **or** a single **ALIAS/ANAME** if your DNS provider supports it.
- **www**: usually a **CNAME** to `cname.vercel-dns.com` (exact value shown in the Vercel UI — always copy from there).

Wait until Vercel shows **Valid Configuration** (can take a few minutes to 48 hours for DNS propagation).

## 2. Where to edit DNS

- If the domain is registered at **SiteGround**: **Site Tools** → **Domain** → **DNS Zone Editor** (or point nameservers to Vercel if you prefer Vercel DNS — only do one approach).
- If the domain is at **another registrar**, use that registrar’s DNS panel and add the same records Vercel displays.

## 3. Set environment variable for canonical URLs

In Vercel → **Settings** → **Environment Variables**:

- **Name:** `NEXT_PUBLIC_SITE_URL`
- **Value:** `https://petgadgethub.co.uk` (no trailing slash), using the same hostname you set as **primary** in step 4.
- **Environment:** enable at least **Production**. Optionally set the same value for **Preview** so previews generate correct absolute URLs in metadata.

If the custom domain is not ready yet, you can temporarily use `https://petgadgethub.vercel.app` (your project’s production hostname). **Change this to the `https://…` custom domain** once DNS validates so `sitemap.xml`, Open Graph, and Stripe return URLs stay canonical.

**Redeploy** after adding or changing the variable: **Deployments** → open the latest production deployment → **Redeploy**, or push a new commit to `main`.

This keeps `sitemap.xml`, Open Graph, and Stripe return URLs aligned with the live domain (see `lib/siteUrl.ts`).

## 4. Primary domain and redirects

In **Settings** → **Domains**, set **petgadgethub.co.uk** (or `www`) as the **primary** domain if you want all traffic to consolidate there.

Vercel automatically issues **308** redirects from non-primary hostnames to the primary when configured. The old `*.vercel.app` URL can redirect to your custom domain once the custom domain is assigned to the project.

## 5. Verify

- Visit `https://petgadgethub.co.uk` — should load the site with a valid certificate (HTTPS).
- Check **Vercel** → **Deployments** → latest → **Visit** on the production URL.

## 6. Google Search Console (optional but recommended)

Do this **after** HTTPS works on your primary URL (step 5).

1. Open [Google Search Console](https://search.google.com/search-console) and **Add property**.
2. **URL prefix:** enter `https://petgadgethub.co.uk` (or your live origin). Complete **verification** using one of the methods Google offers (DNS TXT via your registrar is reliable for apex/`www` setups).
3. After verification, go to **Sitemaps** → add `sitemap.xml` (full URL: `https://petgadgethub.co.uk/sitemap.xml`).
4. After you ship new routes (e.g. `/guides`), **submit the same sitemap URL again** (or use **URL Inspection** on new URLs) so Google picks up new URLs quickly.
5. Optionally use **URL Inspection** on the homepage to request indexing once content is stable.

## 7. GitHub: private repository (optional)

To hide **source code** from the public: on GitHub open the repo → **Settings** → **General** → **Danger zone** → **Change repository visibility** → **Make private**.

This does **not** make the **Vercel site** private; visitors can still open your production URL unless you use Vercel **Pro** deployment protection, Cloudflare Access, or app-level auth (see Vercel docs for Hobby limits).