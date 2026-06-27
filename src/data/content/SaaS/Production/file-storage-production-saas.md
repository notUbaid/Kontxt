---
title: File Storage
slug: file-storage
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# File Storage

File uploads are a common source of production incidents — not because storing files is hard, but because the defaults are often wrong: public buckets by accident, no size limits, no type validation, and no connection to the authorization model you just defined. This module makes those decisions explicit.

---

## Decision 1: Storage Provider

| Option | Best for |
|---|---|
| S3 (AWS) | Default if you're already on AWS; mature, well-documented, huge ecosystem |
| Cloudflare R2 | No egress fees — meaningfully cheaper if you serve a lot of file downloads; S3-compatible API |
| Supabase Storage | If you're already using Supabase for auth/database, simplest integration |

> 💡 **Tip**
> Don't treat this as a major decision — these are largely interchangeable behind an abstraction in your backend. Pick based on what's already in your stack (from Tech Stack Selection) rather than researching extensively.

---

## Decision 2: Upload Pattern

> **Decision Card**
> Use **pre-signed URLs** for uploads: your backend generates a short-lived, scoped URL that lets the client upload directly to storage, without the file passing through your application server.

| Pattern | Tradeoff |
|---|---|
| Pre-signed direct upload | File never touches your server — saves bandwidth and server load; requires generating signed URLs with correct scoping |
| Proxy through your backend | Simpler to add validation/virus scanning inline; uses your server's bandwidth and compute for every upload |

> ✅ **Best Practice**
> Use pre-signed uploads for production, but still validate file type and size **before** issuing the signed URL (based on what the client declares) **and** re-verify on the storage side or via a post-upload check — never trust client-declared metadata as your only validation.

---

## Decision 3: Access Control on Files

> ⚠️ **Warning**
> **Default every bucket to private.** A public-by-default storage bucket is one of the most common real-world SaaS data leaks — customer documents, profile images meant to be private, or exported data accidentally become publicly accessible via a guessable or even just unguarded URL. Make "private" the only option unless a specific file is genuinely meant to be public (e.g., a public-facing avatar).

For private files, serve them through **signed URLs with a short expiry** (minutes, not days), generated server-side after your authorization check confirms the requesting user can access that specific file.

---

## Decision 4: Multi-Tenant File Organization

Tie storage keys back to your tenancy model from Database Schema:

```
/{workspace_id}/{resource_type}/{file_id}-{original_filename}
```

> ⚠️ **Warning**
> Never let a file's storage key or access URL be guessable or sequential — apply the same reasoning here as you did for database IDs and API routes. And always verify the requesting user belongs to the `workspace_id` in the file's path before issuing a signed URL, exactly like every other tenant-scoped resource.

This structure also makes workspace-level operations (export all files, delete all files on workspace deletion) straightforward — a clean prefix to operate on, rather than scattered keys with no tenant grouping.

---

## Decision 5: Validation & Abuse Prevention

- [ ] **File size limits** — enforced both client-side (fast feedback) and server-side (actual enforcement)
- [ ] **File type validation** — check actual file content/magic bytes, not just the extension or client-declared MIME type, which can be spoofed
- [ ] **Rate limiting on uploads** — prevent a single account from exhausting storage or bandwidth
- [ ] **Malware/virus scanning** — for any production SaaS accepting file uploads from users who might share files with others, scan uploads before they're accessible to anyone else

> ⚠️ **Warning**
> Trusting a client-declared file extension or MIME type is a known attack vector — a malicious file can be renamed to look like an image. Validate based on actual file content where security matters (especially before allowing the file to be downloaded/opened by other users).

---

## Common AI Mistakes to Watch For

- **Defaults to a public bucket** for simplicity — always explicitly require private-by-default with signed URLs.
- **Generates signed URLs without an authorization check first** — confirm the permission check happens before the signed URL is issued, every time.
- **Validates file type by extension only** — push back and require content-based validation for anything security-sensitive.
- **No file size limit specified** — always set an explicit, enforced maximum.
- **Storage keys with no tenant scoping** — verify every key includes `workspace_id` and that access checks use it.

---

## AI Prompt: Implement Secure File Uploads

```
Implement file upload handling for a production SaaS using [S3 / R2 / Supabase Storage — your choice] with pre-signed direct uploads.

Requirements:
- Storage key format: /{workspace_id}/{resource_type}/{file_id}-{filename}
- Before issuing a signed upload URL, verify the requesting user belongs to the workspace in the path (use the authorization pattern from Authorization & Roles)
- Enforce a max file size of [your limit] server-side, not just client-side
- Validate file type by content/magic bytes, not just extension or declared MIME type
- Files are private by default; generate short-lived signed download URLs (5–15 minute expiry) only after re-verifying the requester's access to that specific file
- Rate-limit uploads per user/workspace

Flag anywhere this implementation would make a bucket or file path publicly accessible.
```

---

## Validate Before You Move On

- [ ] Storage bucket is private by default; no file is public unless deliberately intended to be
- [ ] Uploads use pre-signed URLs, generated only after an authorization check
- [ ] File size limits are enforced server-side
- [ ] File type is validated by content, not just extension/declared MIME type
- [ ] Storage keys include `workspace_id` and downloads re-verify tenant/ownership access
- [ ] Uploads are rate-limited per user/workspace
- [ ] You have a plan for malware scanning if users can share uploaded files with others

> 💡 **Tip**
> Reuse the same authorization-checking function from Authorization & Roles here — file access is just another resource-permission check, not a separate system to design from scratch.

---

**Next:** Third Party Integrations — connect external services without compromising the boundaries you've just defined.
