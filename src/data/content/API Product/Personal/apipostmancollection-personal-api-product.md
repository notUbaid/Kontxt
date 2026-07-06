---
title: Postman Collection
slug: postman-collection
phase: Phase 5
mode: personal
projectType: api-product
estimatedTime: 15-25 min
---

# Postman Collection

Some developers evaluating your API don't want to read documentation first — they want to poke at real requests immediately. A Postman collection gives them that, with authentication, example values, and organization already done for them. It's low effort to produce well, precisely because it doesn't need to be hand-built.

---

## Generate, Don't Hand-Build

> **Decision card**
> Import your OpenAPI spec directly into Postman rather than manually building a collection endpoint by endpoint. This is the same drift-prevention principle from the OpenAPI Specification module — a hand-built collection is a second artifact to keep in sync forever; a generated one regenerates whenever your spec changes.

```
Postman → Import → paste your /openapi.json URL or upload the file
→ Postman creates a folder per resource, one request per operation
```

Postman also supports the reverse direction via CLI, useful for automation:

```bash
npx openapi-to-postmanv2 -s openapi.json -o collection.json -p
```

---

## Environment Variables

Raw imported requests will have a placeholder base URL and no auth configured. Set up a Postman **Environment** so every request works immediately after a developer plugs in their own key.

```json
{
  "name": "Production",
  "values": [
    { "key": "baseUrl", "value": "https://api.example.com/v1" },
    { "key": "apiKey", "value": "", "type": "secret" }
  ]
}
```

> **Tip — mark the API key field as `secret` type**
> Postman's `secret` variable type masks the value in the UI and excludes it from exported collections by default. This matters because developers will export and share collections/environments more casually than they'd share raw credentials — the secret type is a real safeguard, not just cosmetic.

---

## Wiring Auth Automatically

Configure the collection's auth at the top level so every request inherits it, instead of developers manually pasting their key into each request.

```
Collection → Authorization tab → Type: Bearer Token
Token: {{apiKey}}
```

With this set at the collection level, every imported request automatically sends `Authorization: Bearer {{apiKey}}` — a developer sets their key once in the environment and every request works.

---

## Organizing Folders

If your generated collection's folder structure doesn't match how developers think about your API (often it groups by URL path segment, which can be awkward), reorganize once by resource/use-case rather than leaving it as generated:

```
 Authentication
 Orders
   → Create order
   → Get order
   → List orders
   → Cancel order
 Webhooks
 Reports (async jobs)
```

> **Tip — this reorganization is a one-time manual step, safe to redo**
> Regenerating from the spec later will reset folder organization to the default. Keep any manual reorganization documented (or scripted) so it's quick to reapply after regenerating, rather than losing the work every time the spec updates.

---

## Adding Test Scripts

Postman lets you attach a small script to each request that runs after the response arrives — useful both for developers verifying their own integration and for you, using the collection as a lightweight smoke test.

```javascript
// Tests tab on the "Create order" request
pm.test("Status is 201", () => pm.response.to.have.status(201));

pm.test("Response includes an order id", () => {
  const body = pm.response.json();
  pm.expect(body.id).to.be.a("string");
});

// Save the created order's ID for use in subsequent requests
pm.collectionVariables.set("lastOrderId", pm.response.json().id);
```

> **Decision card — chaining requests**
> Use `pm.collectionVariables.set()` to pass IDs between requests (create an order, then use its ID in the "Get order" request). This turns the collection into a runnable end-to-end flow, not just a set of disconnected examples — genuinely useful both for developers exploring your API and for you as a manual smoke test before a release.

---

## Publishing

Postman can host a public, browsable version of your collection with zero additional writing — useful as a companion to (not replacement for) the docs site from the API Documentation module.

```
Collection → ... menu → Publish Docs → generates a public URL
```

Link this from your main docs site's Getting Started page as an alternative path for developers who prefer exploring interactively over reading first.

---

## Keeping It Current

```
Your CI/CD pipeline (from the CI/CD module) is the natural place to
automate this: on every merge that changes the OpenAPI spec, re-run
the openapi-to-postmanv2 export and re-publish, rather than
remembering to do it manually.
```

> **Warning — a stale published collection is worse than none**
> A developer following a Postman collection that references a removed field or an old endpoint hits confusing errors and may conclude your API is broken or poorly maintained, when the actual problem is an unpublished update. If you can't commit to keeping it current, don't publish it at all — link only the OpenAPI spec and docs site instead.

---

## AI Prompt: Generate Collection Export Automation

```
I have an OpenAPI spec served at [route] and I regenerate it in CI
(see CI/CD module).

Write a script/CI step that:
1. Converts the current openapi.json to a Postman collection using
   openapi-to-postmanv2
2. Adds a bearer token auth configuration at the collection level
   referencing an {{apiKey}} variable
3. Outputs the result to a location I can either commit or upload to
   Postman via their API

If Postman's API supports pushing directly to a workspace, show that
alternative too, using an API key stored in a CI secret.
```

---

## Validating AI Output

- **Actually import the generated collection into Postman and run at least one request** — confirm auth is wired correctly and the base URL variable resolves, rather than assuming the export script produced a working file.
- **Confirm the API key variable is set to Postman's `secret` type** if the generation script sets it programmatically — this default is easy to miss when scripting the export rather than doing it through the UI.
- **Check that CI secrets used to push to Postman's API aren't logged** anywhere in the CI output.

---

## Common Mistakes

- Hand-building the collection instead of generating it from the spec, creating a third artifact to keep in sync.
- Publishing once and never updating it as the API evolves.
- API key stored as a plain string variable instead of Postman's `secret` type.
- No auth configured at the collection level, leaving every request in the exported collection broken until a developer manually configures each one.

---

## Validation Checklist

- [ ] Collection is generated from the OpenAPI spec, not hand-built
- [ ] Environment variables include `baseUrl` and a `secret`-typed `apiKey`
- [ ] Collection-level auth is configured so every request inherits it automatically
- [ ] At least the core flow (create → get → list → cancel) has basic test scripts and variable chaining
- [ ] Published docs link is current and regenerated as part of your CI pipeline, not a manual afterthought
- [ ] You've personally run the imported collection end-to-end at least once to confirm it actually works

---

## What's Next

The next module — **Interactive Playground** — embeds a live, in-browser version of this same request-making experience directly into your documentation site, so developers don't need to leave your docs or install Postman at all.
