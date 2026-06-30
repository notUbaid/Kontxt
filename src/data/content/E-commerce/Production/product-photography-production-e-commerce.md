---
title: Product Photography
slug: product-photography
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Product Photography

In e-commerce, the photograph *is* the product. A user cannot touch the fabric, feel the weight, or test the mechanics. 

At production scale, product photography is an automated, high-throughput pipeline. If your catalog has 10,000 SKUs, you cannot have photographers manually editing shadows and renaming files on their laptops. You must establish strict technical specifications and ingestion pipelines.

---

## 1. Technical Specifications & Standardization

Inconsistency in photography destroys trust. If one product has a pure white background and the next has a light gray background, your store looks like a cheap marketplace, not a premium brand.

**The Production Spec:**
Create a rigid specification document for your photography studio.
- **Aspect Ratio:** Enforce a strict aspect ratio (e.g., `4:5` for apparel, `1:1` for hardware).
- **Background:** `RGB(255, 255, 255)` pure white for catalog shots to ensure they blend seamlessly into the website background.
- **Padding:** The product must occupy exactly 85% of the frame.
- **Lighting:** Consistent strobe setup. Shadows must fall in the same direction across the entire catalog.

---

## 2. The Naming Convention Pipeline

When a studio delivers 500 images for a new collection, manually matching them to database SKUs is a recipe for disaster.

**The Implementation:**
Enforce a strict file naming convention that your backend can parse programmatically.
- **Format:** `[SKU]_[ViewAngle]_[Variant].jpg`
- **Example:** `TSHIRT-RED-M_FRONT_01.jpg`

When these images are uploaded to your CMS (e.g., Akeneo or Sanity), write a webhook or serverless function that parses the filename, finds the corresponding SKU in the database, and automatically attaches the image ID to the product record. This saves hundreds of hours of manual data entry.

---

## 3. High-Fidelity Formats (3D & AR)

For high-ticket items (furniture, electronics), flat photography is no longer the production standard. Customers expect to spin the product or view it in their physical space.

**The Implementation:**
- **3D Models:** Request `.gltf` or `.usdz` files from your manufacturing partners (or use photogrammetry tools).
- **Frontend Integration:** Use `<model-viewer>` (a web component by Google) on your Product Detail Page. It natively supports 3D spinning and drops seamlessly into Augmented Reality (AR) mode on iOS and Android devices, dramatically increasing conversion rates for expensive items.

---

## 4. The Automation (Image CDNs)

Never upload a raw 15MB TIFF file directly to your storefront. 

**The Pipeline:**
1. The studio uploads high-res source files to an S3 bucket.
2. An Image CDN (like Cloudinary or Imgix) is connected to that bucket.
3. The CDN automatically crops the image to the 85% padding spec using AI subject detection.
4. The CDN automatically compresses the image and converts it to WebP/AVIF before serving it to the user's browser.

---

## AI Prompt — Standardize Your Photography Pipeline

```prompt
I am building the product photography pipeline for a production e-commerce store with 5,000 SKUs.

Tech Stack:
- CMS/PIM: [e.g., Sanity / Akeneo]
- Image CDN: [e.g., Cloudinary]

Act as a Principal Creative Technologist:
1. Draft the strict technical specification sheet (Aspect Ratio, Padding, Background Color) to hand off to our external photography studio.
2. Define the exact file-naming convention required to allow our Node.js backend to programmatically map incoming image files to database SKUs.
3. Explain how to configure Cloudinary URL parameters to automatically crop the background, center the subject, and serve the image in WebP format.
4. Outline the technical requirements for embedding a `.gltf` 3D model on a Next.js Product Detail Page using `<model-viewer>`.
```

---

## Product Photography Checklist

- [ ] Technical specification sheet defined and enforced for all studio shoots
- [ ] Programmatic file-naming convention established (e.g., `SKU_View.jpg`) for automated ingestion
- [ ] Image CDN (Cloudinary/Imgix) configured for automatic cropping, centering, and format optimization
- [ ] Next.js frontend updated to consume CDN URLs rather than raw database image blobs
- [ ] 3D models (`.gltf` / `.usdz`) integrated into high-ticket Product Detail Pages for AR viewing
