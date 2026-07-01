---
title: Cross-Sells
slug: cross-sells
phase: Phase 6 Growth
mode: production
projectType: e-commerce
estimatedTime: 30-45 min
---

# Recommendation Engines & Bundling

**Estimated Time:** 45 Minutes

A beginner creates a "Related Products" section at the bottom of their product page. To populate it, they write a Prisma query that grabs 4 random products from the database. 

If a customer is buying a $2,000 Leather Sofa, the beginner's algorithm recommends a $5 set of batteries, a $12 throw pillow, and a $1,000 Dining Table. It makes no logical sense, and the customer ignores it.

In a production environment, Cross-Selling is a strict science. You must engineer **Algorithmic Bundling (Frequently Bought Together)** and **Vector-Based Product Embeddings**.

---

## 1. Algorithmic Bundling (The Amazon Method)

The most powerful Cross-Sell in e-commerce is the Amazon *"Frequently Bought Together"* bundle. 
Instead of making the customer click on 3 different pages to add 3 items, you present a mathematically computed bundle with a single "Add all 3 to Cart" button.

**The Production Solution:**
You must calculate product affinity. Instead of guessing what goes together, you execute a SQL query on your data warehouse (BigQuery) to find items that actually share the same Order ID in production.

```sql
-- BigQuery: Calculate Product Affinity (What products are bought with Product A?)
SELECT 
  item_b.product_id AS recommended_product,
  COUNT(*) AS times_bought_together
FROM `ecommerce.OrderItems` item_a
JOIN `ecommerce.OrderItems` item_b 
  ON item_a.order_id = item_b.order_id 
  AND item_a.product_id != item_b.product_id
WHERE item_a.product_id = 'prod_leather_sofa'
GROUP BY item_b.product_id
ORDER BY times_bought_together DESC
LIMIT 2;
```

If this query reveals that the Sofa is almost always bought with the matching Leather Ottoman and a specific Wood Coffee Table, you hardcode those two IDs into the Prisma `Product` record as a strict bundle.

```tsx
// components/FrequentlyBoughtTogether.tsx
export function FrequentlyBoughtTogether({ mainProduct, affinityProducts }) {
  const totalPrice = mainProduct.price + affinityProducts[0].price + affinityProducts[1].price;
  const discountPrice = totalPrice * 0.90; // Apply a mathematical 10% incentive

  return (
    <div className="border border-gray-200 p-6 rounded-lg">
      <h3 className="font-bold text-lg">Frequently Bought Together</h3>
      
      {/* 1. Visual representation of the bundle */}
      <div className="flex gap-4 my-4">
        <img src={mainProduct.image} className="w-24 h-24" />
        <span className="text-2xl mt-8">+</span>
        <img src={affinityProducts[0].image} className="w-24 h-24" />
        <span className="text-2xl mt-8">+</span>
        <img src={affinityProducts[1].image} className="w-24 h-24" />
      </div>

      {/* 2. The mathematical incentive */}
      <div className="text-xl font-bold">
        <span className="line-through text-gray-400 mr-2">${totalPrice}</span>
        <span className="text-red-600">${discountPrice}</span>
      </div>

      {/* 3. The 1-Click Multi-Add */}
      <button 
        className="w-full bg-black text-white p-4 mt-4"
        onClick={() => addMultipleToCart([mainProduct.id, ...affinityProducts.map(p => p.id)])}
      >
        Add All 3 to Cart (Save 10%)
      </button>
    </div>
  );
}
```

## 2. Vector-Based Semantic Recommendations

If your store is brand new, your BigQuery database is empty. You cannot run "Frequently Bought Together" algorithms because you have no sales history. This is known as the "Cold Start Problem."

**The Production Solution:**
You must engineer **Semantic Embeddings**. 
You pass your product descriptions to an AI (like OpenAI `text-embedding-ada-002`). The AI returns a mathematical vector (a massive array of numbers) representing the "meaning" of the product. 

You store these vectors in a Vector Database (like Pinecone or PostgreSQL pgvector).

When a user looks at a *"Blue Linen Summer Shirt"*, your Next.js API performs a **Cosine Similarity Search** in the vector database. It instantly finds other items with mathematically similar semantic meanings (e.g., *"White Linen Shorts"*, *"Straw Sun Hat"*).

```typescript
// app/api/recommend/route.ts
import { pinecone } from '@/lib/pinecone';

export async function GET(req: Request) {
  const { productId } = await req.json();

  // 1. Fetch the exact mathematical vector of the current product
  const targetVector = await fetchProductVector(productId);

  // 2. Query Pinecone for the 4 closest matching vectors
  const results = await pinecone.query({
    vector: targetVector,
    topK: 4,
    includeMetadata: true
  });

  // 3. Return the semantically similar product IDs
  return NextResponse.json({ 
    recommendations: results.matches.map(match => match.metadata.productId) 
  });
}
```

This guarantees hyper-relevant recommendations on Day 1, without requiring a single historical sale.

---

## ✅ Cross-Sells Engineering Checklist

- [ ] Ban randomized "Related Products" algorithms. 
- [ ] Use BigQuery SQL to analyze historical cart data to mathematically identify true product affinities.
- [ ] Engineer a 1-Click "Frequently Bought Together" React component that batches multiple Product IDs into a single `addToCart` payload.
- [ ] Overcome the "Cold Start Problem" by indexing your product catalog into a Vector Database (Pinecone/pgvector) to provide AI-driven semantic recommendations.
- [ ] Use the AI prompt below to generate the rigorous recommendation architecture.

---

## AI Prompt — Engineer Algorithmic Cross-Selling

Copy this prompt into your AI to have it generate the mathematical recommendation engine.

````prompt
I am building a headless e-commerce store with Next.js (App Router). I need you to act as my Principal AI Engineer. We are engineering our Semantic Cross-Sell Architecture to overcome the Cold Start problem.

I need you to generate the following strict AI implementations:

**1. The Embedding Generator Script:**
Write a Node.js script (`scripts/embed-catalog.ts`).
- Show how it fetches all `Products` from Prisma.
- Show how to pass the `product.name` and `product.seoDescription` to the OpenAI `text-embedding-ada-002` API.
- Show how to upsert the resulting mathematical vector into Pinecone, storing the `productId` in the metadata payload.

**2. The Next.js Recommendation Route:**
Write the Next.js Route (`/api/recommendations`).
- It must receive a `currentProductId`.
- Show the exact `pinecone.query` syntax required to perform a Cosine Similarity Search to find the Top 3 most semantically related products.
- Explain in Markdown why semantic vector matching drastically outperforms standard PostgreSQL `ILIKE '%keyword%'` searches for product recommendations.
````

**Next: Email Marketing Automation Engineering →**
