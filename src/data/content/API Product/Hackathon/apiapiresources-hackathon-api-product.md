---
title: API Resources
slug: api-resources
phase: Phase 1
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# API Resources

Your MVP scope from Phase 0 is a list of actions. This module turns those actions into **resources** — the nouns your API is actually built around. Get the nouns right, and endpoints, routes, and database tables almost design themselves. Get them wrong, and every later phase fights the same confusion.

---

## What a Resource Actually Is

A resource is a domain concept your API exposes — a *thing*, not an action. `transcript`, `action-item`, and `user` are resources. `getTranscript`, `createUser`, and `processData` are not — those are operations *on* resources, and REST already has a mechanism for operations: HTTP methods.

> **Tip — If your endpoint name has a verb in it, you've named an operation, not a resource.**
> `POST /transcripts` is correct: the noun is the resource, the HTTP method is the verb. `POST /createTranscript` duplicates the verb and signals unfamiliarity with REST conventions to any experienced engineer reviewing your API.

---

## Extract Resources From Your MVP Scope

Pull out your locked endpoint list from Phase 0 and underline every noun. Those nouns are your candidate resources.

Example, from the transcript MVP scope:

- `POST /transcripts` → resource: **transcript**
- `GET /transcripts/:id/actions` → resource: **action-item**, nested under transcript

Two endpoints, two resources. That's a normal, healthy ratio for a hackathon-scope API — if you're finding five resources from three endpoints, you're likely over-modeling.

---

## Naming Conventions That Signal Competence

| Rule | Bad | Good |
|---|---|---|
| Plural nouns for collections | `/transcript` | `/transcripts` |
| Lowercase, hyphenated for multi-word | `/actionItems` | `/action-items` |
| No verbs in the path | `/getTranscripts` | `GET /transcripts` |
| Consistent depth | `/transcripts/:id/actions/:id/details` | `/transcripts/:id/actions/:id` |

These conventions exist because they're predictable — a developer who's never seen your docs can guess your next endpoint correctly. That predictability is exactly what's being evaluated when judges or other engineers skim your API.

---

## Nesting: When and How Deep

Nest a resource under another only when it **cannot exist without its parent**. An action-item only makes sense in the context of a transcript — nesting is correct there.

> **Warning — Don't nest past one level in a hackathon build.**
> `/transcripts/:id/actions/:id/comments/:id` is technically valid REST, but it's slower to build, slower to test, and rarely demoable in the time you have. If a resource doesn't fit one level of nesting, keep it flat with a query parameter instead: `/comments?actionId=123`.

---

## Resources vs. Implementation Details

A common beginner mistake is modeling your database tables instead of your domain. Not every table needs to be a resource, and not every resource needs to be a table.

- **Domain concept, exposed:** `transcript`, `action-item` — these are what your target developer (Phase 0) thinks in terms of.
- **Implementation detail, hidden:** a join table tracking which background worker processed a transcript — this is internal, it shouldn't appear as a resource at all.

If you're unsure whether something is a resource, ask: *would my target developer ever want to fetch or reference this directly?* If no, it's not a resource — it's plumbing.

---

## Model Your Resources With AI

> **Copy Prompt — Resource Modeling**
> ```
> My API's purpose: "[paste purpose statement]"
> My locked MVP endpoints from Phase 0: [paste your endpoint list]
>
> Identify the resources (nouns) this API should expose. For each resource:
- Resource name (plural, hyphenated if needed)
- One-line description of what it represents
- Whether it should be nested under another resource, and why
- 2-3 essential fields it would obviously need (no full schema yet)
>
> Keep this to the minimum resources needed for my locked MVP scope.
> Don't propose resources beyond what my endpoint list requires.
> ```

> **Tip — Don't paste your whole project history into this prompt.**
> Purpose statement plus MVP endpoint list is all this task needs. Earlier brainstorming, rejected ideas, or pitch material adds tokens without improving resource modeling.

---

## Validate the Output

- If AI proposes resources that don't trace back to a locked MVP endpoint, cut them — that's scope creep disguised as good design.
- If it suggests deep nesting (more than one level), flatten it per the rule above unless you have a specific, strong reason not to.
- If field suggestions look like database implementation details (internal IDs, processing flags) rather than things your target developer cares about, drop them from this list — they belong in Phase 3, not in your public resource model.

---

## Lock Your Resources

- [ ] Each resource is a noun, not a verb
- [ ] Naming follows plural, lowercase, hyphenated convention
- [ ] Nesting is one level deep or less
- [ ] Every resource traces back to a locked MVP endpoint
- [ ] No internal implementation details modeled as public resources

---

## What's Next

**Endpoint Planning** — map each resource to its full set of HTTP methods and confirm your complete route table before writing any request or response shapes.
