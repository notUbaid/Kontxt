---
title: Example Requests
slug: example-requests
phase: Phase 5
mode: personal
projectType: api-product
estimatedTime: 15–20 min

---

# Example Requests

Most developers evaluating your API never read the reference tables. They scroll straight to the first code block, copy it, swap in their API key, and run it. If that first snippet doesn't work unmodified, they leave. Example requests are not supplementary documentation — for a huge share of your users, they *are* the documentation.

You already have an SDK and an OpenAPI spec. This module is about turning those into copy-pasteable, runnable requests across the formats developers actually paste into their terminal or editor.

---

## The Decision: Which Languages to Show

You don't need examples in every language — you need the ones your actual users will paste.

| Language | Include? | Why |
|---|---|---|
| cURL | Always | Universal, works with zero setup, the default "let me just check this endpoint" tool |
| JavaScript/TypeScript | Yes | Matches the SDK you already built |
| Python | Yes | Widest reach among API consumers outside JS |
| Go / Ruby / PHP | Only on request | Adds maintenance cost with no evidence of demand yet |

> ** Best Practice:** Ship cURL + JS + Python well rather than five languages half-maintained. Add a language only when a real user asks for it — you can always add more later, but a stale, broken example in an obscure language actively damages trust more than not having one at all.

---

## Anatomy of a Good Example Request

A good example request is:

- **Complete** — includes the auth header, base URL, and content type. Nothing implied, nothing missing.
- **Runnable as-is** — the only edit a developer should need to make is their API key.
- **Realistic** — uses plausible values (`"sku": "TSHIRT-BLK-M"`, not `"sku": "string"`). Placeholder values that look like real data teach the shape of the API faster than type names do.
- **Minimal** — shows the smallest request that actually succeeds. Optional parameters belong in a second, clearly labeled example, not stacked into the first one.

> **️ Warning:** Auto-generated examples straight from a JSON schema (`"string"`, `"string"`, `0`, `true`) technically work but teach nothing. If your OpenAPI spec generates examples like this, override them with realistic `example` fields in the spec itself — that single fix improves every downstream doc automatically.

---

## One Endpoint, Three Formats

```bash
# cURL
curl -X POST https://api.yourproduct.com/v1/items \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Mouse", "price_cents": 2999, "sku": "MOUSE-WL-01"}'
```

```ts
// JavaScript / TypeScript (using the SDK)
import { YourApiSDK } from "@yourhandle/yourapi-sdk";

const client = new YourApiSDK(process.env.YOUR_API_KEY);

const item = await client.createItem({
  name: "Wireless Mouse",
  price_cents: 2999,
  sku: "MOUSE-WL-01",
});
```

```python
# Python
import requests
import os

response = requests.post(
    "https://api.yourproduct.com/v1/items",
    headers={"Authorization": f"Bearer {os.environ['YOUR_API_KEY']}"},
    json={"name": "Wireless Mouse", "price_cents": 2999, "sku": "MOUSE-WL-01"},
)
item = response.json()
```

Notice all three use the exact same values. Consistency across languages makes it obvious the API behaves identically regardless of client — inconsistent example data across tabs quietly erodes trust.

---

## Don't Hand-Write Every Snippet

Hand-typing cURL, JS, and Python for every endpoint doesn't scale past a handful of routes, and it's exactly the kind of task that drifts out of sync the moment your API changes.

Two better sources, in order of preference:

1. **Your Postman collection** (built in an earlier module) — Postman and Insomnia can auto-export any saved request as cURL, JS, Python, Go, and more via built-in code generation. If your collection is accurate, your examples are one export away from correct.
2. **`httpsnippet`** — a library that generates code samples in 20+ languages from a single HAR-style request definition. Useful if you want examples generated programmatically as part of your docs build, rather than exported by hand.

> ** Tip:** Treat your Postman collection as the source of truth for example requests, the same way your OpenAPI spec is the source of truth for your SDK types. One accurate source, many generated outputs — never the reverse.

---

## AI Prompt

**Prompt: Generate multi-language examples for an endpoint**

```text
Here is one operation from my OpenAPI spec: [paste the operation object, e.g. POST /items].

Generate three example requests for this endpoint:
1. cURL
2. TypeScript, using this SDK client: `new YourApiSDK(apiKey).createItem(...)`
3. Python, using the `requests` library

Requirements:
- Use realistic example values, not placeholder types like "string" or "example"
- Include the Authorization header in every example
- Use YOUR_API_KEY as the placeholder for the key, never a fake real-looking key
- Keep each example to the minimal required fields — no optional parameters
- All three examples must use identical field values so they're directly comparable

Output only the three code blocks, no explanation.
```

> ** Tip:** Generate all languages for one endpoint in a single prompt rather than three separate prompts per language. The model keeps field values consistent automatically, and you save two full round-trips of context re-explaining the same endpoint.

---

## Validation Checklist

- [ ] Every example runs unmodified except for swapping in a real API key
- [ ] All example values are realistic, not generic placeholder types
- [ ] Auth header/placeholder key is clearly labeled (`YOUR_API_KEY`, not a real-looking secret)
- [ ] Values are identical across cURL, JS, and Python for the same endpoint
- [ ] At least one error-case example exists per major endpoint (see next module)
- [ ] No real user data, internal URLs, or staging secrets leaked from testing into published docs

---

## Common Mistakes

> **️ Warning:** Showing only the happy path. Developers hit errors constantly during integration — an example of a validation error response teaches them how your API fails, which matters as much as how it succeeds.

> **️ Warning:** Letting examples rot. An endpoint gets a new required field, the docs don't. Regenerate examples from your Postman collection or spec as part of your release process, the same way you regenerate SDK types.

> **️ Warning:** Copy-pasting internal SDK test fixtures into public docs. Test fixtures often contain edge-case or intentionally malformed data — public examples should show the ideal case, not your test suite's stress cases.

---

## Security Note

Never publish an example built from a real request/response capture without sanitizing it first. Recorded traffic from local testing can contain real API keys, real customer data, or internal hostnames. Regenerate examples from scratch with fabricated but realistic values instead of scrubbing captured data — scrubbing is where leaks slip through.

---

## Implementation Checklist

- [ ] cURL, JS, and Python examples exist for every public endpoint
- [ ] Examples generated from Postman collection or OpenAPI spec, not hand-maintained independently
- [ ] Realistic example values added to the OpenAPI spec's `example` fields
- [ ] Auth placeholder convention is consistent across all docs (`YOUR_API_KEY`)
- [ ] At least one error example included per major endpoint

---

## What's Next

Next in Phase 5: **Example Responses** — pairing each of these requests with realistic success and error response bodies.
