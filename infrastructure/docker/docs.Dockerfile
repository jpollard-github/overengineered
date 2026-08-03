FROM node:24-alpine AS build
RUN corepack enable
WORKDIR /workspace
COPY . .
RUN pnpm install --frozen-lockfile && pnpm --filter @overengineered/docs build
FROM nginx:1.29-alpine AS runtime
COPY --from=build /workspace/apps/docs/dist /usr/share/nginx/html
EXPOSE 80
