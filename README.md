# 🔗 Shrinkle — URL Shortener

> **"Eliminate those long hard-to-remember links"**

Shrinkle is a full-stack URL shortening service that generates concise, shareable short links. It features an animated, colorful UI and a serverless backend with click tracking.

## 📸 Overview

| Feature               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| **Shorten URLs**      | Paste any long URL and get a 5-char short code       |
| **Click Tracking**    | Every redirect increments a click counter in the DB  |
| **Copy to Clipboard** | One-click copy of shortened URLs                     |
| **Animated UI**       | Random color-cycling background using `react-spring` |
| **Responsive**        | Mobile-first design with `styled-media-query`        |
| **Local Persistence** | Shortened URLs saved in `localStorage` per session   |

---

## 🏗️ Architecture

The app is split into two independent sub-projects:

```
apps/shrinkle/
├── app/          # 🎨 Frontend (React + Vite + styled-components)
└── server/       # ⚡ Backend  (Netlify Functions + Prisma + PostgreSQL)
```

### Frontend (`app/`)

| Tech                        | Purpose                              |
| --------------------------- | ------------------------------------ |
| **Vite**                    | Build tool & dev server              |
| **React 18**                | UI framework                         |
| **styled-components**       | CSS-in-JS styling                    |
| **react-spring**            | Animated background & border effects |
| **react-router-dom**        | Client-side routing                  |
| **react-copy-to-clipboard** | Copy short URLs                      |
| **uniqolor**                | Random color generation              |
| **local-storage-parser**    | Persist URL history in localStorage  |
| **Cocogoose Pro**           | Custom typography (local font files) |

**Key Components:**

- `AnimatedBackground` — Randomly cycling background colors with smooth spring transitions
- `Form` — URL input with validation, animated border, and API call to shorten
- `UrlItems` — List of shortened URLs with copy/delete actions
- `MainContext` — React Context for managing URL state + localStorage sync

### Backend (`server/`)

| Tech                  | Purpose                                        |
| --------------------- | ---------------------------------------------- |
| **Netlify Functions** | Serverless API (3 functions)                   |
| **Prisma ORM**        | Database access layer                          |
| **PostgreSQL**        | Persistent storage (via Supabase or hosted PG) |
| **cuid2**             | Short code generation (5-char unique IDs)      |

**Serverless Functions:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/short` → `shorten.ts` | `POST` | Creates a new short URL |
| `/*` → `redirect.ts` | `GET` | Resolves short code → 302 redirect + click increment |
| `/getShortUrl` → `getshorturl.ts` | `GET` | Retrieves short URL by `shortCode` query param |

**Database Schema (Prisma):**

```prisma
model ShortUrl {
    id          String   @id @default(cuid())
    originalUrl String
    shortCode   String   @unique
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
    clicks      Int      @default(0)
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted)
- Netlify CLI (`npm i -g netlify-cli`)

### 1. Backend Setup

```bash
cd apps/shrinkle/server

# Install dependencies
npm install

# Configure database connection
cp .env.example .env
# Edit .env → set DATABASE_URL and DIRECT_URL

# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npm run build

# Start dev server
npm run dev   # → Runs on localhost:8888
```

### 2. Frontend Setup

```bash
cd apps/shrinkle/app

# Install dependencies (currently uses pnpm)
pnpm install

# Configure API endpoints
cp .env.template .env
# Edit .env:
#   VITE_API_URL=http://localhost:8888/.netlify/functions
#   VITE_API_URL_REDIRECT=http://localhost:8888

# Start dev server
pnpm dev   # → Runs on localhost:5173
```

---

## 🌐 Deployment

Both projects deploy independently as separate Netlify sites:

| Site         | Domain                    | Purpose                        |
| ------------ | ------------------------- | ------------------------------ |
| **Frontend** | `shrinkle.netlify.app`    | Serves the React SPA           |
| **Backend**  | `shrinkle-be.netlify.app` | Hosts the serverless functions |

The frontend's `netlify.toml` proxies `/:param` requests to the backend for redirect resolution.

---

## 🌌 Entity Builders Integration Status

> [!WARNING]
> **Shrinkle is NOT yet integrated into the Entity Builders monorepo.**

### Current Issues

| Problem                      | Detail                                                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Package manager mismatch** | Uses `pnpm` instead of `yarn` (monorepo standard)                                                              |
| **Nested package structure** | Has separate `app/` and `server/` subdirs with their own `package.json`, instead of a single workspace package |
| **No `eb-packages` usage**   | Business logic (URL shortening, validation) lives directly in components instead of in shared packages         |
| **No monorepo root scripts** | Missing `start:shrinkle` in the root `package.json`                                                            |
| **Separate database**        | Uses its own PostgreSQL instance instead of the shared Supabase infra                                          |

### Integration Roadmap

To fully integrate Shrinkle into the Entity Builders universe, consider:

1. **Migrate to yarn** — Switch from `pnpm` to `yarn` for consistency with the monorepo
2. **Flatten package structure** — Move `app/` contents to be the package root, move server functions to `eb-infra/` or keep as a separate workspace
3. **Extract URL logic to `eb-packages`** — `cleanUrl()`, `isValidUrl()`, short code generation → reusable for other apps
4. **Migrate DB to shared Supabase** — Replace Prisma/PostgreSQL with the Supabase singleton from `eb-packages`
5. **Add root scripts** — Add `start:shrinkle` to monorepo root `package.json`
6. **Add analytics** — Integrate PostHog (like `ai-prompt-builder`)

### Monetization Potential 💰

- **API-as-a-Service** — The URL shortening API in `eb-packages` could be sold standalone
- **Chrome Extension** — Quick-access URL shortener from the browser toolbar
- **Custom Domains** — White-label short URLs (e.g., `yourbrand.co/abc`)
- **Analytics Dashboard** — Click tracking data could power a paid analytics feature
