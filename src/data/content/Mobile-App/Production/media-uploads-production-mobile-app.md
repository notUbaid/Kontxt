---
title: Media Uploads
slug: media-uploads
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 20-25 min
---

# Media Uploads

The File Storage module (Phase 2) decided your provider, the pre-signed URL upload pattern, and your access control model. This module implements the client side of that flow — picking media, compressing it sensibly, uploading with real progress feedback, and handling the failure modes that are common on mobile specifically (the user backgrounds the app mid-upload, the connection drops on a cellular network).

---

## Decision 1 — Media Picker

Use the platform picker, not a custom-built one — `expo-image-picker` or equivalent gives you camera and library access with consistent OS-native UX and the permission handling already wired correctly.

```typescript
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 0.8,
  allowsEditing: true,
});
```

> 💡 Request camera/library permission contextually — at the moment the user taps "add photo," not earlier. Same principle as location and notification permissions: a permission prompt with no immediate context gets denied more often.

---

## Decision 2 — Client-Side Compression Before Upload

> ⚠️ **Never upload a raw, unprocessed photo or video straight from the camera.** Modern phone cameras produce images in the 10-30MB range and 4K video in the hundreds of MB — uploading that directly wastes the user's bandwidth (often cellular, often metered), wastes your storage/egress cost, and makes upload time noticeably worse on slower connections. Compress and resize client-side before the upload even starts.

```typescript
const compressed = await ImageManipulator.manipulateAsync(
  imageUri,
  [{ resize: { width: 1600 } }],
  { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
);
```

- **Images:** resize to the maximum dimension your UI will ever actually display at, and compress to a reasonable quality (0.6-0.8 typically preserves visible quality while meaningfully reducing size).
- **Video:** this is more expensive client-side — for most apps, upload at a reasonable capped resolution/bitrate and let server-side processing (your File Storage module's transformation pipeline decision) handle further optimization, rather than doing heavy video transcoding on-device.

---

## Decision 3 — The Upload Flow, Tied to Your File Storage Architecture

This directly implements the pre-signed URL pattern from Phase 2:

```typescript
async function uploadMedia(fileUri: string, fileType: string) {
  // 1. Request pre-signed URL
  const { uploadUrl, key } = await api.requestUpload({ fileType, fileSize });

  // 2. Upload directly to storage, with progress tracking
  await uploadWithProgress(uploadUrl, fileUri, (progress) => {
    setUploadProgress(progress);
  });

  // 3. Confirm completion — backend verifies the object exists before trusting it
  await api.confirmUpload({ key });
}
```

> 💡 Use your HTTP client's native upload progress callback (most support this for multipart/binary uploads) rather than estimating progress — accurate progress feedback meaningfully improves perceived reliability for anything larger than a quick image, and its absence is one of the more noticeable gaps users report.

---

## Decision 4 — Handling Interruption

Uploads on mobile get interrupted more than on web — backgrounding, connection drops, cellular-to-wifi handoffs. Decide this explicitly rather than letting an interrupted upload silently fail.

| Scenario | Handling |
|---|---|
| App backgrounded mid-upload | Per your App Lifecycle module's decisions — short uploads may complete within the OS's background execution window; long ones likely won't. Resume on foreground rather than assuming completion. |
| Connection drops mid-upload | Retry with backoff; for large files, prefer a resumable/chunked upload approach over restarting from zero |
| User navigates away from the upload screen | Decide whether the upload continues in the background (preferred for UX) or is cancelled — don't let it silently continue consuming bandwidth indefinitely without the user knowing |

> ⚠️ For large files (video, multi-photo uploads), implement **chunked/resumable upload** rather than a single large request — most storage providers support multipart upload APIs designed exactly for this. A 200MB single-request upload that fails at 95% and must restart from zero is a real, frustrating production experience that resumable upload avoids.

---

## Decision 5 — Upload Queue for Multiple Files

If your app supports multi-file upload (a gallery post, multiple attachments):

- **Queue uploads rather than firing them all in parallel** — unconstrained parallel uploads on a mobile connection often perform worse than a small number of concurrent uploads (2-3), since they compete for the same limited bandwidth and can trigger more failures together than a controlled queue would.
- **Surface per-file status**, not just an aggregate spinner — if one file in a batch fails, the user needs to know which one, not just that "something" failed.

---

## Decision 6 — Failure & Retry UX

- **Distinguish retryable failures (network) from non-retryable ones (file rejected for type/size by your File Storage module's validation)** — surface the actual reason, not a generic "upload failed."
- **Don't silently drop a failed upload.** Keep it visible with a retry action, especially for content the user spent effort creating (a photo with a caption, a video).

---

## AI Prompts

### Prompt 1 — Upload Flow Implementation

```
Implement client-side media upload for a production [React Native] app.

File types: [images / video / documents]
Storage architecture: [paste your pre-signed URL flow from the File Storage module]
Multi-file support needed: [yes/no]

Implement: contextual permission request for camera/library access,
client-side image compression/resize before upload, the pre-signed-URL
upload flow with real progress tracking, resumable/chunked upload for
large files, and a queue (2-3 concurrent) for multi-file uploads with
per-file status surfaced to the user.
```

### Prompt 2 — Upload Implementation Review

```
Review this media upload implementation:

[paste your upload code]

Check for: uploads sent without client-side compression, missing or
estimated (not real) progress tracking, no resumable/chunked handling
for large files, unconstrained parallel uploads for multi-file batches,
and generic failure messages that don't distinguish retryable network
failures from file validation rejections.
```

---

## Validating AI Output

- [ ] Camera/library permission is requested contextually, not on app launch
- [ ] Images/video are compressed and resized client-side before upload begins
- [ ] Upload follows the pre-signed URL pattern from the File Storage module — never proxied through your own backend
- [ ] Progress tracking reflects real upload progress, not an estimate
- [ ] Large files use resumable/chunked upload, not a single all-or-nothing request
- [ ] Multi-file uploads are queued with limited concurrency, not fired fully in parallel
- [ ] Failures distinguish retryable (network) from non-retryable (validation) causes, with per-file status visible

---

## What's Next

- **App Permissions Strategy** (next in this phase) consolidates the camera/library permission pattern used here with location, notifications, and biometrics into one consistent approach.
- **Error Handling** defines how upload failures surface through your app-wide error UI patterns.
- **Analytics Events** should track upload success/failure rates — this is exactly the kind of operational signal your Analytics Strategy module flagged as worth measuring.
