---
title: Listings
slug: listings
phase: Phase 3
mode: hackathon
projectType: marketplace
estimatedTime: 25-35 min
filename: listings-hackathon-marketplace.md
---

# Listings

Search works against your seed data. Now sellers need a real way to create listings — the form that turns "we have a database" into "this is a working marketplace." This is usually the last core CRUD flow before a hackathon project starts looking like a product instead of a backend with a UI bolted on.

The listing form is also where most teams quietly burn an hour they don't have, building validation and image handling that doesn't need to be that sophisticated yet. This module gets you a create/edit flow that's solid enough to demo confidently and skips the parts that aren't.

---

## The Flow You're Building

```
Seller clicks "New Listing"
        ↓
  Fill form (title, description, price, category, image)
        ↓
  Client-side validation
        ↓
  POST /api/listings
        ↓
  Server validates + saves
        ↓
  Redirect to listing detail page
```

Three screens cover this end to end: the form, the listing detail page, and a "my listings" page where a seller sees what they've posted and can edit or archive it. Build in that order — the form first, since the detail page just renders what the form created.

---

## The Create/Edit API Route

One route handles both create and edit — same fields, different HTTP verb. Don't build separate endpoints.

```ts
// app/api/listings/route.ts
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const listingSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(2000),
  priceCents: z.number().int().positive(),
  category: z.string().min(1),
  imageUrl: z.string().url().optional(),
})

export async function POST(req: NextRequest) {
  const user = await getCurrentUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = listingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const listing = await prisma.listing.create({
    data: { ...parsed.data, sellerId: user.id },
  })

  return NextResponse.json(listing, { status: 201 })
}
```

```ts
// app/api/listings/[id]/route.ts
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const listing = await prisma.listing.findUnique({ where: { id: params.id } })
  if (!listing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (listing.sellerId !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const parsed = listingSchema.partial().safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const updated = await prisma.listing.update({
    where: { id: params.id },
    data: parsed.data,
  })

  return NextResponse.json(updated)
}
```

> **Decision: validate on the server, not just the client.** Client-side validation is for UX (instant feedback). Server-side validation (`zod` here) is what actually protects your database. A judge poking at your API directly with devtools open is more common than you'd think — don't let a malformed request create a listing with a negative price.

---

## Images: The Fastest Path That Still Looks Good

Image upload is the single most over-engineered part of hackathon listing forms. You do not need S3, presigned URLs, or a CDN pipeline this weekend.

| Approach | Setup time | Verdict |
|---|---|---|
| Image URL paste (Unsplash/imgur link) | 0 min | Use for your seed data only |
| Uploadthing / Cloudinary widget | 15-20 min | **Use this for the real form** |
| Direct S3 presigned upload | 1-2 hours | Skip — not worth it this weekend |
| Store image as base64 in Postgres | 10 min, but breaks at scale | Skip — slows every query that touches listings |

Uploadthing or Cloudinary's upload widget gets you drag-and-drop image upload with a hosted URL back in under 20 minutes, with a free tier that easily covers a hackathon's traffic. Wire the returned URL straight into `imageUrl` on your listing.

---

## The Form, Built for Speed Not Perfection

```tsx
// components/ListingForm.tsx
'use client'
import { useState } from 'react'

const CATEGORIES = ['Clothing', 'Electronics', 'Home', 'Books', 'Other']

export function ListingForm({ onSubmit, initial }: { onSubmit: (data: any) => void; initial?: any }) {
  const [form, setForm] = useState({
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    price: initial ? initial.priceCents / 100 : '',
    category: initial?.category ?? CATEGORIES[0],
    imageUrl: initial?.imageUrl ?? '',
  })
  const [errors, setErrors] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.description || !form.price) {
      setErrors('Title, description, and price are required.')
      return
    }
    setErrors(null)
    onSubmit({ ...form, priceCents: Math.round(Number(form.price) * 100) })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors && <p className="text-red-600 text-sm">{errors}</p>}
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="w-full border rounded px-3 py-2"
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        step="0.01"
        className="w-full border rounded px-3 py-2"
        placeholder="Price (USD)"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />
      <select
        className="w-full border rounded px-3 py-2"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <button type="submit" className="bg-black text-white rounded px-4 py-2">
        {initial ? 'Save Changes' : 'Create Listing'}
      </button>
    </form>
  )
}
```

Same component handles create and edit by passing `initial` data in or leaving it undefined. Don't build two forms.

---

## Ownership Checks Are Not Optional

The `listing.sellerId !== user.id` check in the `PATCH` route above is the single most important line in this module. Without it, any logged-in user can edit or archive any other seller's listing by guessing a listing ID — a real vulnerability, not a theoretical one, and exactly the kind of thing a judge with a security background will probe in two clicks.

> **Security:** Apply the same ownership check to delete/archive actions. If you build a "delete listing" button, the API route needs the identical `sellerId !== user.id` guard, not just the frontend hiding the button for non-owners.

---

## AI Prompts You Can Use

**Prompt 1 — Generate the API routes from your schema:**

```
Using this Prisma Listing model [paste it], write Next.js API routes for
create (POST /api/listings) and edit (PATCH /api/listings/[id]). Validate
input with zod (title 3-100 chars, description 10-2000 chars, price as a
positive integer in cents, category required). The edit route must verify
the requesting user owns the listing before allowing changes — reject
with 403 if not.
```

**Prompt 2 — Generate the form component:**

```
Build a React form component for creating/editing a marketplace listing:
title, description, price (dollars, convert to cents on submit), category
(dropdown from a fixed list), and an image upload using [Uploadthing /
Cloudinary]. Same component should support both create and edit by
accepting an optional `initial` prop. Tailwind styling, no UI library.
```

---

## Validating What AI Generates

- [ ] **The ownership check exists on every mutating route** (edit, archive, delete) — not just on create
- [ ] **Server-side validation matches client-side validation** — AI sometimes generates one and forgets the other
- [ ] **Price conversion direction is correct** — confirm dollars-to-cents happens once, not twice (a doubled conversion silently makes every listing 100x too expensive)
- [ ] **The edit route uses `PATCH` with partial validation**, not a full `PUT` that requires re-sending every field — partial edits are how real users behave
- [ ] **No listing can be created without a `sellerId`** tied to the authenticated user — never trust a `sellerId` passed in the request body

---

## What to Skip This Weekend

| Tempting | Why skip it | Do instead |
|---|---|---|
| Multi-image galleries | Real complexity (ordering, deletion, carousel UI) for marginal demo value | One image per listing |
| Draft/published listing states | An extra status most demos never show | `ACTIVE` on create, that's it |
| Rich text description editor | Adds a dependency for formatting nobody will judge you on | Plain `<textarea>` |
| Listing view/analytics counters | Needs real traffic to mean anything | Skip, mention as roadmap if asked |

---

## Implementation Checklist

- [ ] Create listing form works end to end, new listing appears in search
- [ ] Edit form pre-fills existing data and saves changes
- [ ] Non-owners get a 403 attempting to edit someone else's listing (test this manually)
- [ ] Image upload returns a working URL that renders on the listing card
- [ ] Price entered as dollars displays correctly as dollars after the cents round-trip
- [ ] "My Listings" page shows only the logged-in seller's own listings

---

## What's Next

Phase 3 is built: auth, database, search, and listings all work together. The next phase moves to **Presentation Prep** — turning a working app into a pitch judges remember.
