---
title: Routing
slug: routing
phase: Phase 2
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Routing

This module wires together everything you've locked so far: your route table becomes real routes, your auth strategy becomes middleware, and your error shape becomes a centralized handler. This is structural setup — actual endpoint logic comes in Phase 3.

---

## Organize Routes by Resource, Not in One File

> **Tip — One route file per resource, even at hackathon scale.**
> `transcripts.routes.js` and `actions.routes.js` instead of one giant `routes.js`. This costs nothing extra to set up and means a broken route is easy to isolate when something fails mid-demo — you'll know exactly which file to open.

Each route file should do exactly one thing: map a path + method to a handler function. The actual logic lives in your logic layer (from API Fundamentals), not inline in the route definition.

---

## Middleware Order Matters

Middleware runs in the order you register it. Getting this wrong is a common, confusing bug — your auth check silently not running because it was registered *after* the route it was supposed to protect.

> **Quick Reference — Correct middleware order**
> 1. Body parser (so `req.body` exists for every later step)
> 2. CORS (if your API is called from a browser-based client)
> 3. Auth middleware (reject early, before any business logic runs)
> 4. Route handlers
> 5. Error handler (always last — catches anything thrown above it)

> **Warning — An error handler registered before your routes will never catch anything.**
> Error-handling middleware has to be the last thing registered in most frameworks, specifically so it sits "after" everything else in the request pipeline and can catch errors thrown anywhere upstream.

---

## Centralize Error Formatting

You locked one consistent error shape in Response Design. Don't format errors individually in every handler — catch them in one place and apply that shape once.

> **Example — Centralized error handler (Express-style)**
> ```js
> app.use((err, req, res, next) => {
>   const status = err.status || 500;
>   res.status(status).json({
>     error: {
>       code: err.code || 'INTERNAL_ERROR',
>       message: err.message || 'Something went wrong',
>     },
>   });
> });
> ```

Every handler just throws an error with a `status` and `code`; this one piece of middleware guarantees every response — no matter which endpoint failed — comes back in the exact shape your docs promise.

---

## Don't Forget the Unmatched Route Case

A request to a path that doesn't exist should still return your locked error shape, not your framework's default HTML error page. A judge testing a typo'd endpoint and getting an ugly default error page reads as unfinished, even if every real endpoint works perfectly.

> **Tip — A catch-all 404 handler, registered after all your real routes, fixes this in about three lines.**
> Return your standard error envelope with a `404` status and a clear message — consistency here costs almost nothing and removes an easy way to look unpolished.

---

## CORS: Only If You Need It

If your API will be called directly from a browser-based demo client (not just curl, Postman, or a server-side client), you need CORS configured — otherwise the browser will silently block the request.

> **Decision Card — Do you need CORS?**
- Demo client is a browser app calling your API directly → yes, configure CORS
- Demo is curl, Postman, or a server-side script → skip it, you don't need it

Don't add CORS configuration you don't need — it's one more thing to debug if it's misconfigured, with zero benefit if nothing's calling you from a browser.

---

## Scaffold Routing With AI

> **Copy Prompt — Routing Setup**
> ```
> My stack: [from Tech Stack Selection]
> My locked route table: [paste full route table]
> My locked auth strategy: [paste]
> My locked error response shape: [paste]
>
> Generate the routing setup:
- one route file per resource, methods matching my route table exactly
- auth middleware applied before protected routes
- centralized error-handling middleware using my exact error shape
- a catch-all 404 handler using the same error shape
- flag whether I need CORS based on [browser client / server-side client]
> ```

> **Tip — This prompt should produce structure, not business logic.**
> If the output starts implementing the actual transcript-processing logic, that's premature — redirect it to Phase 3. Right now you only want the wiring: paths, middleware order, and error handling.

---

## Validate the Output

- Check every path and method matches your locked route table exactly — a single typo'd path silently breaks that endpoint with no obvious error.
- Confirm the error handler is registered last, and the 404 handler is registered after all real routes.
- Confirm auth middleware runs before route handlers, not after — test this by hitting a protected route with no key and confirming you get a `401`, not your handler's logic running anyway.

---

## Lock Your Routing Structure

- [ ] One route file per resource, matching your locked route table exactly
- [ ] Middleware registered in correct order: parser → CORS (if needed) → auth → routes → error handler
- [ ] Centralized error handler uses your exact locked error shape
- [ ] Catch-all 404 handler in place, using the same error shape
- [ ] CORS configured only if your demo client actually needs it

---

## What's Next

**Demo App** — build the thin client that makes your API's results visible and demoable, since judges can't evaluate raw JSON responses on their own.
