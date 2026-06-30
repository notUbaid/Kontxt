---
title: Product Descriptions
slug: product-descriptions
phase: Phase 5
mode: production
projectType: ecommerce
estimatedTime: 15-20 min
---

# Product Descriptions

Photography earns attention. Description earns the decision. This is the copy that answers the questions a customer can't ask in person: what's it made of, what's it for, will it work for me, what happens if it doesn't.

---

## Where This Fits

This fills the content fields your Product Architecture (Phase 2) already defined. If your schema doesn't yet have a clear place for structured details (materials, dimensions, care instructions) separate from a free-text description, that's worth fixing before writing copy for dozens of products.

---

## Why This Matters for a Store Specifically

Generic, thin product descriptions do two kinds of damage:

- **Conversion** — customers who can't picture using the product, or who have an unanswered question, leave instead of buying
- **SEO** — search engines (and AI shopping assistants, increasingly) rely on description text to understand and surface your products; copy-pasted manufacturer text ranks worse and may not be unique enough to index well

> **💡 Tip:** Returns are frequently caused by description gaps, not product defects — a customer orders based on incomplete information, and the product technically matches the listing but doesn't match what they assumed. Specific, complete descriptions reduce returns, not just increase conversion.

---

## What You're Building Today

- A consistent description structure used across every product
- Descriptions that answer real pre-purchase questions, not just adjectives
- Structured details (materials, dimensions, care) separated from narrative copy
- SEO-aware copy that's still written for humans first

You're **not** writing marketing-agency-grade brand copywriting or A/B testing description variants — that's a Phase 6 growth concern, once you have traffic to test against.

---

## The Structure That Works

| Section | Purpose | Length |
|---|---|---|
| Headline/title | Clear, specific product name | Short — no marketing fluff |
| One-line hook | The single most useful thing to know | 1 sentence |
| Description body | What it is, what it's for, who it's for | 2-4 short paragraphs |
| Structured specs | Materials, dimensions, weight, care | Bullet list, not prose |
| Shipping/returns note | Brief, links to full policy | 1 sentence + link |

> **⚠️ Warning:** Don't bury structured specs (dimensions, materials) inside paragraph text. Customers scan for this information specifically — if it's not in a scannable list, many won't find it at all, and will assume it's missing rather than search for it.

---

## What Actually Answers a Buying Question

Before writing, list the real questions a customer has for *this specific product* — not generic copywriting advice. For a physical product, that's usually some mix of:

- What's it made of, and is that material durable/washable/breathable/etc.?
- What size is it, and how do I know it'll fit my situation?
- What's it good for — and just as usefully, what's it *not* good for?
- What happens if I don't like it (ties to your Return Policy)?

> **✅ Best Practice:** Write the one-line hook last, after the full description. It's easier to find the single most compelling, specific fact about a product once you've already written the full picture, rather than trying to invent a hook first.

---

## Implementation

**Copy Prompt:**

```
Write a product description for my e-commerce store using this
structure: headline, one-line hook, 2-4 short paragraphs, then a
structured bullet list of specs.

Product: [name]
Key facts: [materials, dimensions, weight, color options — whatever
you actually know about the product]
Who it's for: [intended use/customer]
What makes it different from similar products: [if anything]

Write for a customer who has 10 seconds to decide whether to keep
reading. Avoid generic adjectives ("amazing," "premium," "high-quality")
unless backed by a specific fact in the same sentence. Don't invent
specs or claims I haven't given you — flag anything you're unsure
about instead of guessing.
```

> **⚠️ Warning:** Always explicitly tell AI not to invent specs, materials, or claims it wasn't given. A confidently written but inaccurate description ("100% organic cotton" for a blend you never specified) creates a real liability and a near-certain return or complaint when the customer notices the mismatch.

---

## SEO Without Sounding Like SEO Copy

- Use the product's actual common search terms naturally in the headline and first paragraph (the material, the use case, the type of item) — don't force-repeat keywords unnaturally
- Write a unique description for every product, even near-identical variants — duplicate or templated text across products is treated as lower-quality by search engines and gives customers nothing new to read
- Structured specs (materials, dimensions) double as content search engines can match against specific buyer searches ("waterproof canvas tote," not just "tote")

---

## Common Mistakes

- Copy-pasting manufacturer or supplier description text verbatim — thin, often poorly written, and identical to dozens of other stores selling the same product
- Generic adjective stacking ("amazing," "must-have," "premium quality") with no specific fact backing any of it
- Burying dimensions/materials in paragraph text instead of a scannable list
- Letting AI invent plausible-sounding specs you never actually provided
- Writing one strong description for the flagship product, then thin one-liners for the rest of the catalog — consistency matters as much in copy as in photography

---

## Validation Checklist

- [ ] Every product follows the same structural pattern (headline, hook, body, specs)
- [ ] No description contains a claim or spec you didn't personally verify
- [ ] Structured specs are in a scannable list, not buried in prose
- [ ] Spot-check 3-5 descriptions for generic adjectives with no supporting fact — rewrite or remove them
- [ ] Each product's description is meaningfully unique, not a templated swap of one or two words

---

## AI Review Prompt

```
Review these product descriptions for an e-commerce store:

[paste 2-3 descriptions]

Check for:
1. Any claim or spec that sounds invented rather than grounded in
   specific facts I provided
2. Generic adjectives with no supporting detail in the same sentence
3. Whether structured specs (materials, dimensions) are scannable or
   buried in paragraph text
4. Whether descriptions are differentiated enough between products, or
   read as templated copies of each other
```

---

## What Comes Next

Your products are presented and described. Next: **SEO Setup** — making sure all of this is actually discoverable by search engines, not just well-written.
