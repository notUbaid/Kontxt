---
title: Product Descriptions
slug: product-descriptions
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Product Descriptions

At production scale, product descriptions are not just marketing copy. They are heavily structured metadata used to power internal search algorithms, filter faceting, and Google SEO.

If you write descriptions as raw HTML blobs (`<p>Great shirt!</p>`), you cannot filter by material, care instructions, or warranty length. The architecture of a product description must be strictly componentized.

---

## 1. Structured Attributes (PIM Architecture)

A Product Information Management (PIM) system (like Akeneo, Salsify, or Sanity) is required for large catalogs.

**The Implementation:**
Do not store descriptions as a single text block. Break them into strictly typed JSON attributes:
```json
{
  "marketing_copy": "The ultimate heavyweight tee for everyday wear.",
  "material": "100% Organic Cotton",
  "care_instructions": "Machine wash cold, tumble dry low.",
  "fit_profile": "Oversized",
  "weight_gsm": 220
}
```
**Why this matters:** When a user checks the "Oversized" filter on your Category Page, your search engine (Algolia) can instantly query the `fit_profile` attribute. If the fit profile was buried inside a paragraph of marketing text, filtering would be impossible.

---

## 2. Dynamic Content Injection

Production catalogs change constantly. If you hardcode shipping policies into 5,000 product descriptions, what happens when FedEx raises their rates and your shipping policy changes? You have to manually edit 5,000 files.

**The Production Standard:**
Descriptions must support dynamic variables or headless content references.
- Create a global "Shipping Policy" document in your CMS.
- In the frontend Product Detail Page code, render the specific product data, and then dynamically inject the global Shipping Policy block at the bottom.
- Update the global block once, and all 5,000 products update instantly.

---

## 3. SEO Optimization & Readability

Google penalizes duplicate content. If you sell the same TV as Best Buy and you copy the manufacturer's description exactly, you will not rank in search results.

**The SEO Strategy:**
- **Primary Keywords:** Ensure the `h1` matches the exact term users search for (e.g., not "The Apollo", but "The Apollo - Mens Waterproof Winter Jacket").
- **F-Pattern Readability:** Users do not read; they scan. Use bullet points for the top 5 technical features immediately below the "Add to Cart" button. Keep long-form paragraphs below the fold.

---

## 4. LLM Generation (With Guardrails)

Writing 10,000 unique descriptions is impossible without AI. But raw LLM outputs often contain hallucinations, which creates legal liability (e.g., claiming a jacket is "flame retardant" when it is not).

**The Implementation:**
If using an LLM pipeline to generate copy:
1. Provide the LLM with a strict JSON schema of the product's actual technical specs.
2. Provide a strict "Brand Voice" system prompt.
3. **The Guardrail:** Force the LLM to output a boolean flag `requires_legal_review` if the copy includes words like "waterproof", "hypoallergenic", or "guaranteed". Route those specific outputs to a human for approval before pushing to the CMS.

---

## AI Prompt — Architect Your Description Pipeline

```prompt
I am architecting the Product Information Management (PIM) structure for a production e-commerce store with 10,000 SKUs.

Tech Stack:
- Headless CMS: [e.g., Sanity / Contentful]
- Search Engine: [e.g., Algolia]

Act as a Principal Data Architect:
1. Design the JSON schema for a Product document, explicitly separating `marketing_copy` from filterable technical attributes (e.g., `material`, `fit`, `care`).
2. Write a Sanity GROQ query (or equivalent) that fetches a specific product AND dynamically joins a global "Shipping Policy" document to render on the PDP.
3. Outline a safe LLM prompt pipeline for generating unique SEO descriptions at scale, including strict guardrails to prevent the AI from hallucinating technical specifications.
```

---

## Product Descriptions Checklist

- [ ] Product descriptions broken down into strict, filterable JSON attributes (PIM Architecture)
- [ ] Global content blocks (shipping, returns) decoupled from product data and dynamically injected on the frontend
- [ ] Unique SEO copy written (avoiding manufacturer copy-paste) to prevent search penalties
- [ ] F-pattern readability enforced (bullet points prioritized over long paragraphs above the fold)
- [ ] LLM generation pipelines configured with strict technical guardrails and human-review routing for high-liability claims
