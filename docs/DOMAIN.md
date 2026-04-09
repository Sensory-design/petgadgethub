# Custom domain: petgadgethub.co.uk on Vercel

Use this checklist to point your UK domain at the Vercel deployment and preserve SEO (HTTPS, optional redirect from the `.vercel.app` URL).

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

- `NEXT_PUBLIC_SITE_URL` = `https://petgadgethub.co.uk` (no trailing slash)

Redeploy after changing (or trigger a new deployment from Git).

This keeps `sitemap.xml`, Open Graph, and Stripe return URLs aligned with the live domain.

## 4. Primary domain and redirects

In **Settings** → **Domains**, set **petgadgethub.co.uk** (or `www`) as the **primary** domain if you want all traffic to consolidate there.

Vercel automatically issues **308** redirects from non-primary hostnames to the primary when configured. The old `*.vercel.app` URL can redirect to your custom domain once the custom domain is assigned to the project.

## 5. Verify

- Visit `https://petgadgethub.co.uk` — should load the site with a valid certificate (HTTPS).
- Check **Vercel** → **Deployments** → latest → **Visit** on the production URL.

## 6. Google Search Console (optional but recommended)

After go-live, add the property `https://petgadgethub.co.uk` in [Google Search Console](https://search.google.com/search-console) and submit the sitemap: `https://petgadgethub.co.uk/sitemap.xml`.
