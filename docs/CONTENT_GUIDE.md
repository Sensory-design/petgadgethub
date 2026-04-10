# PetGadgetHub — Content Guide

**Last updated:** 2026-04-10  
**For:** anyone writing product copy, guides, quiz questions, or UI text for this site.  
**Short version:** `.cursor/rules/content.md` — that file is auto-loaded by Cursor for AI sessions.

---

## What this site is trying to do

Most affiliate review sites dump 40 products on a page, call each one "the best", and earn money when a confused reader gives up and clicks something. PetGadgetHub is built on the opposite bet: that readers who feel *understood* click more, come back, and trust the recommendations enough to act on them.

Every piece of copy should serve one of two purposes:
1. Help the reader decide whether this product is for them — including whether it is *not* for them.
2. Explain why a problem exists and what tends to fix it — before naming any product.

If the copy does neither, it is marketing. We do not do marketing.

---

## The voice

**Direct. Honest. Specific. Slightly dry. Never enthusiastic.**

We write the way you talk to a friend — but the reader is often a worried or frustrated pet owner who has never bought this type of product before. They might be searching "why won't my cat drink water" at 11pm. The voice is confident and informed; the explanations assume no prior knowledge.

The person speaking:
- Does not oversell
- Names the drawback before you ask
- Gives you a concrete recommendation rather than a list of options with no opinion
- Treats you like an adult who can handle the truth that a product has flaws

**The two things that kill the voice:**

**1. Enthusiasm creep.** Words like "amazing", "incredible", "love", "perfect" feel like a sponsored post. Real opinions are measured. If a product is genuinely excellent, the evidence makes the case — not an adjective.

**2. Generic claims.** "High quality", "easy to use", "great for pet owners", "peace of mind" — these could describe anything or nothing. Replace every generic claim with a specific one. Not "durable" but "the strap is reinforced nylon rated for dogs up to 50 kg". Not "easy to set up" but "most people finish the app setup in under ten minutes".

**3. Fabricated evidence.** Never invent test results, claim to have tested products, cite made-up statistics, or attribute opinions to vets/experts without a real source. If many owners report something, say "many owners report X" — do not invent a number or a study. The site's credibility depends on never saying anything it cannot back up.

---

## Product copy — field by field

All product content lives in `data/products.json`. Each product has these content fields:

### `tagline`
One sentence, twelve words maximum. Our editorial position on this product. States the use case, not a superlative.

```
Good: "Our pick for picky cat hydration."
Good: "Our pick for live GPS on escape-risk dogs."
Bad:  "The best pet camera for every home!"
```

The tagline appears on product cards across the site. It needs to do two things: tell the right reader "this is for me" and tell the wrong reader "this is not for me". A tagline like "a great all-rounder" does neither.

---

### `problem`
2–4 sentences. This is the most important field on the product page.

**Structure:**
1. Describe the real situation that drives someone to buy this product — not the product category.
2. Explain why the problem exists or why common solutions fail.
3. Say plainly who should *not* buy this. This is what separates editorial from marketing.

```
Good:
"Indoor cats on dry food that ignore a still water bowl are quietly risking kidney strain over 
years. Moving water triggers the drinking reflex that evolved around streams — a bowl of standing 
water reads as stagnant and unsafe. Anyone unwilling to clean the fountain weekly should not buy 
one: a neglected fountain grows bacteria faster than a bowl does."

Bad:
"Who it is for: cats that don't drink enough. Who should skip: people who don't like cleaning."
```

The bad example is a template. It communicates almost nothing. The good example puts you in the situation, explains the mechanism, and earns the trust to give a real recommendation.

**Name a scenario, not a category.** "A dog that bolts when it spots a squirrel" is more useful than "active dogs". "Renters who cannot drill into walls" is more useful than "people in rented properties".

---

### `solution`
2–4 sentences. Explains *how* the product addresses the problem — the mechanism, not just the outcome.

```
Good:
"The stainless bowl resists the micro-scratches that harbour bacteria on plastic. The pump is 
quiet enough that most cats do not startle when they approach. Filter replacement takes under 
two minutes once you do it the first time."

Bad:
"This fountain solves the problem of cats not drinking enough by providing fresh flowing water 
that cats enjoy."
```

The bad example restates the category. The good example gives the reader three specific things to expect. Include at least one detail they would not know without having used the product.

---

### `honestNote`
1–2 sentences. Optional but almost always worth including.

This is the thing most buyers overlook that causes them to under-use the product or regret the purchase. It is not a legal disclaimer. It is what a friend would say: "just so you know..."

```
Good: "Battery life drops significantly in cold weather — if your dog sleeps outside in winter, 
       that affects the interval between charges."
Good: "These work best with dry kibble. Wet food or mixed diets need a different approach."
Bad:  "Please note that individual results may vary based on usage conditions."
```

The last one is a legal boilerplate. It tells the reader nothing. The first two are genuinely useful warnings.

---

### `verdict`
One sentence. Conclusive. The recommendation with its one condition or caveat.

Read it aloud as if you are standing on a doorstep giving a friend a quick answer before they make a decision. If it sounds like a sentence you would never actually say, rewrite it.

```
Good: "Our default fountain for cats that need a hydration nudge — but only if you will 
       keep up with cleaning."
Good: "Buy it for dependable dry-food schedules — just confirm your kibble size fits the chute."
Bad:  "A great product overall, highly recommended for most pet owners looking for a quality 
       solution."
```

The bad example is content-free. It could describe literally anything.

---

### `whyWePicked`
One sentence, twenty words maximum. The single most important editorial reason this product is on the site. This is not a marketing claim — it is the answer to "why this one and not the twenty others on Amazon?"

```
Good: "Live tracking and virtual fences are the features people actually use when a dog slips the lead."
Good: "No refills, works on sofas and car seats, and the review count speaks for itself."
Bad:  "This is a top-rated product with excellent customer satisfaction."
```

The bad example could describe anything. The good examples name a concrete differentiator.

---

### `score` (integer, 1–10)
The editorial score displayed in the ScoreBox on the product page. This is not a calculated average. It reflects how confidently we would recommend this product to the specific reader described in the `problem` field.

| Range | Meaning |
|-------|---------|
| 9–10 | Default recommendation for its category. We would buy it again without thinking. |
| 7–8 | Good pick with a meaningful caveat. Right for the right person. |
| 5–6 | Usable but outclassed. Usually there is something better in the same category. |
| Below 5 | We would not normally list it. If present, the `honestNote` must explain why. |

---

### `pros` — 3 bullets
Specific, observable benefits. Max 10 words each.

- Name what you can see or measure, not what you can feel.
- "Stainless bowl is easier to clean than scratched plastic" — specific comparison.
- "High quality materials" — not a pro. That is a claim. What specifically is high quality?

---

### `cons` — 2–3 bullets
Real drawbacks. Do not soften them.

If a con is a dealbreaker for a certain buyer type, say so. "Requires £4–5/month subscription — no subscription, no live tracking" is more honest than "Subscription required for some features". The first one actually helps someone decide.

---

### `faq` — 2–3 questions per product
These are the questions a real buyer types into Google in the 24 hours before purchasing. They are not definitions or explainers about the category.

**Good FAQ questions:**
- "Does the Tractive GPS work without a subscription?"
- "Can I use this camera in a room without Wi-Fi?"
- "Is stainless steel safer than plastic for a cat fountain?"
- "Will this fit a labrador?"

**Bad FAQ questions:**
- "What is a GPS tracker?" — not a buying question
- "Why should I buy this product?" — too promotional
- "What are the benefits of automatic feeders?" — too generic

**FAQ answers:** State the direct answer in sentence one. Then qualify, explain context, or add a practical detail. 2–4 sentences. No padding, no "great question!".

---

## Guide copy

Guides live in `data/guides.json`. They are longer reads (5–8 minutes) that cover a buying decision, not a single product. Currently we have six guides; each maps to a product category.

### What a good guide does that a product page cannot

A product page answers "is this specific product right for me?". A guide answers "what should I even be looking for?" — the question someone asks before they know which product to consider.

Guide copy is allowed to be slower, more discursive, and more opinionated. It should feel like a long message from someone who spent a week researching so you do not have to.

### Summary (2–3 sentences)
Opens with the problem as a lived experience. States what you cover and why it is worth reading.

```
Good: "Lost dogs are not a small problem. We looked at four trackers — live GPS, subscription 
      costs, collar weight, and battery life — to find the one most UK dog owners will actually 
      keep using."

Bad: "This guide covers the best GPS trackers for dogs. We will review several popular options 
     and help you find the right one."
```

### Intro body block
One paragraph. Put the reader in the situation before any product is mentioned. Create stakes. Why does this decision matter?

```
Good: "A dog that slips a lead or finds a gap in the fence can be a mile away in under ten 
      minutes. GPS trackers do not prevent that — but they shrink the search from hours to 
      minutes. The question is which one is worth the subscription."
```

### h2 headings
Short, plain, specific. State what the section answers — not just what it is about.

```
Good: "What about Apple AirTag?"
Good: "The one thing most buyers get wrong"  
Good: "Our top pick: Petlibro Stainless Steel Fountain"
Bad:  "Overview of Available Options"
Bad:  "Product Comparison"
```

### Body paragraphs
One idea per paragraph. 3–5 sentences. End each paragraph with the implication — the thing the reader should do or know as a result of what you just said. Do not leave them to infer it.

### Guide FAQ
Same rules as product FAQ. Real pre-purchase questions. Direct answers in 2–4 sentences.

---

## Quiz copy

Quizzes live in `data/quizzes.json`. They use a boost-scoring model: each answer awards points to product slugs, and the top 3 results appear on the results screen.

### Quiz title
A first-person problem statement. Not a category name or a neutral topic.

```
Good: "My dog pulls on the lead"
Good: "I'm worried my pet could get lost"
Bad:  "Dog walking gear quiz"
Bad:  "GPS tracker selector"
```

The title is what appears on the quiz card on `/quiz`. It should make a reader think "that's me" within two seconds.

### Question text
Conversational. Concrete. Avoid anything that sounds like a form field.

```
Good: "How big is your dog?"
Good: "If they bolt, what is the realistic worst case?"
Bad:  "Please select the appropriate weight category for your pet."
```

### Answer options
Short, plain phrases. Include one concrete detail that helps the reader self-identify.

```
Good: "Open country — they could be miles away"
Good: "Dense city and I use an iPhone"
Bad:  "Option A: Rural or suburban environment with elevated escape risk"
```

### Disclaimer
Brief, honest, non-legal. States the real limitation of quiz recommendations and the affiliate relationship. End with "No data is stored." — this is true (client-side only) and reassuring.

---

## Prohibited phrases and patterns

| Do not use | Why / what to use instead |
|------------|--------------------------|
| "amazing", "incredible", "revolutionary" | Unverifiable. Use a specific claim instead. |
| "perfect for" | Nothing is perfect. Use "works well for" or "suits". |
| "peace of mind" | Meaningless. Name what it actually does. |
| "easy to use" | Specify what is easy and why, or skip it. |
| "high quality" | Name the material, mechanism, or measurement. |
| "most pet owners" | Say who specifically. "Dogs over 4 kg." "Indoor cats on dry food." |
| "comprehensive", "wide range of" | Weak filler. Cut it. |
| "state-of-the-art" | Meaningless. |
| Sentence-long caveats buried at the end | Lead with the caveat if it is important enough to mention. |

---

## UK context

This site is written for a primarily UK audience with US as a secondary market. Geo-targeting (middleware, affiliate tags) handles the link destinations automatically. The copy should reflect UK context.

**Specifically:**
- British English spelling throughout: colour, behaviour, favourite, organise, recognise.
- Prices in £ when mentioned in copy. Monthly subscription costs stated as £/month.
- UK-specific details where relevant: countryside escapes (not "backyards"), walks in parks and fields, reference to UK-available products.
- Products not available on amazon.co.uk should be noted in the relevant product's `honestNote`.

---

## Length targets

| Field | Target |
|-------|--------|
| `tagline` | 1 sentence, max 12 words |
| `whyWePicked` | 1 sentence, max 20 words |
| `problem` | 2–4 sentences |
| `solution` | 2–4 sentences |
| `honestNote` | 1–2 sentences |
| `verdict` | 1 sentence |
| `score` | Integer 1–10 (see calibration table) |
| Each `pros` / `cons` bullet | Max 10 words |
| Each FAQ answer | 2–4 sentences |
| Guide `summary` | 2–3 sentences |
| Guide intro body block | 3–5 sentences |
| Guide body paragraph | 3–5 sentences |
| Guide total body | 400–800 words |

---

## Which AI model to use for which task

| Task | Model |
|------|-------|
| New product copy from scratch (`problem`, `solution`, `honestNote`, `verdict`) | **Opus** |
| Full new guide draft (body, headings, summary) | **Opus** |
| Rewriting weak existing product copy | **Opus** |
| Writing this content guide, rules files | **Opus** |
| Adding FAQ questions to existing products | **Sonnet** |
| New quiz flow (`data/quizzes.json`) | **Sonnet** |
| New guide structure (headings and summary, body to be filled by Opus) | **Sonnet** |
| All code changes — routes, components, JSON schema, sitemap, quiz logic | **Sonnet** |
| Documentation updates (HANDOVER, CHANGELOG, llms.txt, README) | **Sonnet** |
| Single-file edits — moving a section, adding a nav link, version bumps | **Auto** |
| Commits and pushes | **Auto** |
| Readonly questions — what does this file do, what is the sitemap priority | **Auto** |

**Rule of thumb: Content = Opus. Code = Sonnet. Plumbing = Auto.**

This is not about quality for its own sake. Opus produces meaningfully more specific, voice-consistent, non-generic copy for editorial content. For code, Sonnet is as capable and costs significantly less per session. For single-file plumbing tasks, Auto is sufficient and free.

---

## What good copy sounds like — reference examples

These are from the existing site and represent the voice at its best. Use them as a calibration point.

**Product intro (GPS guide):**
> "A dog that slips a lead or finds a gap in the fence can be a mile away in under ten minutes. GPS trackers do not prevent that — but they shrink the search from hours to minutes. The question is which one is worth the subscription."

**Product verdict:**
> "Our default fountain for cats that need a hydration nudge — but only if you will keep up with cleaning."

**Honest note:**
> "Battery life and subscription terms depend on the plan you choose; read the details before you buy."

**Guide body paragraph:**
> "The AirTag collar holder is popular because AirTag itself costs very little and there is no subscription. The catch: AirTag is Bluetooth, not cellular GPS. It relies on other iPhone users walking near your dog to update the location. In a busy city park that can work. On a quiet country road it can show the same location for hours."

These work because they are specific, honest, and end with a clear implication for the reader.
