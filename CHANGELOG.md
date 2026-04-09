# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
