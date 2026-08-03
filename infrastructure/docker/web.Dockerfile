FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /workspace
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/web/package.json apps/web/package.json
COPY packages packages
RUN pnpm install --frozen-lockfile=false
FROM base AS build
COPY apps/web apps/web
COPY tsconfig.json turbo.json nx.json ./
RUN pnpm --filter @overengineered/web build
FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /workspace/apps/web/.next/standalone ./
COPY --from=build /workspace/apps/web/.next/static ./apps/web/.next/static
EXPOSE 3000
CMD ["node","apps/web/server.js"]
