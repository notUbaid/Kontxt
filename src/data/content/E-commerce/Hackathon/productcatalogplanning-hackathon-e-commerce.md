---
title: Product Catalog Planning
slug: product-catalog-planning
phase: Phase 0
mode: hackathon
projectType: e-commerce
estimatedTime: 15–20 min
---

# Product Catalog Planning

Your catalog is the core of your demo. Judges will browse it. They'll click products. They'll judge your store by how real it feels.

A poorly planned catalog kills demos. Eight products with identical placeholder images and generic names signals "we ran out of time." Six well-chosen products with real names, real prices, and real images signals "this team knows what they're doing."

Less is more. Plan it deliberately.

---

## How Many Products to Build

| Catalog size | When to use it |
|---|---|
| **4–6 products** | Solo builder, tight timeline, digital goods |
| **6–10 products** | Small team, physical goods, want a browsable catalog feel |
| **10–16 products** | Larger team, marketplace or multi-category concept |

> **Hackathon rule:** Build fewer products, done properly, rather than more products done quickly. One product with a great page beats four products with thin pages.

Never show an empty category. If you add a category, fill it.

---

## Product Structure

Every product in your catalog needs these fields defined before you start building:

| Field | Why it matters |
|---|---|
| **Name** | Real, specific, brandable — not "Blue Mug" |
| **Price** | Set now. Don't leave it for later. |
| **Short description** | 1–2 sentences. Used in catalog cards. |
| **Long description** | 3–5 sentences. Used on the product page. |
| **Category** | Needed for filtering and navigation |
| **Image** | Source it now. See below. |
| **Stock status** | "In stock" / "Low stock" / "Sold out" — adds realism |
| **Featured?** | Flag 1–2 products for homepage hero treatment |

---

## Naming Products

Generic names break immersion. Specific names build brand credibility.

|  Generic |  Specific |
|---|---|
| Blue Ceramic Mug | Matte Slate Pour-Over Mug |
| Desk Mat | The Founder — Full-Desk Leather Mat |
| Icon Pack | Obsidian UI — 320 Dark Mode Icons |
| Canvas Tote | The Market Tote in Natural Canvas |

**Pattern:** `[Modifier] + [Material or Style] + [Product Type]`

Or give it a proper product name like a real brand would: *"The Architect," "The Daily," "The Studio Edition."*

---

## Sourcing Product Images

This is the highest-leverage 20 minutes you'll spend in Phase 0.

Bad images → bad store. No workaround.

**Best sources for hackathon product images:**

| Source | Best for | Notes |
|---|---|---|
| [Unsplash](https://unsplash.com) | Lifestyle and physical product shots | Free, high quality, no attribution required |
| [Pexels](https://pexels.com) | Wide variety, free | Good fallback |
| [unDraw](https://undraw.co) | Digital products, illustrations | SVG, color-customizable |
| [Storyset](https://storyset.com) | App/SaaS product illustrations | Animated options available |
| Your AI tool | Generating product mockups | Use if you have image gen access |

> **Image consistency rule:** All product images should share a visual style — same background tone, same aspect ratio, same level of brightness. Mismatched images make even well-coded stores look unfinished.

Aim for: white or light neutral background, square or 4:3 ratio, consistent lighting.

---

## Category Structure

Keep it flat. One level of categories is enough for a hackathon.

**Good:**
- Mugs / Accessories / Bundles
- Icons / Templates / Fonts
- Tops / Bottoms / Accessories

**Avoid:**
- Categories with only one product
- More than 4–5 categories total
- Subcategories (adds complexity, judges won't notice the benefit)

---

## The Featured Product Strategy

Pick one product to be your hero. This product:

- Has the best image
- Has the most complete description
- Has the most interesting name and price point
- Gets promoted on the homepage

Judges will click the most prominent product first. Make sure that click lands on your best page.

---

## Use AI to Build Your Catalog

```
I'm building an e-commerce store for a hackathon. Here are my store details:

- Store name: [name]
- Product category: [category]
- Target customer: [one sentence]
- Price tier: [budget / mid-range / premium]
- Number of products I want: [number]

Generate a product catalog with [number] products. For each product provide:
1. Product name (specific, brandable)
2. Price (realistic for the tier)
3. Short description (1–2 sentences, for the catalog card)
4. Long description (3–5 sentences, for the product page)
5. Category
6. Whether it should be featured (yes/no, max 2)

Make the names and descriptions sound like a real brand, not a generic store.
Return the output as a markdown table followed by full descriptions for each product.
```

> **Validation checklist for AI output:**
- [ ] No two products have the same structure sentence ("This [product] is perfect for...")
- [ ] Prices feel consistent with the tier you defined
- [ ] At least one product has a "low stock" angle baked into the description
- [ ] Featured products are genuinely the most compelling ones

---

## Lock Your Catalog

Before moving to Phase 1, your catalog is considered locked. Changes to product names, categories, or structure mid-build break navigation, copy, and sometimes routing.

Decide now. Adjust later only if necessary.

- [ ] Total product count decided
- [ ] Every product has a name and price
- [ ] Every product has a short and long description
- [ ] Categories defined, no empty categories
- [ ] Featured product(s) flagged
- [ ] Images sourced or queued for all products
- [ ] Catalog reviewed — it reads like a real store

---

> **Phase 0 complete. Next phase: Store Design →**
>
> You'll write the PRD that defines your store's structure, then design the customer journey and product pages judges will actually interact with.
