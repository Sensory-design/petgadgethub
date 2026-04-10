# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- 4 new quizzes: **My dog is bored at home** (Enrichment), **Travelling with my pet** (Travel), **My pet needs feeding sorted** (Feeding), **Pet fur everywhere** (Grooming). Brings quiz coverage to 8 flows and 40+ products.

### Changed

- Homepage: **Not sure where to start?** quiz CTA moved directly below the hero (above Browse by category) for visibility.
- All quiz disclaimers now end with "No data is stored." per content guide.
- `dog-pulls-on-lead`: fixed small dog path that previously boosted only 1 product; now returns 3 options.
- `llms.txt`: updated Quizzes section with all 8 quiz routes.

## [1.0.4] - 2026-04-10

### Added

- [.cursor/rules/content.md](.cursor/rules/content.md): auto-loaded content style guide (voice, all product copy fields, guide/quiz standards, UK context, model selection).
- [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md): long-form human-readable content guide with annotated good/bad examples for every field.

### Changed

- [docs/HANDOVER.md](docs/HANDOVER.md): docs map now lists CONTENT_GUIDE.md.
- [.cursor/rules/project.md](.cursor/rules/project.md): pointer to content rules file.

## [1.0.3] - 2026-04-10

### Added

- New quiz **I'm worried my pet could get lost** at `/quiz/worried-dog-gets-lost` (Safety): live GPS vs AirTag, matched to [best-gps-dog-tracker-uk](data/guides.json) guide.
- [data/guides.json](data/guides.json): `relatedQuizSlug` on **Best GPS Dog Tracker UK 2026** pointing to that quiz.

## [1.0.2] - 2026-04-10

### Added

- [types/guide.ts](types/guide.ts): optional `relatedQuizSlug` field.
- [data/guides.json](data/guides.json): linked three guides to matching quizzes (cat fountains, pet camera, dog harness).

### Changed

- [app/guides/[slug]/page.tsx](app/guides/[slug]/page.tsx): when `relatedQuizSlug` is set, show a **Matching quiz** callout with link to `/quiz/{slug}`.

## [1.0.1] - 2026-04-10

### Added

- [components/SiteFooter.tsx](components/SiteFooter.tsx): Explore link to `/quiz` ("Pet problem solver quizzes").

### Changed

- [package.json](package.json): version **1.0.1** (aligns npm package with post-quiz release track).
- [docs/HANDOVER.md](docs/HANDOVER.md): quizzes in content table, homepage line, suggested next steps (deploy + Search Console), version blurb.
- [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md): note on quiz URLs and sitemap after quiz feature.

## [1.0.0] - 2026-04-10

### Added

- **Pet Problem Solver quizzes**: `/quiz` listing and `/quiz/[slug]` interactive flows with client-side scoring, product recommendations via `ProductCard`, and full SEO metadata.
- Three seed quizzes: "My cat won't drink enough" (Hydration), "I want to watch my pet when I'm out" (Home monitoring), "My dog pulls on the lead" (Training).
- [data/quizzes.json](data/quizzes.json), [types/quiz.ts](types/quiz.ts), [lib/getQuizzes.ts](lib/getQuizzes.ts): quiz data model with Zod validation.
- [components/QuizFlow.tsx](components/QuizFlow.tsx): `"use client"` stepper with intro, question, and results screens.
- [components/QuizCard.tsx](components/QuizCard.tsx): card component for quiz listing grid.
- Homepage: "Not sure where to start?" quiz CTA section.
- Nav: "Quiz" link in site header.
- Sitemap: `/quiz` and per-quiz routes.
- [public/llms.txt](public/llms.txt): quiz routes documented.

## [0.9.1] - 2026-04-11

### Added

- [docs/HANDOVER.md](docs/HANDOVER.md): onboarding snapshot for new Cursor sessions (URLs, Vercel, Search Console, DNS, scripts, security notes).

### Changed

- [README.md](README.md): AI/agents section links to HANDOVER.
- [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md): status snapshot and HANDOVER link.
- [.cursor/rules/project.md](.cursor/rules/project.md): pointer to HANDOVER.

## [0.9.0] - 2026-04-11

### Added

- Three new guides in [data/guides.json](data/guides.json): Automatic pet feeder buying guide UK, Best dog harness for pulling UK, Pet air purifier for dander UK — with FAQs and product links.
- [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md): post-launch steps for Vercel env, Search Console, Associates (dashboard tasks).

### Changed

- [lib/getGuides.ts](lib/getGuides.ts): guides sorted by `publishedAt` descending so the homepage teaser shows the newest first.
- [public/llms.txt](public/llms.txt): new guide URLs listed.
- [docs/DOMAIN.md](docs/DOMAIN.md): link to production checklist.

### Verified

- `python scripts/link-health.py --domain www.amazon.co.uk`: 50/50 product ASINs returned HTTP 200.

## [0.8.2] - 2026-04-10

### Added

- [scripts/windows-petgadgethub-dns-fix.ps1](scripts/windows-petgadgethub-dns-fix.ps1): flush Windows DNS and compare resolver vs Google (`npm run fix:dns:windows`).
- [docs/DOMAIN.md](docs/DOMAIN.md): “Still see old WordPress on your PC” — cache flush, DNS settings, optional hosts file, IPv6 note.

## [0.8.1] - 2026-04-10

### Added

- [scripts/verify-production-domain.mjs](scripts/verify-production-domain.mjs): `npm run verify:domain` — fails if `https://petgadgethub.co.uk` still serves WordPress (wrong DNS) instead of Vercel/Next.js.
- [.github/workflows/domain-health.yml](.github/workflows/domain-health.yml): weekly + manual GitHub Actions check using the same script.

### Changed

- [docs/DOMAIN.md](docs/DOMAIN.md): long-term DNS guidance (single authority, retire old host, automated checks).

## [0.8.0] - 2026-04-10

### Added

- **Guides section**: `/guides` and `/guides/[slug]` with [data/guides.json](data/guides.json), [types/guide.ts](types/guide.ts), [lib/getGuides.ts](lib/getGuides.ts), [components/GuideCard.tsx](components/GuideCard.tsx), Article + FAQ JSON-LD on guide pages.
- Three seed guides: Best GPS dog tracker UK, Cat water fountain buying guide, Best pet camera for a small flat.
- **Category hub**: `/categories` shows one [CategoryCard](components/CategoryCard.tsx) per category instead of all 50 products; [data/categories.json](data/categories.json) stores editorial intros per category slug.
- Homepage: "From the guides" teaser (three `GuideCard`s) and link to `/guides`.
- Footer: "Explore" links to `/guides` and `/categories`.

### Changed

- **SEO**: Per-route `alternates.canonical` on product, category, categories hub, and guides pages; Open Graph / Twitter on category pages; `collectionPageLd()` CollectionPage + ItemList JSON-LD on `/categories/[category]`; improved product meta descriptions; "Related picks" internal links on product pages.
- [app/sitemap.ts](app/sitemap.ts): `/guides` and per-guide URLs.
- [components/SiteHeader.tsx](components/SiteHeader.tsx): "Guides" in nav; hide "Our picks" and "Privacy" on narrow viewports (still in footer).
- [public/llms.txt](public/llms.txt): Guides section and updated key pages (category hub, `/guides`).
- [docs/DOMAIN.md](docs/DOMAIN.md): Google Search Console — resubmit `sitemap.xml` after shipping new routes.

## [0.7.0] - 2026-04-09

### Added

- Category landing pages at `/categories` and `/categories/[category]` with `generateStaticParams` for all product categories.
- [components/CategoryNav.tsx](components/CategoryNav.tsx): Wirecutter-style category pill row on the homepage.
- [lib/categorySlug.ts](lib/categorySlug.ts): `slugFromCategory()` and `labelFromSlug()` helpers.
- [lib/jsonLd.ts](lib/jsonLd.ts): `breadcrumbLd()` for category pages.
- [app/sitemap.ts](app/sitemap.ts): `/categories` and per-category URLs.
- [scripts/fix-broken-product-images.py](scripts/fix-broken-product-images.py): regenerates all product `imageSrc` values from verified Unsplash and Pexels URL lists.

### Changed

- Homepage now shows 8 featured picks instead of all 50, adds a "Browse by category" section above the grid, and links to all picks below.
- [components/ProductGrid.tsx](components/ProductGrid.tsx): replaced the bento-style featured split with a uniform 2-column / 3-column XL grid.
- [components/SiteHeader.tsx](components/SiteHeader.tsx): "All picks" now links to `/categories`.
- [data/products.json](data/products.json): Wirecutter-style `problem`, `solution`, `verdict`, and `tagline` updates for `tractive-gps-dog-6`, `petlibro-stainless-fountain`, `kasa-smart-pet-cam`, `petsafe-scoopfree-ultra-litter-box`, and `kong-classic-dog-toy`.
- [scripts/link-health.py](scripts/link-health.py): defaults to `www.amazon.co.uk`, uses a browser-like user agent, adds polite delay and retry handling, and supports `--check-both` and `--domain`.
- [public/llms.txt](public/llms.txt): added category browse routes to the key pages list.
- [next.config.ts](next.config.ts): `images.remotePatterns` includes `images.pexels.com` so `next/image` can optimize Pexels hero URLs.

### Fixed

- Broken product hero images: many `imageSrc` values used invalid Unsplash photo IDs (HTTP 404). All 50 products now use verified **Unsplash** and **Pexels** URLs (unique per card). These remain editorial placeholders; **Amazon Product Advertising API (PA-API)** product images can replace them after Associates programme acceptance and API access.

## [0.6.0] - 2026-04-10

### Added

- Fifteen new product guides in [data/products.json](data/products.json) (**50 total**): PetSafe ScoopFree Ultra, iFetch launcher, Petcube Bites 2 Lite, Arlo Essential Indoor, KONG Extreme Large, Greenies Teenie, PetSafe Smart Feed Wi-Fi, oneisall grooming clippers, Outward Hound DayPak, Kurgo Tru-Fit, Chuckit Ultra Ball, Petmate Ultra Vari Kennel, Levoit Core 300, simplehuman pet food can, Wobble Wag Giggle Ball.

### Fixed

- Petmate Ultra Vari Kennel ASIN corrected to `B000R3J5L0` (36 in. listing).

### Changed

- [public/llms.txt](public/llms.txt): 50 picks.

## [0.5.0] - 2026-04-09

### Added

- ScoreBox component on product pages: editorial score (1-10), The good / The bad, verdict; fields in [types/product.ts](types/product.ts) and [data/products.json](data/products.json).
- Product JSON-LD: `AggregateRating` and `Review` in [lib/jsonLd.ts](lib/jsonLd.ts) when `score` is set.
- Bento-style homepage grid: first product card featured (two columns on xl), second card in the top row; [components/ProductGrid.tsx](components/ProductGrid.tsx), `featured` prop on [components/ProductCard.tsx](components/ProductCard.tsx).
- Ten new product guides (35 total): FURminator deShedding, Gentle Leader, ThunderShirt, Catit Flower Fountain, Wyze Cam v3, Drinkwell Platinum, Halti Optifit, JW Hol-ee Roller, Sherpa Original Deluxe carrier, Earth Rated wipes.

### Changed

- [public/llms.txt](public/llms.txt): 35 picks.

## [0.4.0] - 2026-04-11

### Added

- Ten new product guides in [data/products.json](data/products.json) (25 total): SureFeed microchip feeder, Bissell handheld pet vacuum, KONG Classic, Nina Ottosson Dog Brick, Chuckit launcher, Ruffwear Front Range harness, cooling gel mat, car seat hammock, Petcube Cam, Outward Hound Slo Bowl.
- [public/llms.txt](public/llms.txt) updated for 25 products.

## [0.3.0] - 2026-04-10

### Added

- [.cursorignore](.cursorignore) to reduce noisy paths for Cursor indexing.
- [docs/DOMAIN.md](docs/DOMAIN.md): Vercel + DNS steps for petgadgethub.co.uk and `NEXT_PUBLIC_SITE_URL`.
- Nine new product guides in [data/products.json](data/products.json) (15 total): Tractive cat GPS, Furbo 360, AirTag collar holder, Casfuy nail grinder, DogRook vibration bark collar, Petsfit airline carrier, Bonza collapsible bowl, self-cleaning slicker brush, Blink Mini.
- [public/llms.txt](public/llms.txt) updated for 15 products and primary .co.uk URL.

### Changed

- [.cursor/rules/project.md](.cursor/rules/project.md): CTA copy aligned with UI; link to changelog.
- [README.md](README.md): links to domain setup doc and petgadgethub.co.uk.

## [0.2.0] - 2026-04-10

### Added

- Product cards: approximate Amazon rating/review counts, `whyWePicked` one-liners.
- Product pages: three Amazon CTA blocks (`AmazonCta`), social proof lines.
- [lib/formatAmazonSocialProof.ts](lib/formatAmazonSocialProof.ts) for review line formatting.
- Homepage copy refresh; section title "What we are recommending right now"; removed debug-style Amazon tag line from hero.

### Changed

- Primary Amazon button label: "See it on Amazon" (with arrow) on cards and detail CTAs.
- Editorial block: "PetGadgetHub editorial" instead of a fictional byline.

## [0.1.1] - 2026-04-09

### Fixed

- Amazon product URLs: corrected ASINs and `linkCode=ogi`; `AffiliateLink` sets `href` explicitly.
- JSON-LD `Offer.url` uses same URL builder as buttons.

### Added

- SEO: Organization/WebSite/Product/FAQ JSON-LD; per-product FAQs in data and UI; [public/llms.txt](public/llms.txt).
- Root metadata: keywords, Open Graph defaults, robots, Twitter card.

## [0.1.0] - 2026-04-09

### Added

- Initial Next.js 15 app: geo middleware, affiliate tags (US/UK), `data/products.json` + Zod types.
- Pages: home, product detail, about, privacy, rental resume tool, internal sales tracker.
- FTC disclosure banner, cookie banner, sitemap/robots, `DisclosureBanner` / `AffiliateLink` compliance.
