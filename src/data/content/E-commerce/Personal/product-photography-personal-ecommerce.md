---
title: Product Photography
slug: product-photography
phase: Phase 5
mode: personal
projectType: ecommerce
estimatedTime: 15-20 min
---

# Product Photography

Your store's code is solid. Now the catalog needs to look trustworthy enough that a stranger hands you their card details. Photography is the single biggest trust signal on any product page — more than copy, more than reviews you don't have yet as a new store.

You don't need a studio. You need consistency, good light, and a process you can repeat for every product without re-learning it each time.

---

## Where This Fits

This feeds directly into the Product Architecture and Product Page Design work from earlier phases. The image storage and display logic already exists — this module is about what actually goes into it.

---

## Why This Matters for a Store Specifically

A new, unfamiliar store has no brand reputation to lean on. Customers decide trustworthiness fast, and inconsistent or low-quality photos read as "this might not be a real, reliable store" even if everything else — checkout, security, policies — is solid.

> ** Tip:** Consistency matters more than individual photo quality. Five products shot with the same background, lighting, and angle look more professional as a set than five individually excellent but mismatched photos.

---

## What You're Building Today

- A repeatable shooting setup you can use for every product, not a one-off session
- A consistent image specification: dimensions, background, file format
- A simple, low-cost editing pipeline (background removal, color correction, cropping)
- Descriptive file names and alt text for every image, tying back to accessibility
- A defined shot list per product (not just one photo)

You're **not** hiring a photographer, building a lightbox studio, or learning professional photo retouching. The bar for a personal store is "clean, consistent, well-lit, and honest about what the product looks like" — not editorial-quality.

---

## The Minimum Viable Setup

| Element | Personal-Store Approach | Why |
|---|---|---|
| Camera | Modern smartphone | Genuinely sufficient at typical e-commerce display sizes |
| Lighting | Natural window light or a $30-50 ring light | Avoid mixed/yellow indoor lighting — it's the most common cause of unprofessional-looking product shots |
| Background | Plain white or neutral surface (poster board, foam board) | Keeps focus on the product, easy to replicate every time |
| Tripod/stabilization | Cheap phone tripod or stack of books | Sharper images, consistent framing across shots |

> ** Best Practice:** Shoot near a large window on an overcast day or with indirect light, not direct sun. Diffused natural light is the cheapest, most reliable lighting source available and consistently outperforms a phone's flash.

---

## Shot List Per Product

For each product, capture:

1. **Hero shot** — front-facing, clean background, this is what shows in listings
2. **Detail shots** — close-ups of texture, material, distinguishing features
3. **Context/scale shot** — shows size relative to something familiar, or in use
4. **Variant shots** — one per color/size variant, same angle as the hero shot for easy comparison

> **️ Warning:** Don't only photograph the hero shot. Customers who can't see texture, scale, or how a product looks in context are more likely to abandon checkout from uncertainty, and more likely to return what they do buy because reality didn't match expectations.

---

## Editing Pipeline

**Copy Prompt** (for an AI image tool or assistant with image editing):

```
I have a product photo taken on [a smartphone / specific camera] against
a [white / neutral] background. Help me:

1. Remove or clean up the background to pure white (or transparent,
   if my store uses a consistent colored background instead)
2. Correct color balance so the product's actual color is accurately
   represented — not warmer or cooler than reality
3. Crop to a square or [your store's chosen] aspect ratio, with the
   product centered and consistent margin across all images
4. Export at [your target resolution, e.g. 2000x2000px] for the
   storefront, since these get resized down rather than upscaled later
```

> **️ Warning:** Don't color-correct a product to look better than it actually is — slightly enhancing a flat photo is fine, but a photo that misrepresents the actual color or condition of a product directly causes returns and complaints. Accuracy beats appeal here.

---

## File Naming & Alt Text

This connects back to the accessibility work from Phase 1 — every product image needs real alt text, not a filename or "image1.jpg."

| Element | Bad Example | Good Example |
|---|---|---|
| File name | `IMG_4821.jpg` | `navy-canvas-tote-front.jpg` |
| Alt text | `product image` | `Navy canvas tote bag, front view, on white background` |

> ** Tip:** Write alt text the same way you'd describe the photo to someone over the phone who can't see it. If it wouldn't help that person picture the product, it's not doing its job.

---

## Common Mistakes

- Shooting each product under different lighting conditions on different days, producing a catalog that looks inconsistent and unplanned
- Only capturing one angle per product, leaving customers uncertain about scale, texture, or back/side appearance
- Over-editing colors to the point the product looks different on arrival than it did online — a direct cause of returns
- Generic or missing alt text, which both hurts accessibility and SEO simultaneously
- Inconsistent image dimensions/aspect ratios across the catalog, causing layout jitter on category and listing pages

---

## Validation Checklist

- [ ] Every product has at minimum: hero shot, one detail shot, one context/scale shot
- [ ] All images use the same background, lighting style, and aspect ratio across the catalog
- [ ] File names are descriptive, not camera-generated defaults
- [ ] Every image has real, descriptive alt text — verify by checking a few product pages with a screen reader or the browser's accessibility inspector
- [ ] Colors in photos accurately represent the actual product (compare side-by-side with the real item)

---

## AI Review Prompt

```
I'm about to publish my product catalog photos. Given this description
of my shooting setup and process: [describe your setup, lighting,
background, editing steps]

Check for:
1. Any inconsistency in my process that would produce visually mismatched
   photos across products
2. Whether my shot list covers what a customer actually needs to make
   a confident purchase decision
3. Whether my alt text approach is genuinely descriptive or generic
4. Any common beginner photography mistake I might be making based on
   my described setup
```

---

## What Comes Next

With visuals ready, the words around them matter just as much. Next: **Product Descriptions** — writing copy that's accurate, scannable, and actually helps customers decide.
