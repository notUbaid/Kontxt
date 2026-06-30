---
title: Search
slug: search
phase: Phase 3
mode: hackathon
projectType: marketplace
estimatedTime: 20-30 min
filename: search-hackathon-marketplace.md
---

# Search

Your database has real listings now. Search is what lets a judge type "leather jacket" and watch it actually filter — it's the moment a marketplace stops looking like a static list and starts looking like a product.

The trap here is building search like you're at a company with a search team. You're not. You have one weekend and a Postgres database with a few dozen rows. This module gets you search that feels instant and accurate at demo scale, without infrastructure that takes longer to set up than the rest of your app combined.

---

## Pick the Right Search, Not the Impressive One

| Approach | Setup time | Feels like at demo scale | Verdict |
|---|---|---|---|
| Postgres `ILIKE` / `contains` filter | 10 min | Instant, accurate | **Use this** |
| Postgres full-text search (`tsvector`) | 45-60 min | Slightly better ranking | Skip unless you finish everything else early |
| Algolia / Typesense / Elasticsearch | 2-4 hours incl. indexing pipeline | Identical to option 1 at your row count | **Skip** |
| Vector/semantic search | Hours, plus embedding costs | Overkill for keyword search on product titles | **Skip** unless your pitch is specifically "AI-powered discovery" |

> **Decision:** Use Prisma's `contains` filter with `mode: 'insensitive'`. At 10-50 listings, it is indistinguishable from Elasticsearch to anyone watching your demo, and it ships in one query.

---

## The Core Query

```ts
// app/api/listings/search/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')

  const listings = await prisma.listing.findMany({
    where: {
      status: 'ACTIVE',
      ...(query && {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      }),
      ...(category && { category }),
      ...(minPrice && { priceCents: { gte: Number(minPrice) * 100 } }),
      ...(maxPrice && { priceCents: { lte: Number(maxPrice) * 100 } }),
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return NextResponse.json(listings)
}
```

This single endpoint covers keyword search, category filter, and price range — the three filters every marketplace demo script asks for. Don't build three separate endpoints.

> **Tip:** The `status: 'ACTIVE'` filter is not optional. Without it, archived and sold listings show up in search results — a guaranteed "wait, I thought that one sold?" moment in front of judges.

---

## Why You Index `category` and `status` Together

Back in the Database module, the schema included `@@index([category, status])`. This is the query that index exists for — every search request filters by `status: 'ACTIVE'` and usually a category. At your data volume the index won't change perceived speed, but it's the right habit to build, and it costs nothing to have added already.

---

## Debouncing the Frontend

The most common search bug in hackathon demos isn't the backend — it's a search box that fires a network request on every keystroke and visibly lags. Debounce it.

```tsx
// hooks/useDebouncedSearch.ts
import { useState, useEffect } from 'react'

export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
```

```tsx
const [query, setQuery] = useState('')
const debouncedQuery = useDebouncedValue(query, 300)

useEffect(() => {
  fetch(`/api/listings/search?q=${debouncedQuery}`)
    .then(res => res.json())
    .then(setResults)
}, [debouncedQuery])
```

300ms is the right default — fast enough to feel responsive, slow enough that typing "jacket" doesn't fire six separate requests.

---

## Filter UI: What Judges Actually Click

In a 3-minute demo, nobody types a complex query. They click a category chip and maybe drag a price slider. Build for clicking, not typing.

- **Category chips** above the listing grid (`All`, `Clothing`, `Electronics`, ...) — clicking one sets `category` and re-runs the query instantly
- **A single search box** for the keyword case, not an "advanced search" panel
- **Price range as two number inputs**, not a slider — sliders are harder to build correctly than they look and rarely add demo value

> **Warning:** Don't build faceted search (multiple simultaneous filters with live result counts per facet) — it's a genuinely hard UI problem that takes hours and that no judge will specifically credit you for over a simple filter bar.

---

## Empty States Matter More Than You Think

A search with zero results and a blank white screen looks broken, not "correctly returning no matches." Always render something.

```tsx
{results.length === 0 && !isLoading && (
  <div className="text-center py-12 text-gray-500">
    No listings match "{query}". Try a different search or category.
  </div>
)}
```

This is a five-line component that prevents judges from thinking your app crashed.

---

## AI Prompts You Can Use

**Prompt 1 — Generate the filter API from your schema:**

```
Using this Prisma schema [paste your Listing model], write a Next.js API
route that filters listings by keyword (title + description, case
insensitive), category, and price range (in dollars, converted to cents).
Always exclude non-ACTIVE listings. Return JSON, sorted newest first,
capped at 50 results.
```

**Prompt 2 — Generate the filter bar UI:**

```
Build a React filter bar for a marketplace listing page: a debounced
search input (300ms), category chips that highlight when active, and
two number inputs for min/max price. On any change, call this function:
[paste your fetch/search function]. Use Tailwind. Keep it to one component.
```

---

## Validating What AI Generates

- [ ] **`status: 'ACTIVE'` is actually in the `where` clause** — AI sometimes drops this when asked to "keep it simple," and it's the bug least likely to be noticed until you're live
- [ ] **Search is case-insensitive** — `mode: 'insensitive'` is easy to forget and "Jacket" not matching "jacket" is an embarrassing live-demo bug
- [ ] **Price filters convert dollars to cents correctly** — a swapped `* 100` / `/ 100` silently returns zero results for any real price range
- [ ] **The query doesn't N+1** — if AI adds `include: { seller: true }` inside a loop instead of in the main query, fix it before it's a problem; at hackathon scale it won't be visible, but it's a one-line fix now versus a habit to unlearn later

---

## What to Skip This Weekend

| Tempting | Why skip it | Do instead |
|---|---|---|
| Typo-tolerant / fuzzy search | Real engineering problem (trigram indexes, fuzzy matching libraries) | Exact substring match — good enough for demo queries |
| Search result ranking/relevance scoring | Needs real usage data to tune meaningfully | Sort by newest, it's a defensible default |
| Search analytics / "trending searches" | Feature with no data behind it on day one | Skip entirely, mention as roadmap if asked |
| Autocomplete / search suggestions | Requires its own endpoint and debounce logic | A clear placeholder text in the search box instead |

---

## Implementation Checklist

- [ ] Search API route returns filtered results for keyword, category, and price
- [ ] Non-active listings never appear in results
- [ ] Frontend search input is debounced (no request-per-keystroke)
- [ ] Category chips visibly highlight the active filter
- [ ] Empty state renders instead of a blank screen
- [ ] Manually tested: search with a typo, search with no matches, search with an empty query

---

## What's Next

Search and filtering work. Next: **Listings** — building the create/edit flow sellers use to actually populate the marketplace beyond your seed data.
