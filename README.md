# Meghpiyon (মেঘপিয়ন) 🎁

> **"ভালোবাসা পৌঁছে যাক উপহারে।"**  
> *Delivering love wrapped in gifts.*

A production-ready e-commerce platform for curated gift items, personalized presents, traditional Bangladeshi handicrafts, and blooming floral bouquets across all 64 districts in Bangladesh.

---

## 1. Architecture & Tech Stack

This project is structured as an optimized monorepo managed with **Bun Workspaces**:

- **Frontend (`apps/web`):** [Astro](https://astro.build) (v5) + [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) + [Tailwind CSS](https://tailwindcss.com)
  - Server-static generation for high performance & SEO.
  - Zero unnecessary motion effects or heavy client JavaScript.
  - Custom sky blue (`#0284c7`) and white color palette.
  - Ready for deployment on **Cloudflare Pages**.
- **Backend (`apps/api`):** [Express.js](https://expressjs.com) + [TypeScript](https://www.typescriptlang.org)
  - Strict modular architecture (`config`, `controllers`, `middleware`, `models`, `routes`, `services`, `utils`).
  - Security with `helmet`, configurable `cors`, and centralized error handling with `AppError`.
  - Versioned API (`/api/v1`) with top-level health checks (`/api/health`).
  - Ready for deployment on **Express-compatible hosting** via multi-stage Docker.
- **Database:** [MongoDB](https://www.mongodb.com) with [Mongoose](https://mongoosejs.com) ODM.
- **Shared Validation & Contracts (`packages/shared`):** [Zod](https://zod.dev) schemas and strongly typed interfaces shared seamlessly across frontend and backend.
- **Package Manager:** [Bun](https://bun.sh) (v1.3+).

---

## 2. Monorepo Structure

```text
meghpiyon/
├── apps/
│   ├── web/                        # Astro frontend application
│   │   ├── public/                 # Static assets (favicons, images)
│   │   ├── src/
│   │   │   ├── components/         # Reusable Astro & React components
│   │   │   │   ├── layout/         # Header, Footer
│   │   │   │   ├── shop/           # Shop & category components
│   │   │   │   └── ui/             # Container, Badge, Card
│   │   │   ├── layouts/            # BaseLayout with SEO & metadata
│   │   │   ├── pages/              # Astro file-based routes
│   │   │   │   ├── index.astro     # / — Home (hero, categories, values)
│   │   │   │   ├── shop.astro      # /shop — Product listing & filtering
│   │   │   │   ├── product/        # /product/[slug] — Product details
│   │   │   │   ├── cart.astro      # /cart — Gift cart & note preview
│   │   │   │   ├── checkout.astro  # /checkout — Bangladesh delivery & payments
│   │   │   │   ├── about.astro     # /about — Meghpiyon story & artisans
│   │   │   │   ├── contact.astro   # /contact — Support & concierge
│   │   │   │   ├── login.astro     # /login — Customer sign in
│   │   │   │   ├── register.astro  # /register — Account creation
│   │   │   │   └── track-order.astro # /track-order — Live parcel tracking
│   │   │   └── styles/             # Tailwind & CSS variables
│   │   ├── astro.config.mjs        # Astro configuration with React & Tailwind
│   │   ├── tailwind.config.mjs     # Sky blue & Bengali typography config
│   │   ├── wrangler.jsonc          # Cloudflare Pages deployment configuration
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/                        # Express backend application
│       ├── src/
│       │   ├── config/             # Environment (Zod) & Mongoose DB connection
│       │   ├── controllers/        # Health, Auth, Product, Order controllers
│       │   ├── middleware/         # Zod validation, error handler, CORS, 404
│       │   ├── models/             # User, Product, Order Mongoose schemas
│       │   ├── routes/             # Top-level & /api/v1 versioned routes
│       │   ├── services/           # Health & business services
│       │   ├── utils/              # AppError, ApiResponse, Logger
│       │   ├── app.ts              # Express application factory
│       │   └── server.ts           # HTTP listener & graceful shutdown
│       ├── Dockerfile              # Production multi-stage container
│       ├── .dockerignore
│       ├── .env.example
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── shared/                     # Cross-platform contracts
│       ├── src/
│       │   ├── constants/          # Brand info, categories, divisions, statuses
│       │   ├── schemas/            # Zod validation schemas (Auth, Product, Order, etc.)
│       │   ├── types/              # Inferred TypeScript definitions
│       │   └── index.ts            # Public library exports
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                    # Workspace root scripts & dev dependencies
├── bun.lock                        # Bun lockfile
├── .gitignore                      # Git ignore rules
├── .env.example                    # Root environment variable template
└── README.md                       # Documentation
```

---

## 3. Quick Start & Setup

### Prerequisites

- [Bun](https://bun.sh) (v1.3.0 or higher)
- [Node.js](https://nodejs.org) (v22.x LTS)
- [MongoDB](https://www.mongodb.com) (Local instance or MongoDB Atlas cluster URI)

### Installation

1. Clone repository:
   ```bash
   git clone <repository-url>
   cd meghpion
   ```

2. Install dependencies across all workspaces:
   ```bash
   bun install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env
   cp apps/web/.env.example apps/web/.env
   cp apps/api/.env.example apps/api/.env
   ```

4. Build shared package:
   ```bash
   bun --filter @meghpiyon/shared build
   ```

---

## 4. Development & Build Scripts

Run these commands from the root directory:

| Script | Command | Purpose |
|---|---|---|
| **`bun dev`** | `bun run dev` | Runs both frontend (port 3000) and backend (port 5000) concurrently with color-coded logs. |
| **`bun dev:web`** | `bun run dev:web` | Runs Astro frontend only (`http://localhost:3000`). |
| **`bun dev:api`** | `bun run dev:api` | Runs Express backend only in watch mode (`http://localhost:5000`). |
| **`bun build`** | `bun run build` | Builds shared package, compiles backend TypeScript, and builds Astro static pages. |
| **`bun typecheck`** | `bun run typecheck` | Runs `tsc --noEmit` across shared, backend, and frontend packages. |
| **`bun lint`** | `bun run lint` | Runs code verification and type linting across all packages. |

---

## 5. Environment Variables

### Frontend (`apps/web/.env`)
```ini
# Public API gateway URL accessed by browser or SSR client
PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Backend (`apps/api/.env`)
```ini
# Server port
PORT=5000

# Environment mode ('development' | 'production' | 'test')
NODE_ENV=development

# MongoDB Connection String (Local or MongoDB Atlas)
MONGODB_URI=mongodb://127.0.0.1:27017/meghpiyon

# Allowed CORS origins (comma-separated for multiple origins)
CORS_ORIGIN=http://localhost:3000

# API Versioning prefix
API_PREFIX=/api/v1
```

---

## 6. Endpoints & Health Check

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Health check endpoint returning status, uptime, service version, and MongoDB connection state. |
| `/api/v1/health` | `GET` | Versioned health check. |
| `/api/v1/auth/register` | `POST` | User registration (validated via Zod). |
| `/api/v1/auth/login` | `POST` | User authentication (validated via Zod). |
| `/api/v1/products` | `GET` | Product catalog with pagination and category filtering. |
| `/api/v1/products/:slug` | `GET` | Product detail endpoint. |
| `/api/v1/orders` | `POST` | Create order with recipient details, gift wrap note, and payment method. |
| `/api/v1/orders/:orderNumber` | `GET` | Order status and tracking timeline. |

---

## 7. Deployment Guides

### Frontend: Cloudflare Pages

The web application is statically compiled to `apps/web/dist` with zero server overhead.

1. Connect your repository to **Cloudflare Pages**.
2. Set build configuration:
   - **Framework Preset:** `Astro`
   - **Build Command:** `bun run build`
   - **Build Output Directory:** `apps/web/dist`
   - **Root Directory:** (leave blank or specify `/`)
3. Add environment variable:
   - `PUBLIC_API_URL`: Your live API URL (e.g. `https://api.meghpiyon.com/api/v1`)

### Backend: Express-Compatible Hosting (Docker / Render / Railway / VPS)

The API is packaged with a multi-stage `Dockerfile`:

```bash
# Build container image
docker build -f apps/api/Dockerfile -t meghpiyon-api .

# Run container
docker run -p 5000:5000 --env-file apps/api/.env meghpiyon-api
```

Or deploy directly to Render, Railway, Fly.io, or any Ubuntu/Debian VPS running Bun or Node.js.

### Database: MongoDB Atlas

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and configure IP whitelist (`0.0.0.0/0` or dedicated VPS IP).
3. Set `MONGODB_URI` in `apps/api/.env` to:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/meghpiyon?retryWrites=true&w=majority
   ```

---

## 8. License

Copyright © 2026 Meghpiyon. All rights reserved.
# meghpion.shop
