# New APIs & Changes — Category Feature

> **Date:** 2026-08-03  
> **Scope:** Category model, Category CRUD APIs, updated Article APIs

---

## Overview

A new **Category** model has been added to the database. Each article now belongs to a category.  
The **default category** for every new article is `خدمات-الضيافة` (slug) / `خدمات الضيافة` (display name).

---

## Database Changes

### New Model — `Category`

| Field       | Type     | Notes                                    |
|-------------|----------|------------------------------------------|
| `id`        | String   | Primary key (cuid)                       |
| `projectId` | String   | FK → Project (cascade delete)            |
| `name`      | String   | Display name (e.g. `خدمات الضيافة`)      |
| `slug`      | String   | URL-friendly slug (e.g. `خدمات-الضيافة`) |
| `createdAt` | DateTime |                                          |
| `updatedAt` | DateTime |                                          |

Unique constraint: `(projectId, slug)` — no two categories in the same project can share a slug.

### Updated Model — `Article`

New optional field added:

| Field        | Type   | Notes                                          |
|--------------|--------|------------------------------------------------|
| `categoryId` | String? | Optional FK → Category (set null on delete)   |

---

## New APIs

---

### 1. Create Category

**`POST /api/category`** 🔒 *(requires auth)*

**Request Body:**
```json
{
  "projectId": "string (required)",
  "name":      "string (required) — e.g. خدمات الضيافة",
  "slug":      "string (required) — e.g. خدمات-الضيافة"
}
```

**Success Response — `201`:**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "category": {
      "id": "...",
      "projectId": "...",
      "name": "خدمات الضيافة",
      "slug": "خدمات-الضيافة",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
}
```

**Error Responses:**
- `400` — missing `projectId`, `name`, or `slug`
- `404` — project not found
- `409` — category with this slug already exists in the project

---

### 2. Update Category

**`PUT /api/category/:categoryId`** 🔒 *(requires auth)*

**Request Body (all optional):**
```json
{
  "name": "string",
  "slug": "string"
}
```

**Success Response — `200`:**
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": { "category": { ... } }
}
```

**Error Responses:**
- `404` — category not found

---

### 3. Delete Category

**`DELETE /api/category/:categoryId`** 🔒 *(requires auth)*

Deletes the category. Articles linked to it will have `categoryId` set to `null` automatically.

**Success Response — `200`:**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Error Responses:**
- `404` — category not found

---

### 4. Get All Categories for a Project

**`GET /api/project/:projectId/categories`**

**Success Response — `200`:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "...",
        "name": "خدمات الضيافة",
        "slug": "خدمات-الضيافة",
        "createdAt": "...",
        "_count": { "articles": 5 }
      }
    ],
    "count": 1
  }
}
```

---

### 5. Get Articles by Category

**`GET /api/project/:projectId/articles/category/:categorySlug`**

**Success Response — `200`:**
```json
{
  "success": true,
  "data": {
    "category": {
      "id": "...",
      "name": "خدمات الضيافة",
      "slug": "خدمات-الضيافة"
    },
    "articles": [ { ... } ],
    "count": 5
  }
}
```

**Error Responses:**
- `404` — project or category not found

---

## Updated APIs

---

### 6. Create Article (updated)

**`POST /api/article`**

New **optional** field added:

| Field          | Type   | Default                | Notes                            |
|----------------|--------|------------------------|----------------------------------|
| `categorySlug` | string | `خدمات-الضيافة`        | Slug of an existing category     |

**Request Body:**
```json
{
  "projectId":    "string (required)",
  "title":        "string (required)",
  "content":      "string",
  "coverImage":   "string (URL, optional)",
  "categorySlug": "string (optional) — defaults to خدمات-الضيافة"
}
```

**Behaviour:**
- If `categorySlug` is omitted or empty → defaults to `خدمات-الضيافة`.
- If the default category doesn't exist yet for the project, **it is auto-created** as `{ name: 'خدمات الضيافة', slug: 'خدمات-الضيافة' }`.
- If a custom `categorySlug` is provided and the category exists, the article is linked to it.

**Success Response — `201`** (now includes `category`):
```json
{
  "success": true,
  "message": "Article created successfully",
  "data": {
    "article": {
      "id": "...",
      "projectId": "...",
      "title": "...",
      "content": "...",
      "coverImage": null,
      "categoryId": "...",
      "category": {
        "id": "...",
        "name": "خدمات الضيافة",
        "slug": "خدمات-الضيافة"
      },
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
}
```

---

### 7. Update Article (updated)

**`PUT /api/article/:articleId`**

New **optional** field added:

| Field          | Type   | Notes                                                        |
|----------------|--------|--------------------------------------------------------------|
| `categorySlug` | string | Slug of the target category. If omitted, category unchanged. |

**Request Body:**
```json
{
  "title":        "string (optional)",
  "content":      "string (optional)",
  "coverImage":   "string (optional)",
  "categorySlug": "string (optional)"
}
```

**Behaviour:**
- If `categorySlug` is **not provided**, the article's category stays unchanged.
- If `categorySlug` is provided but the category is **not found**, returns `404`.

**Success Response — `200`** (now includes `category`):
```json
{
  "success": true,
  "message": "Article updated successfully",
  "data": {
    "article": {
      "id": "...",
      "category": {
        "id": "...",
        "name": "...",
        "slug": "..."
      },
      ...
    }
  }
}
```

**Error Responses:**
- `404` — article not found  
- `404` — category not found (if `categorySlug` provided but doesn't exist)

---

### 8. Get All Articles for a Project (updated)

**`GET /api/project/:projectId/articles`**

Response now includes `category` object on each article:

```json
{
  "articles": [
    {
      "id": "...",
      "title": "...",
      "category": {
        "id": "...",
        "name": "خدمات الضيافة",
        "slug": "خدمات-الضيافة"
      },
      ...
    }
  ]
}
```

---

### 9. Get Article by Title (updated)

**`GET /api/article/title/:title`**

Response now includes `category` object:

```json
{
  "success": true,
  "data": {
    "article": {
      "id": "...",
      "category": {
        "id": "...",
        "name": "خدمات الضيافة",
        "slug": "خدمات-الضيافة"
      },
      ...
    }
  }
}
```

---

## Frontend Migration Checklist

- [ ] **Article list page** — read `article.category` and display it as a badge/filter chip
- [ ] **Article detail page** — display `article.category.name`
- [ ] **Create article form** — add optional `categorySlug` field (dropdown populated from `GET /api/project/:id/categories`)
- [ ] **Edit article form** — add optional `categorySlug` field to update category
- [ ] **Categories management page** — use `POST /api/category`, `PUT /api/category/:id`, `DELETE /api/category/:id`
- [ ] **Category filter** — use `GET /api/project/:id/articles/category/:slug` to filter articles
