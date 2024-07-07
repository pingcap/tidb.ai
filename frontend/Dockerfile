FROM node:20-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /tidb.ai

RUN mkdir app

# Install dependencies based on the preferred package manager
COPY package.json .
COPY pnpm-*.yaml .
COPY app/package.json ./app

RUN corepack enable pnpm
RUN pnpm i --frozen-lockfile


# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /tidb.ai
COPY --from=deps /tidb.ai/node_modules ./node_modules
COPY --from=deps /tidb.ai/app/node_modules ./app/node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
#COPY .env.production.sample .env.production

ENV BASE_URL ""
ENV NEXT_PUBLIC_BASE_URL ""

RUN rm -f app/.env
RUN echo BASE_URL=${BASE_URL:-'""'} >> app/.env.production
RUN echo NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL:-'""'} >> app/.env.production

RUN corepack enable pnpm
RUN pnpm run build:docker
RUN pnpm run build:widget-react

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /tidb.ai

ENV NODE_ENV=production
ENV PORT 3000
ENV HOSTNAME 0.0.0.0

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /tidb.ai/app/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /tidb.ai/app/.next/static app/.next/static

COPY --from=builder /tidb.ai/app/public app/public

USER nextjs

EXPOSE 3000


CMD node app/server.js
