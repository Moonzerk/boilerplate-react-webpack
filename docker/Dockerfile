# ---- BUILD STAGE ----
FROM node:18-alpine AS build

RUN yarn global add pnpm

WORKDIR /app
COPY . .

RUN pnpm install
RUN pnpm run build

# ---- PRODUCTION STAGE ----
FROM nginx:1.21-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
