# Phase 3 · Backend

 **Estimated Time:** 30 Minutes

---

> **Mode: Hackathon** — Your backend is API routes, not a microservices architecture. Build the minimum that makes your frontend work. Ship fast.

---

## The Hackathon Backend Principle

> An API route that returns real data beats a perfectly architected service that doesn't exist yet. Every route you build should directly power something visible on screen.

Before writing any route, ask: "which UI component does this feed?" If you can't answer that, skip it.

---

## Step 1 · Pick your backend pattern

In a hackathon, your backend choice flows from your frontend choice. Don't make this complicated.

---

### Pattern A — Next.js API routes (recommended for most SaaS)

If your frontend is Next.js, your backend lives in the same codebase. No separate server, no CORS configuration, one deployment.

```
app/
  api/
    projects/
      route.ts          ← GET /api/projects, POST /api/projects
      [id]/
        route.ts        ← GET /api/projects/:id, PATCH /api/projects/:id, DELETE /api/projects/:id
    users/
      route.ts
    webhooks/
      clerk/route.ts
```

---

### Pattern B — Next.js Server Actions (for form-heavy apps)

Server Actions let you call server-side functions directly from client components — no API route needed. Best for create/update/delete operations triggered by forms or buttons.

```ts
// app/actions/projects.ts
'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function createProject(formData: FormData) {
  const { userId } = auth()
  if (!userId) throw new Error('Unauthorized')

  const name = formData.get('name') as string

  return db.insert(projects).values({ userId, name }).returning()
}
```

```tsx
// Used directly in a component — no fetch() needed
import { createProject } from '@/app/actions/projects'

<form action={createProject}>
  <input name="name" />
  <button type="submit">Create</button>
</form>
```

Use Server Actions for mutations. Use API routes for data fetching, webhooks, and anything called from client-side JS.

---

### Pattern C — FastAPI (Python backend)

Use only if your AI/ML logic is in Python and the team is comfortable with it. Requires a separate deployment from your Next.js frontend.

```python
# main.py
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["https://your-frontend.vercel.app", "http://localhost:3000"],
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/api/projects")
async def get_projects(user_id: str):
  # query your DB
  return {"projects": []}
```

> If using FastAPI: deploy it on Railway or Render, set your frontend's `NEXT_PUBLIC_API_URL` env var, and add CORS origins before any other work. CORS errors are the most common FastAPI + Next.js time sink.

---

## Step 2 · API route structure

Every route follows the same pattern. Auth check → validate input → query DB → return response. Never skip the auth check.

---

### GET — fetch a list

```ts
// app/api/projects/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function GET() {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await db.query.projects.findMany({
      where: (p, { eq }) => eq(p.userId, userId),
      orderBy: (p, { desc }) => [desc(p.createdAt)],
    })
    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
```

---

### POST — create a record

```ts
export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  // Validate required fields
  if (!body.name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  try {
    const [project] = await db.insert(projects)
      .values({ userId, name: body.name.trim(), description: body.description })
      .returning()
    return NextResponse.json(project, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
```

---

### GET — fetch a single record

```ts
// app/api/projects/[id]/route.ts
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const project = await db.query.projects.findFirst({
    where: (p, { eq, and }) => and(eq(p.id, params.id), eq(p.userId, userId)),
  })

  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(project)
}
```

---

### PATCH — update a record

```ts
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  // Verify ownership before updating
  const existing = await db.query.projects.findFirst({
    where: (p, { eq, and }) => and(eq(p.id, params.id), eq(p.userId, userId)),
  })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const [updated] = await db.update(projects)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(projects.id, params.id))
    .returning()

  return NextResponse.json(updated)
}
```

---

### DELETE — delete a record

```ts
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Verify ownership — never delete by ID alone
  const existing = await db.query.projects.findFirst({
    where: (p, { eq, and }) => and(eq(p.id, params.id), eq(p.userId, userId)),
  })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await db.delete(projects).where(eq(projects.id, params.id))

  return new NextResponse(null, { status: 204 })
}
```

---

## Step 3 · AI integration routes

If your SaaS has any AI features, the AI route is the most important route you'll build. Judges will use it. It needs to stream.

---

### Streaming AI response (Vercel AI SDK + Kontxt)

```bash
npm install ai @anthropic-ai/sdk
```

```ts
// app/api/ai/route.ts
import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'
import { auth } from '@clerk/nextjs/server'

export const maxDuration = 30

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const { messages, context } = await req.json()

  const result = await streamText({
    model: anthropic('kontxt-sonnet-4-6'),
    system: `You are a helpful assistant for [your product description].
Context about the user's current state:
${JSON.stringify(context)}`,
    messages,
  })

  return result.toDataStreamResponse()
}
```

```tsx
// Client component using the AI route
'use client'
import { useChat } from 'ai/react'

export function ChatInterface({ context }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai',
    body: { context },   // pass any extra data alongside messages
  })

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <span>{m.role === 'user' ? 'You' : 'AI'}</span>
          <p>{m.content}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button disabled={isLoading}>Send</button>
      </form>
    </div>
  )
}
```

---

### One-shot AI generation (non-streaming)

For operations where you generate something once and save it — summaries, classifications, structured data.

```ts
// app/api/generate/route.ts
import Anthropic from '@anthropic-ai/sdk'
import { auth } from '@clerk/nextjs/server'

const client = new Anthropic()

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { prompt, projectId } = await req.json()

  const message = await client.messages.create({
    model: 'kontxt-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const result = message.content[0].type === 'text'
    ? message.content[0].text
    : ''

  // Optionally save the result to your DB
  await db.update(projects)
    .set({ aiSummary: result, updatedAt: new Date() })
    .where(eq(projects.id, projectId))

  return NextResponse.json({ result })
}
```

---

## Step 4 · Error handling that won't embarrass you

During a demo, errors happen. The question is whether they're graceful or catastrophic.

---

### Server-side — always return structured errors

```ts
// Never return raw error messages to the client
// Bad:
return NextResponse.json({ error: err.message }, { status: 500 })

// Good:
console.error('[API /projects POST]', err)
return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
```

---

### Client-side — always handle loading and error states

```tsx
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  fetch('/api/projects')
    .then(r => {
      if (!r.ok) throw new Error('Failed to load')
      return r.json()
    })
    .then(setData)
    .catch(err => setError(err.message))
    .finally(() => setLoading(false))
}, [])

if (loading) return <Spinner />
if (error)   return <ErrorMessage message={error} />
return <ProjectList projects={data} />
```

---

### Use React Query for anything fetched more than once

If you're fetching the same data in multiple components, React Query prevents duplicate requests, handles caching, and gives you loading/error states for free.

```bash
npm install @tanstack/react-query
```

```ts
// hooks/useProjects.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => fetch('/api/projects').then(r => r.json()),
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })
}
```

---

## Step 5 · Input validation — the two-minute version

Don't skip validation. One malformed request during a judge's demo is painful.

### Zod (recommended — works with TypeScript)

```bash
npm install zod
```

```ts
import { z } from 'zod'

const CreateProjectSchema = z.object({
  name:        z.string().min(1).max(100),
  description: z.string().max(500).optional(),
})

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = CreateProjectSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  // parsed.data is fully typed and validated
  const [project] = await db.insert(projects)
    .values({ userId, ...parsed.data })
    .returning()

  return NextResponse.json(project, { status: 201 })
}
```

---

## Step 6 · AI prompts for backend

### API route generation prompt

```prompt
Generate Next.js 14 App Router API routes for a [your SaaS description].

My schema (relevant tables):
[paste schema]

Auth: I'm using [Clerk / Supabase Auth]. The user ID is available via [auth().userId / supabase.auth.getUser()].
ORM: I'm using [Drizzle / Prisma / Supabase client].

Generate these routes:
- GET    /api/[resource]       — list all for current user
- POST   /api/[resource]       — create new
- GET    /api/[resource]/[id]  — fetch single (verify ownership)
- PATCH  /api/[resource]/[id]  — update (verify ownership)
- DELETE /api/[resource]/[id]  — delete (verify ownership)

Each route must:
- Check auth first, return 401 if not authenticated
- Return structured JSON errors, not raw error messages
- Verify ownership before update/delete — never trust the ID alone
- Use try/catch and return 500 on unexpected errors

Output each route in a separate code block with its file path.
```

---

### AI route prompt

```prompt
Generate a streaming AI chat API route for Next.js 14 App Router using the Vercel AI SDK and Anthropic Kontxt.

My product: [describe what your AI feature does]
System prompt context: [describe what the AI should know]

The route should:
- Accept { messages, context } in the request body
- Use kontxt-sonnet-4-6
- Check auth before processing
- Stream the response using toDataStreamResponse()
- Set maxDuration = 30

Also generate the client component that calls it using the useChat hook.
```

---

### Backend review prompt

```prompt
Review these API routes for a hackathon SaaS demo:

[paste your routes]

Check for:
1. Auth checks missing or wrong
2. Ownership verification missing before update/delete
3. Missing error handling that would crash during a demo
4. Unvalidated user input that could cause a DB error
5. Any route that returns 200 when it should return 201, 400, 401, or 404

Return: numbered list of issues only. No praise.
```

---

## Step 7 · Backend validation checklist

Complete this before building any frontend components.

- [ ] Every route checks auth before doing anything else
- [ ] GET routes return correct data for the logged-in user only
- [ ] POST routes create records and return them with status 201
- [ ] PATCH/DELETE routes verify ownership before mutating
- [ ] All routes have try/catch and return structured error JSON
- [ ] AI routes stream correctly and don't timeout at 10s (set `maxDuration`)
- [ ] Input validation rejects malformed requests with status 400
- [ ] Tested every route with a tool (curl, Postman, or browser fetch) before wiring to UI
- [ ] CORS configured if frontend and backend are on different origins
- [ ] No secrets or database credentials logged to console

---

## Common backend mistakes in hackathons

| Mistake | Consequence | Fix |
|---|---|---|
| No auth check on a route | Anyone can read or delete any user's data | First line of every route: check auth, return 401 |
| Trusting client-supplied user ID | Users can impersonate each other | Always get userId from auth session, never from request body |
| No ownership check on update/delete | User A can modify User B's records | Query with both `id` AND `userId` conditions |
| Missing `await` on async DB call | Returns Promise instead of data, crashes silently | Enable TypeScript strict mode — it catches this |
| AI route times out | Demo stalls, judges wait, awkward silence | Set `export const maxDuration = 30` on AI routes |
| Returning raw DB errors | Leaks schema details, looks unprofessional | Catch errors, log server-side, return generic message |
| No `Content-Type: application/json` header | `req.json()` throws on some runtimes | Always set header in fetch calls from client |
| Building routes that no UI uses | Wasted time | Only build routes that a visible component needs right now |

---

## Quick reference — HTTP status codes

| Code | When to use |
|---|---|
| 200 | Successful GET, successful PATCH |
| 201 | Successful POST (record created) |
| 204 | Successful DELETE (no body) |
| 400 | Invalid input — missing field, wrong type |
| 401 | Not authenticated — no session |
| 403 | Authenticated but not authorized — wrong user |
| 404 | Record not found (or ownership check failed) |
| 500 | Unexpected server error |

> Use 404 instead of 403 for ownership failures. Confirming that a record exists but is inaccessible leaks information.

---

## What comes next

**Phase 3 · Frontend** — your API routes are live and tested. Now build the UI that calls them. Every component should map to a route you just validated.
