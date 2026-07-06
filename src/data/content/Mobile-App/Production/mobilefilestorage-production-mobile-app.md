---
title: File Storage
slug: file-storage
phase: Phase 2
mode: production
projectType: mobile-app
estimatedTime: 20-30 min
---

# File Storage

Every mobile app that handles a profile photo, document, video, or any user-generated media needs an answer to: where does the file actually live, how does it get there, and who's allowed to see it.

This module is about the storage architecture — provider choice, upload pattern, and access control. Implementation (the actual upload code, compression, progress UI) happens in Phase 3's *Media Uploads*.

---

## The Mistake This Module Prevents

> ️ **Never route file bytes through your own API server.** A common first instinct is: client uploads to your backend → backend saves to disk or forwards to storage. This means every file upload consumes your server's bandwidth and compute, doubles the transfer time, and turns a 50MB video upload into a request your API has to hold open. Production architecture uploads **directly from the client to object storage**, with your backend only issuing permission to do so.

---

## Decision 1 — Storage Provider

| Option | Best For | Pricing Shape | Notes |
|---|---|---|---|
| **Amazon S3** | Teams already on AWS, maximum control | Pay per GB stored + per GB transferred out | Industry default; most mature tooling |
| **Cloudflare R2** | Cost-sensitive apps serving lots of media | Pay per GB stored, **zero egress fees** | S3-compatible API — same client code as S3 |
| **Google Cloud Storage** | Teams already on GCP/Firebase | Similar to S3 | Tight integration if you're using Firebase Auth/Firestore elsewhere |
| **Supabase Storage** | Teams already on Supabase for DB/auth | Bundled into Supabase pricing | Convenient if your backend is already Supabase, not worth adopting standalone |

> **Recommendation:** Default to **Cloudflare R2** for a production mobile app unless you're already deep in one cloud ecosystem. Egress fees are the silent cost killer for media-heavy apps — a photo-sharing or video app on S3 can pay more in bandwidth than storage. R2's API is S3-compatible, so you're not locking into unfamiliar tooling, and you can migrate to S3 later with minimal code changes if needed.

---

## Decision 2 — Upload Pattern

This is the core architecture decision. Three approaches exist; only one is correct for production.

| Pattern | How It Works | Use This When |
|---|---|---|
| **Proxy through backend** | Client → your API → storage | Never, for production. Only acceptable for tiny prototypes. |
| **Pre-signed URLs** | Client asks backend for a short-lived upload URL, then uploads directly to storage using that URL | Default choice — works for any provider, simple to reason about |
| **Direct upload with signed policy (multipart/presigned POST)** | Backend issues a signed policy allowing direct multipart upload, useful for large files | Large files (video) where you need chunked/resumable upload |

**The production flow:**

```
1. Client requests upload permission: POST /uploads/request { fileType, fileSize }
2. Backend validates request, generates a pre-signed URL (expires in minutes), returns it
3. Client uploads file bytes directly to storage using that URL
4. Client notifies backend on completion: POST /uploads/confirm { key }
5. Backend verifies the object exists in storage, writes the reference to your database
```

>  **Why step 5 matters:** never trust the client's "upload succeeded" claim alone. Confirm the object actually exists in storage (a HEAD request to the storage API) before writing it into your database as if it's real. Otherwise a flaky upload leaves you with database rows pointing at files that don't exist.

---

## Decision 3 — Access Control Model

Decide this per file type — not every upload needs the same visibility model.

| Content Type | Access Model | Implementation |
|---|---|---|
| Public (profile photos, public post images) | Publicly readable URL | Bucket/objects set to public-read, served via CDN |
| Private (documents, private message attachments) | Pre-signed read URLs, generated per-request | Backend checks authorization, then mints a short-lived signed GET URL |
| Semi-private (content visible to specific users, e.g. shared folders) | Pre-signed URLs gated by your own authorization logic | Same as private, but authorization check is more complex (team/group membership) |

> ️ **Common mistake:** making a bucket fully public "to keep things simple," then later realizing private documents are sitting in it too. Separate public and private content into different buckets/prefixes from day one — retrofitting access control onto a bucket with mixed content is a painful migration.

---

## Decision 4 — File Validation & Limits

This belongs in your architecture, not as an afterthought in Phase 3:

- **Validate file type server-side**, not just by trusting the client's declared MIME type — check magic bytes/signature, since a malicious client can label any file as `image/jpeg`.
- **Enforce size limits before issuing the pre-signed URL** — bake the max size into the signed policy itself where your provider supports it (S3/R2 pre-signed POST policies support content-length-range conditions), so an oversized upload is rejected by storage, not just by client-side UI.
- **Decide your supported file types now** — this affects CDN/transformation strategy (e.g. image resizing pipelines only need to handle the formats you actually accept).

---

## Decision 5 — Media Processing Pipeline

If your app accepts images or video, decide where transformation happens:

- **On-the-fly transformation** (e.g. Cloudflare Images, imgix, S3 + Lambda@Edge): request a resized/optimized version via URL parameters, provider generates and caches it. Less upfront work, costs scale with usage.
- **Pre-processing on upload** (a worker triggered on object-created event generates thumbnails/compressed versions immediately): more upfront complexity, but predictable serving cost and works offline-friendly for apps that need guaranteed-available thumbnails.

>  For most production mobile apps, on-the-fly transformation (Cloudflare Images or equivalent) is the better default — it avoids building and maintaining a processing pipeline, and you only pay for formats actually requested.

---

## CDN Layer

Don't serve files directly from your storage bucket's origin URL in production — put a CDN in front of it.

- Reduces latency for users far from your storage region
- Cloudflare R2 pairs naturally with Cloudflare's CDN (often free egress between them)
- For private content, your CDN config must respect signed URLs — don't cache private signed URLs publicly, or you've defeated the access control

---

## AI Prompts

### Prompt 1 — Upload Architecture Design

```
I'm architecting file uploads for a production mobile app.

File types: [images / video / documents / mixed]
Max expected file size: [size]
Access model needed: [public / private / mixed]
Backend: [your backend framework]
Storage provider: [R2 / S3 / GCS]

Design the pre-signed URL upload flow: the request/confirm endpoints,
what gets validated server-side before issuing the URL, and how upload
completion is verified before writing to the database. Flag anything
in this flow that would let a malicious client bypass size or type limits.
```

### Prompt 2 — Access Control Review

```
Review this file storage access control design for security gaps:

[describe your bucket structure and signed URL logic]

Specifically check: are public and private content separated at the
bucket/prefix level, do signed URLs have appropriately short expiry,
and is there any path where a private file could be reached without
a valid signed URL or auth check.
```

---

## Validating AI Output

- [ ] Upload flow uploads directly client-to-storage — files never pass through your API server body
- [ ] Backend verifies the object exists in storage before writing a DB record for it
- [ ] File type is validated server-side (or via storage policy), not just trusted from client-declared MIME type
- [ ] Size limits are enforced at the storage policy level, not only in client UI
- [ ] Public and private content live in separate buckets/prefixes
- [ ] Private file access goes through short-lived signed URLs with a real authorization check behind them
- [ ] A CDN sits in front of storage rather than serving directly from the origin

---

## What's Next

- **Analytics Strategy** (next in this phase) will define what storage and media events you track (upload success/failure rates, processing time).
- **Cost Estimation** (also upcoming) folds in storage and egress costs based on the provider and access model you chose here.
- **Media Uploads** (Phase 3) is where this architecture becomes actual client-side upload code, progress tracking, and retry logic.
