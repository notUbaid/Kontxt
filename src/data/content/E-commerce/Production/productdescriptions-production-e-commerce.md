---
title: Product Descriptions
slug: product-descriptions
phase: Phase 5 Store Launch
mode: production
projectType: e-commerce
estimatedTime: 30-45 min
---

# Structured Copy & Rich Text Architecture

> [!TIP]
> **For Beginners:** If you are reading this and feeling overwhelmed by terms like "Redis", "PgBouncer", or "Idempotency", do not panic. 
> At the bottom of this document, there is an **AI Prompt**. You do not need to write this complex code yourself. You simply need to understand *why* this architecture is required, copy the AI Prompt, and paste it into Claude or ChatGPT to have it generate the production-ready code for you.


**Estimated Time:** 45 Minutes

A beginner writes a massive, unformatted wall of text in a single database column: `"This shirt is really soft it is made of cotton you can wash it cold it fits true to size buy it now."`

When they try to render this on the frontend, it looks like an unreadable block of garbage. It has no bullet points, no bold text, and Google's SEO bots cannot understand the structure of the data.

In a production environment, product descriptions are not strings. They are **Structured Data**. You must engineer a **Rich Text JSON Architecture (Block Editor)** or a **Markdown AST Pipeline**.

---

## 1. The Block Editor Architecture

You should never store raw HTML (`<div><p>Hello</p></div>`) in your Prisma database. If a hacker manages to inject a `<script>` tag into your product description, your entire site is compromised (XSS).

Furthermore, raw HTML is incredibly difficult to migrate if you ever redesign your website or build a React Native mobile app (mobile apps cannot render `<div>` tags natively).

**The Production Solution:**
You must store your descriptions as a **JSON Block Structure** (used by Notion, TipTap, and Sanity.io).

```json
// The Prisma database stores this JSON object, NOT an HTML string.
{
  "blocks": [
    {
      "type": "paragraph",
      "content": "The ultimate everyday tee."
    },
    {
      "type": "features_list",
      "items": [
        "100% Organic Cotton",
        "Pre-shrunk for a perfect fit",
        "Garment dyed"
      ]
    }
  ]
}
```

## 2. The Next.js Block Renderer

When you pull this JSON from your database in Next.js, you map over the blocks and render strict, safe React components. 

```tsx
// components/RichTextRenderer.tsx
import { Check } from 'lucide-react';

export function RichTextRenderer({ content }) {
  if (!content?.blocks) return null;

  return (
    <div className="space-y-6 text-gray-800">
      {content.blocks.map((block, index) => {
        // 1. Render Paragraphs
        if (block.type === 'paragraph') {
          return <p key={index} className="leading-relaxed">{block.content}</p>;
        }

        // 2. Render Custom Lists with bespoke icons
        if (block.type === 'features_list') {
          return (
            <ul key={index} className="space-y-3">
              {block.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Unknown blocks are safely ignored, preventing crashes
        return null; 
      })}
    </div>
  );
}
```

Because you control the exact React component returned for each block type, it is mathematically impossible for an XSS attack to occur. You can also inject beautiful Tailwind CSS icons (like the green Checkmark) into the bullet points, which is impossible with a raw text string.

## 3. SEO Micro-Copy (Meta Titles & Descriptions)

Your database schema must separate the *visual* product description from the *SEO* description.

The text shown to the user on the page might be 500 words. The text shown to Google on the search results page must be exactly 150-160 characters, or it will be truncated.

```prisma
model Product {
  id              String  @id @default(uuid())
  name            String
  // Visual content rendered via the Block Editor
  contentJson     Json    
  
  // Strict SEO Overrides
  seoTitle        String? @db.VarChar(60)
  seoDescription  String? @db.VarChar(160)
}
```

In your Next.js App Router, you use the `generateMetadata` function to inject these strict strings into the `<head>` of the HTML document before it is sent to Google.

```typescript
// app/products/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  
  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || "Buy our amazing products online.",
    openGraph: {
      images: [product.mainImage],
    }
  };
}
```

---

##  Product Copy Engineering Checklist

- [ ] Ban raw HTML strings in the database. Mandate JSON Block Structures (TipTap/Sanity format) for all product descriptions.
- [ ] Build a React Block Renderer to safely map JSON blocks to bespoke Tailwind UI components, eliminating XSS vulnerabilities.
- [ ] Enforce strict character limits (`@db.VarChar(160)`) on SEO Metadata columns in Prisma to prevent Google truncation.
- [ ] Use the AI prompt below to generate the rich text renderer.

---

## AI Prompt — Engineer the Block Renderer

Copy this prompt into your AI to have it generate the mathematical rendering engine.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal Frontend Engineer. We are engineering our Product Description Rich Text Architecture.

I need you to generate the following strict frontend implementations:

**1. The Block Renderer Component:**
Write a React Component (`<RichTextRenderer content={jsonPayload} />`).
- Assume the `content` is a JSON array of blocks (types: `h2`, `paragraph`, `bullet_list`).
- Use a `switch` statement (or a map of components) to iterate through the blocks.
- For `h2`, render a beautiful `<h2 className="text-2xl font-bold mt-8 mb-4">`.
- For `bullet_list`, render an unstyled `<ul>` but map through the items and render each `<li>` with a custom SVG icon (using `lucide-react`) next to the text.

**2. The Next.js Metadata Generator:**
Write the `generateMetadata` function for the `/app/product/[slug]/page.tsx` route.
- Show how it fetches the product from Prisma.
- Inject the `seoTitle` and `seoDescription` into the Next.js Metadata object.
- Show how to inject the `openGraph` tags so that when a user shares the product link on Twitter/iMessage, a beautiful image preview appears automatically.
````

**Next: SEO Architecture Engineering →**
