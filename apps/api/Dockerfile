# Multi-stage production Dockerfile for Meghpiyon API
FROM oven/bun:1.3.14-alpine AS base
WORKDIR /app

# Step 1: Install dependencies
FROM base AS dependencies
COPY package.json bun.lock* ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/
RUN bun install --frozen-lockfile || bun install

# Step 2: Build packages
FROM dependencies AS builder
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api
RUN bun --filter @meghpiyon/shared build
RUN bun --filter @meghpiyon/api build

# Step 3: Production runner
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder /app/package.json /app/bun.lock* ./
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 5000

CMD ["bun", "apps/api/dist/server.js"]
