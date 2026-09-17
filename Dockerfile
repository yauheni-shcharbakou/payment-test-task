# syntax=docker/dockerfile:1.2

FROM node:22-alpine AS base
ENV CI=true
ENV NODE_ENV=production
WORKDIR /app

FROM base AS builder
ENV PATH="/usr/bin:${PATH}"
ENV YARN_CACHE_FOLDER=/usr/local/share/.cache/yarn
COPY . .
RUN --mount=type=cache,id=payments-backend-yarn-cache,target=/usr/local/share/.cache/yarn \
    yarn install \
    --ignore-scripts \
    --production=false
RUN yarn build
RUN --mount=type=cache,id=payments-backend-yarn-cache,target=/usr/local/share/.cache/yarn \
    yarn install \
    --ignore-scripts \
    --production \
    --frozen-lockfile \
    --offline

FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=builder --chown=nestjs:nodejs /app ./
EXPOSE $PORT
CMD ["node", "dist/main"]
