---
title: SDK Development
slug: sdk-development
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 25-35 min
---

# SDK Development

An SDK is the difference between "here's our API, go read the docs and write your own HTTP calls" and "run `npm install`, get autocomplete, and ship." For a solo-built API, a good SDK is disproportionately high-leverage — it's often the thing that gets someone to actually try your API instead of bouncing off raw endpoint docs.

It's also easy to overbuild. This module scopes an SDK that's genuinely worth the effort at personal-project scale, and points out the trap of trying to support every language on day one.

---

## Decision: Do You Need One Yet?

> **Decision card**
> Build an SDK once your API has a stable set of core endpoints and at least a few real (even if just yourself-as-a-test-user) integrations. Building an SDK against an API whose shape is still changing weekly means maintaining two codebases in lockstep for no benefit. If your endpoints are still churning, wait — ship the raw REST API first.

---

## Language Choice

| Approach | Trade-off |
|---|---|
| **One language, done well** (TypeScript) | Fast to build, easy to maintain solo, covers the largest share of API consumers |
| **Multiple hand-written SDKs** | High-quality per language, but you're now maintaining N codebases in sync — unrealistic solo |
| **Auto-generated from OpenAPI** | One spec, many language SDKs generated — lower per-language quality, but scales without linear effort |

> **Decision card — Recommended for Personal mode**
> Hand-write **one TypeScript SDK**. It covers Node.js and browser JS consumers — the largest share of API integrators — and you can write it well because you're only maintaining one codebase. Auto-generation becomes worth revisiting once you've completed the **OpenAPI Specification** module in Phase 5 and have a spec accurate enough to generate from reliably.

---

## Core Design Principles

**1. The SDK owns authentication, so the caller never touches raw headers.**

```typescript
// What you're building toward:
const client = new MyApiClient({ apiKey: "sk_live_..." });
const order = await client.orders.create({ items: [...] });

// Not what you want callers writing themselves:
fetch("https://api.example.com/orders", {
  headers: { Authorization: `Bearer sk_live_...` },
  method: "POST",
  body: JSON.stringify({ items: [...] }),
});
```

**2. Errors are typed, not raw HTTP status codes.**

Callers should be able to catch a specific error class, not parse status codes and response bodies themselves.

**3. Resource-based structure mirrors your API's resources.**

`client.orders.create()`, `client.orders.get()`, `client.orders.list()` — the SDK's shape should be guessable from knowing your API's resources, not a flat list of arbitrarily named methods.

---

## Implementation: Client Core

```typescript
// src/client.ts
export class MyApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(config: { apiKey: string; baseUrl?: string }) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl ?? "https://api.example.com/v1";
  }

  async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw await ApiError.fromResponse(res);
    }
    return res.json();
  }
}
```

```typescript
// src/errors.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public requestId?: string
  ) {
    super(message);
  }

  static async fromResponse(res: Response) {
    const body = await res.json().catch(() => ({}));
    return new ApiError(
      body.error ?? "Unknown error",
      res.status,
      body.code ?? "unknown_error",
      res.headers.get("X-Request-Id") ?? undefined
    );
  }
}

// Specific error types callers can catch individually
export class RateLimitError extends ApiError {}
export class AuthenticationError extends ApiError {}
export class ValidationError extends ApiError {}
```

```typescript
// src/resources/orders.ts
export class OrdersResource {
  constructor(private client: MyApiClient) {}

  create(data: CreateOrderInput) {
    return this.client.request<Order>("POST", "/orders", data);
  }

  get(id: string) {
    return this.client.request<Order>("GET", `/orders/${id}`);
  }

  list(params?: { limit?: number; cursor?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.client.request<PaginatedResult<Order>>("GET", `/orders?${query}`);
  }
}
```

---

## Handling Retries and Rate Limits

Your API returns `429` with rate-limit headers (from the **Rate Limiting** module). A good SDK respects those automatically instead of making every caller reimplement backoff.

```typescript
async function requestWithRetry(fn: () => Promise<Response>, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fn();
    if (res.status !== 429 || attempt === maxAttempts) return res;

    const retryAfter = Number(res.headers.get("Retry-After") ?? 1);
    await new Promise((r) => setTimeout(r, retryAfter * 1000));
  }
  throw new Error("Unreachable");
}
```

> **Tip — respect `Retry-After`, don't hardcode backoff**
> Your own rate limiter already tells clients exactly how long to wait via the header you built in the Rate Limiting module. An SDK that ignores it and uses a fixed delay either waits too long (bad UX) or retries too soon (gets rate-limited again).

---

## Pagination Helper

If your API uses cursor-based pagination, give callers an async iterator instead of making them manually track cursors:

```typescript
async *listAll(): AsyncGenerator<Order> {
  let cursor: string | undefined;
  do {
    const page = await this.list({ cursor });
    yield* page.data;
    cursor = page.nextCursor;
  } while (cursor);
}

// Caller experience:
for await (const order of client.orders.listAll()) {
  console.log(order);
}
```

---

## Packaging

```json
// package.json — the essentials
{
  "name": "@yourorg/api-sdk",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"]
}
```

> **Decision card — versioning**
> Start at `0.x.x` and follow semver strictly once you hit `1.0.0`: breaking changes bump the major version, new endpoints/params bump minor, fixes bump patch. Publishing pre-1.0 signals "expect changes" to early adopters — don't rush to 1.0.0 before your API's own shape has stabilized.

---

## AI Prompt: Generate the SDK Core

```
I'm building a TypeScript SDK for my REST API.

API details:
- Base URL: [your base URL]
- Auth: Bearer token via API key (see API Keys Management module)
- Resources: [list your resources, e.g., orders, invoices, webhooks]
- Rate limiting returns 429 with a Retry-After header
- Pagination uses cursor-based { data, nextCursor } responses

Requirements:
- A core client class handling auth headers and base request logic
- A typed ApiError hierarchy (base ApiError, plus RateLimitError,
  AuthenticationError, ValidationError subclasses) parsed from
  response status/body
- Automatic retry on 429 responses respecting the Retry-After header
- Resource classes (one per resource) with create/get/list methods
- An async generator helper for iterating all pages of a list endpoint
- Full TypeScript types for inputs and outputs

Generate the client core, error classes, and one example resource
class end to end.
```

---

## Validating AI Output

- **Confirm errors are typed, not just re-thrown generic `Error`s.** Callers need to `catch (err) { if (err instanceof RateLimitError) ... }`, not string-match error messages.
- **Confirm retry logic actually reads `Retry-After`** rather than using a hardcoded delay — a subtle but common shortcut in generated retry code.
- **Confirm the SDK never logs or exposes the API key** in error messages or thrown exceptions.
- **Check that resource methods return typed responses**, not `any` — untyped returns defeat the primary value of a TypeScript SDK.

---

## Common Mistakes

- Building SDKs for three languages at once before any one of them is good, instead of one language done well.
- Exposing raw `fetch` response objects instead of parsed, typed data — pushes JSON parsing and error handling back onto the caller.
- Hardcoding the base URL with no way to override it, which breaks local/staging testing against the SDK.
- Publishing to npm without a `types` field, silently losing autocomplete for TypeScript consumers.

---

## Validation Checklist

- [ ] SDK owns authentication — callers never construct headers manually
- [ ] Errors are typed and distinguishable by `instanceof`, not just message strings
- [ ] Rate limit retries respect the `Retry-After` header from your actual API
- [ ] Resource methods mirror your API's resource structure
- [ ] Pagination is wrapped in a convenient iterator, not left as raw cursor-passing
- [ ] `package.json` includes a `types` field pointing to generated `.d.ts` files
- [ ] Base URL is configurable, not hardcoded

---

## What's Next

With a working SDK, the next module — **Testing** — covers testing strategy for both your API endpoints and the SDK itself, including contract tests that catch drift between the two before your users do.
