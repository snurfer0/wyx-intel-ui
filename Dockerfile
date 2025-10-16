# check=skip=SecretsUsedInArgOrEnv
FROM node:lts-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN --mount=type=cache,target=/root/.pnpm-store \
    --mount=type=cache,target=/root/.cache/pnpm \
    corepack enable pnpm && \
    pnpm config set store-dir /root/.pnpm-store && \
    pnpm install --frozen-lockfile --prefer-offline

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1 \
    SKIP_ENV_VALIDATION=1 \
    NODE_OPTIONS="--max-old-space-size=4096"

ARG SENTRY_AUTH_TOKEN
ARG RELEASE_VERSION
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN} \
    RELEASE_VERSION=${RELEASE_VERSION}

COPY .env .env
RUN [ -s .env ] || (echo "Error: .env file is empty" >&2 && exit 1)

RUN --mount=type=cache,target=/root/.pnpm-store \
    --mount=type=cache,target=/root/.cache/pnpm \
    --mount=type=cache,target=/app/.next/cache \
    corepack enable pnpm && \
    pnpm config set store-dir /root/.pnpm-store && \
    NEXT_CACHE_HANDLER=cache-handler pnpm run build:with-sentry

FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public       ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static

USER nextjs

EXPOSE 3000
ENV HOSTNAME="0.0.0.0" PORT=3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', res => process.exit(res.statusCode===200?0:1))"

CMD ["node", "server.js"]