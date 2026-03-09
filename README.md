---
name: 'Shrinkle'
tagline: 'URL shortener with animated UI and click tracking'
platform: 'Web'
status: 'active'
category: 'developer-tools'
icon: '🔗'
features:
  - 'Shorten URLs with 5-char codes'
  - 'Click tracking and analytics'
  - 'Animated color-cycling UI'
  - 'One-click copy to clipboard'
  - 'Responsive mobile-first design'
downloadUrl: ''
visible: true
---

# 🔗 Shrinkle — URL Shortener

> **"Eliminate those long hard-to-remember links"**

Shrinkle is a URL shortening service integrated into the Entity Builders monorepo. It features an animated, colorful UI and uses Supabase for persistence and redirects.

## 📸 Overview

| Feature               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| **Shorten URLs**      | Paste any long URL and get a 5-char short code       |
| **Click Tracking**    | Every redirect increments a click counter            |
| **Copy to Clipboard** | One-click copy of shortened URLs                     |
| **Animated UI**       | Random color-cycling background using `react-spring` |
| **Responsive**        | Mobile-first design with `styled-media-query`        |
| **Local Persistence** | Shortened URLs saved in `localStorage` per session   |

---

## 🏗️ Architecture

```
apps/shrinkle/               ← Frontend (React + Vite)
eb-infra/supabase/
  migrations/..._short_urls  ← Database table
  functions/shrinkle-redirect ← Edge Function (redirect + click tracking)
```

### Frontend

| Tech                      | Purpose                              |
| ------------------------- | ------------------------------------ |
| **Vite**                  | Build tool & dev server              |
| **React 18**              | UI framework                         |
| **@supabase/supabase-js** | Direct DB access (insert, select)    |
| **@paralleldrive/cuid2**  | Short code generation (5-char IDs)   |
| **styled-components**     | CSS-in-JS styling                    |
| **react-spring**          | Animated background & border effects |

### Backend (Supabase)

| Component                             | Purpose                                                        |
| ------------------------------------- | -------------------------------------------------------------- |
| **`short_urls` table**                | Stores original URL, short code, click count                   |
| **`shrinkle-redirect` Edge Function** | Resolves short code → returns original URL + increments clicks |
| **RLS Policies**                      | Anon can insert/read, service_role can update                  |

---

## 🚀 Getting Started

### Prerequisites

- Supabase running locally (`cd eb-infra && npx supabase start`)
- Node.js 18+

### Setup

```bash
# From monorepo root
yarn install

# Apply the migration (creates short_urls table)
cd eb-infra && npx supabase db reset

# Start the app
yarn start:shrinkle
```

### Environment Variables (`apps/shrinkle/.env`)

```
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=<your-local-anon-key>
VITE_REDIRECT_BASE_URL=http://localhost:54321/functions/v1/shrinkle-redirect
```

---

## 🌌 Entity Builders Integration

| Area              | Status                                                      |
| ----------------- | ----------------------------------------------------------- |
| **Monorepo**      | ✅ Yarn workspace, root scripts                             |
| **Database**      | ✅ Supabase (shared infra)                                  |
| **Backend**       | ✅ Supabase Edge Function                                   |
| **`eb-packages`** | ⏳ Future: extract `cleanUrl`, `isValidUrl`, `cuid2` config |
| **Analytics**     | ⏳ Future: PostHog integration                              |

### Monetization Potential 💰

- **API-as-a-Service** — URL shortening logic in `eb-packages`
- **Chrome Extension** — Quick-access URL shortener
- **Custom Domains** — White-label short URLs
- **Analytics Dashboard** — Click tracking data as paid feature
