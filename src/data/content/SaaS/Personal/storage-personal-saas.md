# Storage

**Estimated Time:** 20–30 min

---

Storage is where most personal SaaS projects go wrong — not because it's complicated, but because people make the wrong choice early and refactor it six months later.

There are two completely different storage problems. Solve them separately.

---

## Two Storage Problems

| Problem | What it means | Wrong default |
|---|---|---|
| **File Storage** | Where do uploaded files live? | Storing files on your server's disk |
| **Database Storage** | Where does structured data live? | Storing files as blobs in your database |

Both of these wrong defaults feel convenient until you try to scale, deploy, or restore from backup.

---

## File Storage

You need object storage. Not disk. Not your database.

Object storage means a service that stores files at a URL. Your server never holds the file permanently — it receives it, uploads it to the service, stores the resulting URL in your database.

```
User uploads file
       ↓
Your API receives it
       ↓
Upload to object storage → get back a URL
       ↓
Store URL in database
       ↓
Return URL to frontend
```

**Options:**

| Service | Cost | Best for |
|---|---|---|
| **Cloudflare R2** | Free up to 10GB egress-free | Personal projects — no egress fees |
| **Supabase Storage** | Free tier, simple setup | If already using Supabase |
| **AWS S3** | Industry standard, egress costs money | Production, established ecosystem |
| **Vercel Blob** | Easy if on Vercel | Simple file uploads, Vercel-native |

> **Recommendation:** Cloudflare R2 for personal SaaS. No egress fees means your costs don't spike when people actually download their files. S3-compatible API means you can switch later with minimal code changes.

---

## What Goes in File Storage

Ask this for every file type your app handles:

- User avatars / profile pictures
- Document uploads (PDFs, CSVs, images)
- AI-generated output files
- Exports (user data exports, generated reports)
- Any file larger than a few KB

If it's a file a user uploads or downloads → object storage.

**Never store files as base64 in your database.** It bloats your DB, kills query performance, and makes backups enormous.

---

## Upload Architecture

Two valid patterns. Pick one and commit.

### Pattern A: Direct Upload via Your Server

```
Frontend → POST /api/upload → Your server → Object storage
```

Simpler to implement. Your server is the middleman.

**Tradeoff:** Every upload passes through your server. Fine for personal SaaS with modest traffic. Becomes a bottleneck at scale.

---

### Pattern B: Presigned URL (Recommended)

```
Frontend → POST /api/storage/presign → Your server generates signed URL
                                              ↓
Frontend → PUT directly to object storage using signed URL
                                              ↓
Frontend → POST /api/storage/confirm → Your server records the URL
```

Your server never touches the file bytes. The object storage service receives the upload directly from the browser.

**Tradeoff:** Two extra API calls, slightly more complex to implement. Much better performance and lower server load.

> For personal SaaS: Pattern A is fine to start. Know that Pattern B exists when you need it.

---

## Access Control

Files stored publicly vs privately is a decision you make **per bucket**, not per file.

| Access type | When to use | How |
|---|---|---|
| **Public** | Avatars, public assets, anything anyone can see | Public bucket, serve URL directly |
| **Private** | User documents, exports, sensitive uploads | Private bucket + presigned read URLs |

For private files, never expose the raw storage URL. Generate a **presigned read URL** with an expiry (e.g. 15 minutes) when the user requests the file.

```
User clicks "Download my report"
       ↓
Frontend → GET /api/files/:id/url
       ↓
Your server verifies user owns the file
       ↓
Generate presigned URL (expires in 15 min)
       ↓
Return URL to frontend
       ↓
Frontend redirects user to that URL
```

>  If your private files are accessible via a permanent public URL, any user who shares that link gives it to the world. Presigned URLs expire. Use them for anything sensitive.

---

## File Validation

Never trust what the user sends.

Validate on **your server**, not the frontend.

```
 Check file extension whitelist
 Check MIME type (not just the filename)
 Check file size limit
 Scan for malware if handling untrusted documents (use a service)

 Trust the browser's file type declaration
 Only validate on the frontend
 Accept any file type and figure it out later
```

Recommended limits for personal SaaS:
- Images: 5MB max
- Documents: 25MB max
- Set hard limits in your upload route — reject before touching storage

---

## Storage AI Prompt

```prompt
You are a senior backend engineer helping me implement file storage for my SaaS.
My SaaS: [what your app does]
Storage provider: [Cloudflare R2 / Supabase Storage / AWS S3]
Backend: [Next.js API routes / Express / FastAPI]
Upload pattern: [server-side upload / presigned URLs]
Files my app handles:
[list every file type — avatars, documents, exports, etc.]
Please generate:
1. The recommended bucket structure (how many buckets, public vs private)
2. The API routes needed for upload, retrieval, and deletion
3. File validation rules I should enforce server-side
4. How to generate and return presigned read URLs for private files
5. How to store file metadata in my database (schema fields needed)
6. Any security considerations specific to my setup
Output structured Markdown. No code yet — architecture and decisions only.
```

---

## Database Schema for Files

Whatever you store in object storage, you need a database record pointing to it.

Minimum fields for a `files` table:

```
id             — unique identifier
user_id        — who owns this file
bucket         — which storage bucket
key            — the object key (path) in storage
url            — public URL (if public bucket)
filename       — original filename the user uploaded
mime_type      — validated MIME type
size_bytes     — file size
created_at     — upload timestamp
```

Store the `key` (the object path in your bucket), not just the URL. URLs can change if you switch providers or domains. The key never changes.

---

## Deletion

When a user deletes a record that has an attached file:

1. Delete the database record
2. Delete the object from storage

**Do both. In that order.**

If you only delete the database record, you accumulate orphaned files in storage forever — paying for storage you can't reference.

>  Soft-delete pattern: if you soft-delete records (mark as deleted, keep in DB), decide upfront whether the file is also soft-deleted or immediately purged. Inconsistency here causes storage bloat and GDPR headaches.

---

## Validation Checklist

Before moving to development, verify:

- [ ] Object storage provider chosen
- [ ] Decided: public bucket vs private bucket per file type
- [ ] Decided: server-upload vs presigned URL pattern
- [ ] Database `files` table designed (or file fields added to relevant table)
- [ ] File size limits defined per file type
- [ ] MIME type whitelist defined per file type
- [ ] Private files will use expiring presigned read URLs
- [ ] Deletion strategy handles both DB record and storage object

---

## Common Mistakes

| Mistake | Consequence |
|---|---|
| Storing files on server disk | Files lost on redeploy, no CDN, doesn't scale |
| Storing files as base64 in DB | Database bloat, slow queries, expensive backups |
| Exposing permanent URLs for private files | Anyone with the link can access forever |
| Not validating MIME type server-side | Malicious file uploads |
| Deleting DB record but not storage object | Orphaned files, storage cost leak |
| Not storing the object `key` | Can't delete or reference files if URL changes |

---

## What to Build Next

You've now designed:
- Where files live and how they get there
- Access control per file type
- Upload validation rules
- Deletion strategy

Phase 2 Architecture is complete. Next is **Phase 3 — Development**, starting with your database: turning the schema decisions you made in Architecture into real migrations and a working data layer.
