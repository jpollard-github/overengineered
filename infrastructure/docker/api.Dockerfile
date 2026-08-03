FROM node:24-alpine AS build
RUN corepack enable
WORKDIR /workspace
COPY . .
RUN pnpm install --frozen-lockfile && pnpm --filter @overengineered/api build
FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /workspace/apps/api/dist ./dist
EXPOSE 4001
CMD ["node","dist/server.js"]
