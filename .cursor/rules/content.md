# PetGadgetHub — content style rules

Auto-loaded by Cursor for every session. Follow these for all content in `data/products.json`, `data/guides.json`, `data/quizzes.json`, and any UI copy.

---

## Voice

**Direct, honest, specific. Slightly dry. Never enthusiastic.**

We are pet owners who got tired of vague five-star reviews. We write the way we talk to friends: what broke, what helped, and what is not worth the hype.

**Good:**
> "A dog that slips a lead or finds a gap in the fence can be a mile away in under ten minutes. GPS trackers do not prevent that — but they shrink the search from hours to minutes."

**Bad:**
> "This amazing GPS tracker will give you complete peace of mind knowing your beloved pet is always safe!"

**Audience:** The reader is often a worried or frustrated pet owner who is not an expert. They might be searching "why won't my cat drink water" at 11pm. Write as if explaining to a smart friend — but one who has never bought this type of product before.

**Rules:**
- One sentence, one idea. Short is almost always better.
- Name the specific problem before any product name.
- If a product has a real limitation, say so plainly. Readers trust honesty more than confidence.
- No superlatives: not "best", "amazing", "perfect", "revolutionary".
- No fake urgency: no "limited time", "selling fast", "don't miss out".
- No hedging filler: not "may potentially help", "could possibly be useful".
- **Never fabricate data.** Do not invent test results, claim to have tested products, cite made-up statistics, or attribute opinions to vets/experts without a real source. If you want to convey "many owners report X", say exactly that — do not invent a number.
- UK English spelling throughout: colour, behaviour, favourite, neighbour, organise.

---

## Product copy fields

### `tagline` (1 sentence, max 12 words)
Our editorial position in a single line. States what it is best at.
- Good: `"Our pick for picky cat hydration."`
- Good: `"Our pick for live GPS on escape-risk dogs."`
- Bad: `"A great product that many pet owners love!"`

### `problem` (2–4 sentences)
Name the problem and the person who has it. Then say who should skip this product. Be specific about both.
- Good: `"Indoor cats on dry food that ignore a still bowl are quietly risking kidney strain. Moving water triggers the drinking reflex. Anyone unwilling to clean a fountain weekly should not buy one — a neglected fountain grows slime faster than a bowl does."`
- Bad: `"Who it is for: indoor cats. Who should skip: people who don't want to clean it."` ← too formulaic, too thin

Name a real scenario, not a category. "A dog that bolts when it spots a squirrel" beats "active dogs".

### `solution` (2–4 sentences)
Explain the mechanism — why this product works. Do not just restate the tagline. Include one practical detail a buyer might not expect.
- Good: `"The stainless bowl resists the micro-scratches that harbour bacteria on plastic. The pump is quiet enough that most cats do not startle. Filter replacement takes under two minutes once you do it the first time."`
- Bad: `"Great product that solves the problem of cats not drinking enough water."`

### `honestNote` (1–2 sentences, optional but usually worth including)
The thing most buyers overlook that will cause them to regret the purchase or under-use the product. Not a disclaimer — a genuine heads-up from someone who has used it.
- Good: `"Battery life drops significantly below 4°C — if your dog sleeps outside in winter, factor that in."`
- Good: `"These work best with dry kibble. Wet food or mixed diets need a different approach."`
- Bad: `"Please note that results may vary."` ← useless

### `verdict` (1 sentence)
One conclusive line. Who should buy it; the one condition or caveat. Reads like what you'd say to a friend on the doorstep.
- Good: `"Our default fountain for cats that need a hydration nudge — but only if you will keep up with cleaning."`
- Good: `"Buy it for dependable dry-food schedules — just confirm your kibble size fits the chute."`
- Bad: `"A great product overall, highly recommended for most pet owners."` ← non-committal

### `whyWePicked` (1 sentence, max 20 words)
A plain-language reason that explains the editorial decision. Not a marketing claim — the single most important reason this product made the list over alternatives.
- Good: `"Live tracking and virtual fences are the features people actually use when a dog slips the lead."`
- Good: `"No refills, works on sofas and car seats, and the review count speaks for itself."`
- Bad: `"This is a top-rated product with excellent customer satisfaction."` ← could describe anything

### `score` (integer 1–10)
Our editorial score, displayed in the ScoreBox. Not an average of pros and cons — it reflects how confidently we would recommend this to the specific person described in `problem`.
- **9–10:** Default recommendation for its category. We would buy it again without hesitation.
- **7–8:** Good pick with a meaningful caveat. Works well for the right person.
- **5–6:** Usable but there are better options in most situations.
- **Below 5:** We would not normally list it. If it appears, the `honestNote` must explain why.

### `pros` (3 bullets, max 10 words each)
Specific benefits, not marketing claims. Name what you can observe.
- Good: `"Stainless bowl is easier to clean than scratched plastic"`
- Bad: `"High quality materials for long lasting durability"`

### `cons` (2–3 bullets, max 10 words each)
Real drawbacks, not softened disclaimers. If a con is a dealbreaker for some buyers, say so.
- Good: `"Requires £4–5/month subscription — no subscription, no live tracking"`
- Bad: `"Subscription required for some features"` ← too soft

### `faq` (2–3 questions per product)
Questions real buyers type into Google before purchasing — not "What is X?" definitions.
- Good: `"Does the Tractive GPS work without a subscription?"`
- Good: `"Can I use this camera in a room with no Wi-Fi extender?"`
- Bad: `"What is a GPS tracker?"` ← not a buying question

Answers: 2–4 sentences. State the direct answer in sentence one. Then qualify or explain. No padding.

---

## Guide copy

### Summary (2–3 sentences)
Opens with the problem as a lived experience, not a category description. States what the guide covers and why it is worth reading.
- Good: `"Lost dogs are not a small problem. We looked at four trackers — live GPS, subscription costs, collar weight, and battery life — to find the one most UK dog owners will actually keep using."`
- Bad: `"This guide covers GPS trackers for dogs. We will look at several options on the market."`

### Intro body block (opening paragraph)
One sharp paragraph that puts the reader in the situation before any product is mentioned. Creates stakes.
- Good: `"A dog that slips a lead or finds a gap in the fence can be a mile away in under ten minutes. GPS trackers do not prevent that — but they shrink the search from hours to minutes. The question is which one is worth the subscription."`

### h2 headings
Short, plain, scannable. State what the section answers — not a topic label.
- Good: `"What about Apple AirTag?"` / `"The one thing most buyers get wrong"` / `"Our top pick: Petlibro Stainless Steel Fountain"`
- Bad: `"Overview"` / `"Product Details"` / `"Pros and Cons"`

### Body paragraphs (3–5 sentences each)
One idea per paragraph. End each one with the implication or recommendation — do not leave the reader to infer it.

### Guide FAQ (2–4 questions)
Same rules as product FAQ. Real pre-purchase questions. Direct answers.

### UK context in guides
- Mention UK subscription pricing in £ where relevant.
- Reference UK-specific concerns (e.g. countryside walks, UK dog laws, UK-available products).
- Link to amazon.co.uk products where possible; guides are written for a primarily UK audience.

---

## Quiz copy

### Quiz title
A problem statement in first person. Not a category label.
- Good: `"My dog pulls on the lead"` / `"I'm worried my pet could get lost"`
- Bad: `"Dog walking gear quiz"` / `"GPS tracker selector"`

### Question text
Plain, conversational, concrete. Avoid jargon.
- Good: `"How big is your dog?"` / `"If they bolt, what is the realistic worst case?"`
- Bad: `"Please select your dog's weight category for product compatibility purposes."`

### Answer option labels
Short phrases, conversational. One or two concrete details.
- Good: `"Open country — they could be miles away"` / `"Dense city and I use an iPhone"`
- Bad: `"Option A: Rural or suburban environment with high escape risk"` ← too formal

### Quiz disclaimer
Honest, brief, non-legal. Mentions the real limitation of quiz recommendations and the affiliate relationship.
- Always end with: "No data is stored." (client-side only, true statement)

---

## What to avoid everywhere

| Avoid | Use instead |
|-------|-------------|
| "perfect for" | "works well for" / "suits" |
| "amazing", "incredible", "revolutionary" | specific claim instead |
| "peace of mind" | name what it actually does |
| "easy to use" | specify what is easy and why |
| "high quality" | name the material or mechanism |
| "most pet owners" | "dogs over 4kg" / "indoor cats on dry food" |
| Passive voice | Active — say who does what |
| Sentence-long caveats at the end | Lead with the caveat if it is important |
| Invented statistics or test results | Say "many owners report" or cite a real source |
| "We tested" (unless actually tested) | "Based on owner reviews and specs" |

---

## UK / regional notes

- Default audience is UK. Write in British English.
- Prices in £ when mentioned. Subscriptions as monthly cost in £.
- Amazon links use `amazon.co.uk` for UK visitors (handled by middleware automatically — do not hard-code regions in copy).
- Products available only in the US should be noted; most picks in this catalogue are available on both amazon.co.uk and amazon.com.

---

## Model selection guide

| Task | Model |
|------|-------|
| New product copy (`problem`, `solution`, `honestNote`, `verdict`) | **Opus** |
| New guide body (full article draft) | **Opus** |
| Rewriting weak existing product copy | **Opus** |
| Adding FAQ questions to existing products | **Sonnet** |
| New quiz flow (`data/quizzes.json`) | **Sonnet** |
| New guide structure (headings, summary) | **Sonnet** |
| All code changes (routes, components, JSON schema, sitemap) | **Sonnet** |
| Documentation updates (HANDOVER, CHANGELOG, llms.txt) | **Sonnet** |
| Single-file edits, nav/footer links, version bumps | **Auto** |
| Commits and pushes | **Auto** |

**Rule of thumb: Content = Opus. Code = Sonnet. Plumbing = Auto.**
