---
title: Endpoint Planning
slug: endpoint-planning
phase: Phase 1
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Endpoint Planning

You have resources. Now you need the exact route table — every method and path you'll build, nothing implied, nothing assumed. This table is what you'll hand to your AI coding tool in Phase 3, so ambiguity here becomes wasted prompts later.

---

## Resources Don't Need Full CRUD

The instinct is to give every resource all five operations — Create, Read, Update, Delete, List. Resist it. Your MVP scope already told you which operations matter; most resources need two or three, not five.

> **Decision Card — For each resource, ask: does my core loop actually call this?**
> If your demo never updates an action-item after creation, you don't need `PATCH /action-items/:id`. Build it later if you need it — building it now is time spent on a path nobody will touch on stage.

---

## HTTP Method Conventions

| Method | Use for | Hackathon note |
|---|---|---|
| `GET` | Fetch one item or a collection | Always safe to build — read-only, low risk |
| `POST` | Create a new resource | Almost always part of your core loop |
| `PATCH` | Partially update a resource | Only if your demo edits something |
| `PUT` | Fully replace a resource | Rarely needed — skip unless explicitly required |
| `DELETE` | Remove a resource | Only if deletion is part of the story you're telling |

> **Tip — `PATCH` over `PUT` by default.**
> `PUT` requires the caller to send the entire resource every time, which is unforgiving and rarely matches real usage. `PATCH` is more practical and what most modern APIs (Stripe, GitHub, Linear) use for partial updates.

---

## Collection vs. Item Routes

Every resource typically gets two route shapes:

- **Collection route** — `/transcripts` — `GET` to list, `POST` to create
- **Item route** — `/transcripts/:id` — `GET` to fetch one, `PATCH`/`DELETE` if needed

Keep this pattern consistent across every resource. Inconsistency here — one resource using `/transcript/:id`, another using `/transcripts/get/:id` — is one of the fastest ways to look unpolished to a technical judge.

---

## Actions That Aren't CRUD

Some operations don't map cleanly to Create/Read/Update/Delete — "approve this," "regenerate this," "send this." Don't force these into `PATCH` with a hidden status field if the action has real side effects.

> **Quick Reference — Modeling non-CRUD actions**
> Treat the action as a sub-resource you create: `POST /transcripts/:id/regenerate` rather than `PATCH /transcripts/:id { status: "regenerating" }`. This keeps intent explicit in the URL instead of hidden in a request body.

Only add these if your core loop genuinely needs them — most hackathon MVPs don't.

---

## Build Your Route Table

For every resource from the previous module, list only the routes your MVP scope actually requires:

| Method | Path | Purpose | Priority |
|---|---|---|---|
| `POST` | `/transcripts` | Submit a raw transcript | Core loop |
| `GET` | `/transcripts/:id/actions` | Get structured action items | Core loop |
| `GET` | `/transcripts` | List past transcripts | Nice-to-have |

The "Priority" column matters as much as the routes themselves — it's what you cut first if time runs short.

---

## Plan the Full Table With AI

> **Copy Prompt — Generate Route Table**
> ```
> My locked resources from the previous module: [paste resource list]
> My locked MVP endpoints from Phase 0: [paste MVP endpoint list]
>
> Generate a complete route table: Method, Path, Purpose, Priority
> (Core loop / Nice-to-have). Use REST conventions — plural resource
> names, PATCH over PUT, no verbs in paths. Only include routes that
> trace directly back to my MVP scope. Flag if I'm missing any route
> that's required to make my core loop actually work end-to-end
> (for example, a way to check whether async processing finished).
> ```

> **Tip — This is a structuring task, not a brainstorm. Keep the prompt tight.**
> You're asking AI to organize decisions you've already made, not invent new ones. A focused prompt with your locked resources and MVP scope produces a usable table in one pass — no need for follow-up rounds.

---

## Validate the Output

- If AI fills in full CRUD "for completeness," strip anything not marked core loop or genuinely needed.
- Take the "missing route" flag seriously — async or processing-heavy APIs (like transcript analysis) often need a status-check route that's easy to forget until your demo stalls mid-call.
- Check every path against the naming conventions table above — AI sometimes drifts toward verb-based paths if your prompt wasn't explicit.

---

## Lock Your Route Table

- [ ] Every route traces to a resource and a locked MVP requirement
- [ ] Methods follow convention (`PATCH` over `PUT`, no verbs in paths)
- [ ] Collection and item routes follow a consistent pattern across resources
- [ ] Core loop vs. nice-to-have priority marked for every route
- [ ] Any required status-check or async-completion route accounted for

---

## What's Next

**Request Design** — define exactly what each endpoint expects in its request body, headers, and parameters.
