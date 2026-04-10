# Custom domain: petgadgethub.co.uk on Vercel

Use this checklist to point your UK domain at the Vercel deployment and preserve SEO (HTTPS, optional redirect from the `.vercel.app` URL).

After DNS is live, follow **[PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)** (Vercel env, Search Console, Associates).

## If you still see the old WordPress site

If `https://petgadgethub.co.uk` loads a **WordPress** theme (or response headers mention `wp-json` and **nginx** from your old host), the domain’s **DNS is not pointing at Vercel yet**. Your **new** PetGadgetHub (Next.js) is still served on the Vercel hostname, for example `https://petgadgethub.vercel.app` — open `/guides` there to confirm. Fix: complete [step 1](#1-add-the-domain-in-vercel) below and add the **A / CNAME records** Vercel shows at your **registrar** (or turn off the old host’s “parked” DNS). Propagation can take from a few minutes up to 48 hours.

### Still see the old WordPress site on your PC? (DNS already fixed in SiteGround)

Public DNS (e.g. Google **8.8.8.8**) may already return **216.198.79.1** for `petgadgethub.co.uk`, while **your PC or router** still uses a **cached** old IP (**35.214.18.112**) — so the browser keeps loading SiteGround. This is not something the codebase can change; you fix it on the device.

1. **Flush Windows DNS** — open **Command Prompt** and run: `ipconfig /flushdns`  
   Or from the repo folder run:  
   `powershell -ExecutionPolicy Bypass -File .\scripts\windows-petgadgethub-dns-fix.ps1`  
   That script flushes the cache and prints what **8.8.8.8** vs **this PC** resolves (so you can compare).

2. **Use public DNS on this PC** — **Settings** → **Network** → your **Wi‑Fi / Ethernet** → **DNS** → **Manual** → **8.8.8.8** and **8.8.4.4**, then flush again.

3. **Reboot your home router** — it often caches DNS for hours.

4. **Test on phone using mobile data** (not Wi‑Fi). If the phone shows the new site but the PC does not, the problem is **local DNS cache** on the PC or router.

5. **Last resort (temporary)** — edit the **hosts** file as Administrator:  
   `C:\Windows\System32\drivers\etc\hosts`  
   Add a line:  
   `216.198.79.1 petgadgethub.co.uk`  
   Save, flush DNS, retry the site. **Remove this line later** when `nslookup petgadgethub.co.uk` (without specifying a server) returns **216.198.79.1** on its own, so you do not depend on a hard-coded IP forever.

6. **IPv6** — if SiteGround ever added an **AAAA** record pointing at the old host, some networks prefer IPv6 and you would still see the old site. In **DNS Zone Editor**, if there is an **AAAA** for `petgadgethub.co.uk` that is not from Vercel, remove it or ask support.

## Long-term: keep the domain on Vercel (avoid “it broke again”)

The only durable fix is **DNS that points exclusively at Vercel** for this site. Code cannot override wrong DNS.

1. **Pick one DNS authority**  
   Either: (A) keep DNS at your registrar but **remove every A/CNAME** that still targets SiteGround, cPanel, or “parking”, and replace them with **only** what Vercel shows; or (B) switch **nameservers** to **Vercel DNS** (Vercel project → Domains → use their nameservers) so all records live in one place and the old host cannot silently win.

2. **Cancel or detach the old WordPress host** for this domain  
   If you still pay for old hosting, turn off “site” or **remove** the domain from that panel so it does not re-add conflicting records.

3. **Automated check in this repo**  
   Run locally: `npm run verify:domain` — exits with an error if `https://petgadgethub.co.uk` still looks like WordPress. GitHub Actions runs the same check **weekly** (`.github/workflows/domain-health.yml`); when DNS is correct, the workflow stays green. **Until DNS is fixed, that workflow will fail** (by design). You can disable **Domain health** under **Actions** if the noise bothers you, or use it as a reminder to finish DNS.

4. **After DNS is green**  
   Confirm `NEXT_PUBLIC_SITE_URL=https://petgadgethub.co.uk` in Vercel (Production) and **Redeploy** once.

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