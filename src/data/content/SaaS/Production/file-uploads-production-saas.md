---
title: File Uploads
slug: file-uploads
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 20–35 min
---

# File Uploads

File uploads are deceptively complex. The happy path — user selects a file, it appears in the product — takes an afternoon. Production-ready file handling, with correct access control, virus scanning, size limits, and storage costs that don't surprise you, takes deliberate architecture.

The decisions you make here affect security, storage costs, and user experience simultaneously.

---

## The Core Architecture Decision

There are two ways to handle file uploads. Choose one before writing any code.

### Option A — Server-Proxied Upload

```
User → Your Server → Cloud Storage (S3 / R2 / GCS)
```

Files pass through your server. Your server writes to storage.

**Pros:** Simple. Full control. Easy to validate, scan, and transform before storage.  
**Cons:** Your server bears the bandwidth and memory cost. Doesn't scale well for large files or high concurrency.

### Option B — Presigned URL Upload (Recommended)

```
User → Your Server (request presigned URL)
     ← Presigned URL
User → Cloud Storage directly (upload)
     → Your Server (confirm upload complete)
```

Your server generates a short-lived signed URL. The file goes directly from the user's browser to cloud storage — your server never touches the bytes.

**Pros:** No bandwidth cost on your server. Scales to large files. Standard pattern at companies like Stripe, Linear, Notion.  
**Cons:** Slightly more complex flow. Requires a confirmation step before treating the file as valid.

**Use presigned URLs for anything over 5MB.** For avatar uploads and small documents, proxied upload is acceptable. For any product where file size is unbounded, use presigned URLs from day one.

---

## Storage: Where Files Actually Live

| Provider | Best for | Cost |
|---|---|---|
| **Cloudflare R2** | Most SaaS — zero egress fees | $0.015/GB storage, $0 egress |
| **AWS S3** | Existing AWS stack, enterprise | $0.023/GB + egress fees |
| **Google Cloud Storage** | Existing GCP stack | $0.020/GB + egress fees |
| **Supabase Storage** | Supabase stack | Included in plan |
| **Uploadthing** | Next.js, fastest to ship | $0/month to start, per-GB after |

**R2 is usually the right answer for new SaaS products.** No egress fees is a meaningful cost difference when users are actively downloading files. The S3-compatible API means your code works with either — you can migrate if needed.

Never store files in your database (as BLOBs). It bloats your DB, increases backup times, and removes your ability to serve files via CDN.

---

## Presigned URL Flow — Implementation

### Step 1: Request a Presigned URL

```typescript
// POST /api/uploads/presign
async function presignUpload(req: Request, res: Response) {
  const { filename, contentType, contentLength } = req.body;
  const user = req.user;

  // Validate before issuing the URL
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

  if (!ALLOWED_TYPES.includes(contentType)) {
    return res.status(400).json({ error: 'File type not allowed' });
  }

  if (contentLength > MAX_FILE_SIZE) {
    return res.status(400).json({ error: 'File too large' });
  }

  // Generate a storage key that scopes the file to the organization
  const key = `orgs/${user.organizationId}/uploads/${crypto.randomUUID()}/${filename}`;

  const presignedUrl = await s3.getSignedUrlPromise('putObject', {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: contentType,
    Expires: 300, // 5 minutes — short window prevents URL reuse
  });

  // Create a pending record — file isn't confirmed until upload completes
  const upload = await db.upload.create({
    data: {
      key,
      filename,
      contentType,
      contentLength,
      organizationId: user.organizationId,
      uploadedBy: user.id,
      status: 'pending',
    },
  });

  res.json({ uploadId: upload.id, presignedUrl, key });
}
```

### Step 2: Upload Directly from the Browser

```typescript
// frontend: upload.ts
async function uploadFile(file: File) {
  // 1. Get presigned URL from your server
  const { uploadId, presignedUrl } = await fetch('/api/uploads/presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      contentLength: file.size,
    }),
  }).then(r => r.json());

  // 2. Upload directly to storage
  await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  // 3. Confirm with your server
  await fetch(`/api/uploads/${uploadId}/confirm`, { method: 'POST' });

  return uploadId;
}
```

### Step 3: Confirm the Upload

```typescript
// POST /api/uploads/:uploadId/confirm
async function confirmUpload(req: Request, res: Response) {
  const { uploadId } = req.params;
  const user = req.user;

  const upload = await db.upload.findFirst({
    where: {
      id: uploadId,
      organizationId: user.organizationId, // scope check
      status: 'pending',
    },
  });

  if (!upload) return res.status(404).json({ error: 'Upload not found' });

  // Verify the file actually exists in storage
  await s3.headObject({ Bucket: process.env.S3_BUCKET, Key: upload.key }).promise();

  await db.upload.update({
    where: { id: uploadId },
    data: { status: 'complete' },
  });

  res.json({ upload });
}
```

The `headObject` check is important. Without it, a client could confirm an upload that never happened, creating dangling records pointing to non-existent files.

---

## Access Control for File Downloads

Files in cloud storage must not be publicly accessible unless you explicitly intend that. Default to private buckets and generate signed download URLs per request.

```typescript
// GET /api/uploads/:uploadId/download
async function getDownloadUrl(req: Request, res: Response) {
  const { uploadId } = req.params;
  const user = req.user;

  const upload = await db.upload.findFirst({
    where: {
      id: uploadId,
      organizationId: user.organizationId, // always scope to tenant
      status: 'complete',
    },
  });

  if (!upload) return res.status(404).json({ error: 'File not found' });

  // Check if user has permission to access this specific file
  const canAccess = await userCanAccessUpload(user, upload);
  if (!canAccess) return res.status(403).json({ error: 'Forbidden' });

  const signedUrl = await s3.getSignedUrlPromise('getObject', {
    Bucket: process.env.S3_BUCKET,
    Key: upload.key,
    Expires: 3600, // 1 hour
  });

  res.json({ url: signedUrl });
}
```

**Never expose the raw storage key or bucket URL to clients.** The signed download URL is time-limited and contains no information about your storage structure.

---

## Database Schema

```sql
CREATE TABLE uploads (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key              TEXT NOT NULL UNIQUE,     -- storage path
  filename         TEXT NOT NULL,            -- original filename from user
  content_type     TEXT NOT NULL,
  content_length   BIGINT,
  organization_id  UUID NOT NULL REFERENCES organizations(id),
  uploaded_by      UUID NOT NULL REFERENCES users(id),
  status           TEXT NOT NULL DEFAULT 'pending',  -- pending | complete | failed | deleted
  entity_type      TEXT,                    -- e.g. 'document', 'avatar', 'attachment'
  entity_id        UUID,                    -- ID of the associated record
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  confirmed_at     TIMESTAMPTZ
);

CREATE INDEX idx_uploads_org ON uploads(organization_id);
CREATE INDEX idx_uploads_entity ON uploads(entity_type, entity_id);

-- Clean up pending uploads older than 1 day (run as a scheduled job)
-- DELETE FROM uploads WHERE status = 'pending' AND created_at < now() - interval '1 day';
```

---

## File Validation and Security

### Validate on the Server, Not Just the Client

```typescript
const ALLOWED_MIME_TYPES: Record<string, string[]> = {
  images: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  documents: ['application/pdf', 'text/plain',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  spreadsheets: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                 'text/csv'],
};

// Never trust Content-Type from the client alone
// Read the file's magic bytes to verify actual type
import { fileTypeFromBuffer } from 'file-type';

async function verifyFileType(buffer: Buffer, claimedType: string): Promise<boolean> {
  const detected = await fileTypeFromBuffer(buffer);
  if (!detected) return false;
  return detected.mime === claimedType;
}
```

### Filename Sanitization

```typescript
import path from 'path';

function sanitizeFilename(filename: string): string {
  // Remove path traversal characters
  const base = path.basename(filename);
  // Replace anything that isn't alphanumeric, dash, underscore, or dot
  return base.replace(/[^a-zA-Z0-9.\-_]/g, '_').slice(0, 255);
}
```

### Virus Scanning

For any SaaS where users share files with other users, add virus scanning. A user uploading a malicious file that another user downloads is a serious liability.

```typescript
// Use ClamAV (self-hosted, free) or a managed service like Cloudmersive
// Trigger scan after upload confirmation via a background job

async function scanUploadedFile(uploadId: string) {
  const upload = await db.upload.findUnique({ where: { id: uploadId } });
  const fileBuffer = await downloadFromStorage(upload.key);

  const result = await virusScanner.scan(fileBuffer);

  await db.upload.update({
    where: { id: uploadId },
    data: {
      scanStatus: result.isClean ? 'clean' : 'infected',
      scannedAt: new Date(),
    },
  });

  if (!result.isClean) {
    // Delete the file from storage and notify the user
    await deleteFromStorage(upload.key);
    await notifyUserOfInfectedUpload(upload.uploadedBy);
  }
}
```

---

## Upload UX Patterns

### Progress Tracking

```typescript
// Use XMLHttpRequest for upload progress (fetch doesn't support progress events)
function uploadWithProgress(
  presignedUrl: string,
  file: File,
  onProgress: (percent: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Upload failed: ${xhr.status}`));
    });

    xhr.addEventListener('error', () => reject(new Error('Network error')));

    xhr.open('PUT', presignedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
}
```

### What Users Need to See

| State | UI feedback |
|---|---|
| File selected | Filename, size, type icon |
| Uploading | Progress bar with percentage |
| Processing (scan, transform) | Spinner with "Processing…" |
| Complete | Thumbnail or file card with download link |
| Failed | Error message with retry option |
| File too large | Inline error before upload begins |
| Wrong file type | Inline error before upload begins |

Validate file type and size client-side *before* requesting a presigned URL. Don't make users wait through a network round-trip to find out their file is too large.

---

## AI Prompt — File Upload Architecture Review

```
You are a senior backend engineer reviewing a file upload architecture for a SaaS product.

Product context:
[Describe your product — what kinds of files users upload and why]

Upload flow I've designed:
[Presigned URL / server-proxied — and the steps in your flow]

File types and size limits:
[List the file types and max sizes you're allowing]

Storage provider:
[S3 / R2 / GCS / Supabase / etc.]

Access model:
[Who can see which files? Is there sharing across organizations?]

Please review this and:
1. Identify security risks in my upload or download flow
2. Flag any missing validation or sanitization steps
3. Assess whether my access control model covers all edge cases
4. Tell me whether virus scanning is necessary given my use case
5. Point out one thing I'm overcomplicating

Be specific and direct.
```

---

## Implementation Checklist

### Architecture

- [ ] Storage provider chosen (R2 / S3 / GCS)
- [ ] Bucket set to private by default
- [ ] Upload flow decided (presigned URL vs proxied)
- [ ] Uploads table created in database
- [ ] Pending upload cleanup job scheduled

### Upload Flow

- [ ] File type validated server-side (not just client-side)
- [ ] File size limit enforced before presigned URL is issued
- [ ] Filename sanitized before storage
- [ ] Storage key scoped to organization (never user-input paths)
- [ ] Presigned URL expires within 5–15 minutes
- [ ] Confirmation step verifies file exists in storage (`headObject`)

### Access Control

- [ ] Download URLs are signed and time-limited
- [ ] Raw storage keys / bucket URLs never exposed to clients
- [ ] Every file access check includes tenant scope
- [ ] File-level permission check exists for shared files

### Security

- [ ] MIME type validated against magic bytes (not just filename extension)
- [ ] Virus scanning configured for user-shared files
- [ ] Upload endpoint rate limited per user
- [ ] No path traversal possible in storage keys

### UX

- [ ] Client-side validation before upload starts (type, size)
- [ ] Progress indicator for uploads > 1MB
- [ ] Error states with clear retry path
- [ ] File preview or thumbnail after successful upload

---

## Common Mistakes

> **⚠️ Trusting the client's Content-Type**
> A user can name a `.exe` file `resume.pdf` and set `Content-Type: application/pdf`. Always verify the actual file type by reading magic bytes server-side or after upload.

> **⚠️ Public buckets**
> A misconfigured public bucket has exposed millions of files across the industry. Start private, generate signed URLs. Only make a bucket public if you explicitly intend every file in it to be world-readable (e.g. public marketing assets).

> **⚠️ Storing files in your database**
> BLOBs in Postgres slow down backups, bloat table sizes, and can't be served through a CDN. Always use dedicated object storage.

> **⚠️ No pending upload cleanup**
> Every failed or abandoned upload leaves a `pending` record and a file in storage. Without cleanup, you accumulate garbage. Run a daily job to delete pending uploads older than 24 hours.

> **⚠️ Accepting uploads without a size limit**
> Without an explicit limit, a single user can fill your storage bucket. Set limits per upload and consider per-organization storage quotas tied to plan tier.

---

## What's Next

File uploads are implemented. Before moving on, confirm:

- You've tested the full presigned URL flow end-to-end in production
- A file uploaded by org A cannot be accessed by org B under any URL pattern
- Your pending cleanup job is deployed and scheduled
- File type validation catches a renamed `.exe` disguised as a `.pdf`

Next up: **Integrations**
