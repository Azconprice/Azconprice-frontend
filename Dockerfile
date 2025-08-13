# ------------------------------------------------------
# 1) Install deps (cached layer)
# ------------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app

# Only copy manifests to maximize Docker layer caching
COPY package.json package-lock.json ./
RUN npm ci

# ------------------------------------------------------
# 2) Build the app
# ------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Bring in node_modules and then the rest of the source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js in standalone mode (Next does this automatically in prod)
# If you have a custom build script, keep it as "build" in package.json
RUN npm run build

# ------------------------------------------------------
# 3) Run the app with minimal runtime
# ------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create non-root user
RUN addgroup -g 1001 nodejs \
  && adduser -S -u 1001 nextjs

# Copy the standalone server + static assets
# Standalone includes the minimal node_modules needed at runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# Optional: copy next.config.js if your runtime depends on it
COPY --from=builder /app/next.config.js ./next.config.js

USER 1001
EXPOSE 3000
CMD ["node", "server.js"]
