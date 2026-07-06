---
title: File Uploads
slug: file-uploads
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 20-30 min
---

# File Uploads

Files are different from the data you've handled so far — they're bigger, they live outside your database, and a naive implementation is one of the easier ways to accidentally expose data or run up a surprise bill. This module gets the fundamentals right without overbuilding for a personal-scale tool.

---

## Never Store Files in Your Database

Files (images, PDFs, attachments) go in object storage — not as a blob column in Postgres. This isn't a personal-mode shortcut, it's correct at any scale: databases are slow and expensive for large binary data, and every backup/restore of your database gets heavier for no benefit.

**What actually goes in your database:** a reference — the file's URL or storage key, plus metadata (filename, size, upload date, uploaded-by).

```
Attachments table: id, related_entity_id, storage_key, filename, size_bytes, content_type, uploaded_by, created_at
```

---

## Where Files Actually Live

| Option | Personal-mode verdict |
|---|---|
| Your hosting provider's object storage (Supabase Storage, S3, R2) |  Recommended default — cheap, simple, works with free tiers |
| A dedicated file management service |  Unnecessary complexity/cost for personal-tool scale |
| Storing files in your git repo |  Never — bloats the repo, wrong tool for the job entirely |

Supabase Storage or Cloudflare R2 (notably cheap egress) are the common, well-supported choices for a solo builder already on a Postgres-based stack.

---

## The Upload Flow That Avoids the Common Trap

The naive approach — upload the file through your own server, which forwards it to storage — works, but routes potentially large files through your backend unnecessarily, which is slow and, on serverless hosting, can hit request size/timeout limits fast.

**The better pattern for most stacks: direct-to-storage uploads.**

```
1. Frontend asks your backend for a signed upload URL
2. Backend generates a short-lived signed URL (doesn't touch the file itself)
3. Frontend uploads the file directly to storage using that URL
4. Frontend tells your backend the upload succeeded
5. Backend saves the file reference (storage_key, filename, etc.) to the database
```

Your server never sees the file bytes — it only issues permission and records the result. This is dramatically simpler to scale and avoids timeout issues on larger files.

> ️ **Warning:** If your generated code has the file passing through your own API route as a full upload before forwarding to storage, ask specifically for the signed-URL pattern instead. It's not just a performance optimization — it avoids a real class of timeout/size-limit bugs on serverless hosting.

---

## AI Prompt: Implement File Uploads

```
Implement file uploads for [what's being uploaded, e.g., "attachments on Orders"] using [Supabase Storage / S3 / R2].

Requirements:
- Use the signed-URL pattern: backend issues a short-lived signed upload URL, frontend uploads directly to storage, backend only records the resulting file reference
- Store file metadata in this table: [paste your attachments schema, or the one above]
- Restrict allowed file types to: [list them, e.g., "pdf, png, jpg"]
- Enforce a max file size of [your limit, e.g., "10MB"] — reject before upload starts, not after
- Generate a unique storage key per file so uploads never collide or overwrite each other
- Handle the failure case: what happens if the frontend confirms success but the file reference save fails
```

Being explicit about allowed types and max size matters — an unrestricted upload accepts anything, including files large enough to affect your storage costs meaningfully.

---

## Validating the Generated Implementation

-  **Confirm the signed URL actually expires** — test that an old signed URL stops working after its window, not just that a new one is issued
-  **Test the file-type restriction is enforced server-side** when the signed URL is generated, not only checked in the frontend file picker — a frontend check alone is trivially bypassed
-  **Test the size limit is actually enforced**, not just documented — try uploading something over the limit and confirm it's rejected
-  **Check storage keys are unique** — two files with the same original filename shouldn't overwrite each other
-  **Confirm access to uploaded files matches your intent** — if these are private internal documents, verify the storage bucket isn't publicly readable by default (a common misconfiguration)

> ️ **Warning:** Object storage buckets are commonly created with public read access by default in tutorials and generated examples. For an internal tool handling anything sensitive, explicitly verify the bucket/files require authentication to access — don't assume "internal tool" implies private storage.

---

## Displaying and Managing Uploaded Files

- Show existing attachments on the related record's detail view (from your Forms/Tables work), not just at upload time
- Include a delete action that removes both the storage object and the database reference — deleting only one leaves an orphaned file or a broken link
- For images specifically, consider a thumbnail/preview rather than just a filename link — small addition, meaningfully better daily usability

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Storing files as blobs in the database | Slows down and bloats every database backup/restore |
| Routing large files through your own server unnecessarily | Hits timeout/size limits on serverless hosting, adds latency |
| Only validating file type/size in the frontend | Trivially bypassed — must be enforced server-side |
| Public storage buckets by default | Exposes potentially sensitive internal files without you realizing it |
| Deleting the database reference but not the storage object (or vice versa) | Leaves orphaned files or broken links |

---

## Before You Move On — Checklist

- [ ] Files live in object storage, not the database — only references are stored in the DB
- [ ] Uploads use the signed-URL pattern, not routing full files through your own server
- [ ] File type and size limits are enforced server-side, not just in the frontend
- [ ] Storage keys are unique per upload
- [ ] I explicitly verified the storage bucket's access permissions match my intent (private unless deliberately public)
- [ ] Delete actions remove both the storage object and the database reference

---

## What's Next

With individual file uploads working, the next step is handling data in bulk — importing and exporting many records at once.
