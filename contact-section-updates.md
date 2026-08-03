# Contact Section Visibility – API Changes

## Overview

The `ContactSection` model now has an `appear` boolean field (default `true`) that controls whether the contact section is shown or hidden on the frontend.

---

## 1. Updated Response: `GET /api/project/:id/main-data`

The response now includes a new top-level field `showContactSection`.

### New Field

| Field                | Type    | Description                                             |
|----------------------|---------|---------------------------------------------------------|
| `showContactSection` | boolean | Whether the contact section should be displayed. Defaults to `true`. |

### Example Response (partial)

```json
{
  "header": { ... },
  "hero": { ... },
  "about": { ... },
  "services": { ... },
  "whyUs": { ... },
  "gallery": [...],
  "footer": { ... },
  "packages": [...],
  "rating": { ... },
  "socialMediaLinks": { ... },
  "customSections": [...],
  "showContactSection": true
}
```

> **Frontend usage:** Check `showContactSection` before rendering the `<ContactSection />` component. If `false`, hide the section entirely.

---

## 2. New API: Toggle Contact Section Visibility

### `PATCH /api/dashboard/:id/contact-section/toggle-appear`

Allows an authenticated admin to show or hide the contact section for a given project.

**Authentication:** Requires a valid JWT token (via `Authorization: Bearer <token>` header or `token` cookie).

#### URL Parameters

| Parameter | Type   | Description     |
|-----------|--------|-----------------|
| `id`      | string | The project ID  |

#### Request Body

```json
{
  "appear": true
}
```

| Field    | Type    | Required | Description                                           |
|----------|---------|----------|-------------------------------------------------------|
| `appear` | boolean | ✅ Yes   | `true` = show the section, `false` = hide the section |

#### Success Response — `200 OK`

```json
{
  "success": true,
  "message": "Contact section is now visible",
  "data": {
    "appear": true
  }
}
```

#### Error Responses

| Status | Error                                   | Cause                                |
|--------|-----------------------------------------|--------------------------------------|
| 400    | `appear must be a boolean`              | `appear` field is missing or not a boolean |
| 401    | `Access denied. No token provided.`     | Missing or invalid JWT               |
| 404    | `Project not found`                     | No project with the given `:id`      |
| 500    | `Failed to update contact section visibility` | Server/DB error                 |

---

## 3. Database Migration

A migration must be run to apply the new `appear` column to the `contact_section` table.

```bash
npx prisma migrate dev --name add_appear_to_contact_section
```

Existing rows will automatically default to `appear = true`.

---

## Summary of Changes

| What changed                         | Where                                      |
|--------------------------------------|--------------------------------------------|
| `appear Boolean @default(true)` added | `prisma/schema.prisma` → `ContactSection`  |
| `showContactSection` added to response | `GET /api/project/:id/main-data`           |
| New toggle endpoint added            | `PATCH /api/dashboard/:id/contact-section/toggle-appear` |
