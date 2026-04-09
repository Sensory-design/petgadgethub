# PetGadgetHub

Problem-first pet tech guides with Amazon affiliate links. Next.js 15 (App Router), Tailwind, deployed on Vercel.

**Live site:** [https://petgadgethub.vercel.app](https://petgadgethub.vercel.app) (production custom domain: **petgadgethub.co.uk** — see [docs/DOMAIN.md](docs/DOMAIN.md))

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm

## Setup

```bash
git clone https://github.com/Sensory-design/petgadgethub.git
cd petgadgethub
npm install
```

Copy environment template and adjust:

```bash
copy .env.example .env.local
```

See [.env.example](.env.example) for `NEXT_PUBLIC_SITE_URL`, optional Amazon Creators API, internal route secret, and Stripe keys for `/tools/rental-resume`.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Dev server (Turbopack) at http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint |
| `npm run metadata:update` | Runs `scripts/metadata-updater.ts` |

## Deploy

Connect the GitHub repo to [Vercel](https://vercel.com). Set `NEXT_PUBLIC_SITE_URL` to your primary URL (e.g. `https://petgadgethub.co.uk`) in Project Settings → Environment Variables. Step-by-step DNS: [docs/DOMAIN.md](docs/DOMAIN.md).

## Project layout (high level)

- `app/` — routes (home, products, tools, privacy, internal)
- `components/` — UI including `AffiliateLink`, product cards
- `data/products.json` — product copy and ASINs (with `types/product.ts` Zod schema)
- `lib/` — affiliate URLs, geo region, `getProducts()` waterfall
- `middleware.ts` — geo cookie `pgb_region`, optional `/internal` gate
- `extension/` — Chrome extension (separate from Next app)
- `automation/` — Python batch scripts

## Changelog

Human-readable release notes: [CHANGELOG.md](CHANGELOG.md).

## AI / agents

Cursor project rules: [.cursor/rules/project.md](.cursor/rules/project.md). Machine-oriented site summary for LLMs: [public/llms.txt](public/llms.txt) (served at `/llms.txt` when deployed).
