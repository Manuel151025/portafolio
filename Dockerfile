# syntax=docker/dockerfile:1
# Dockerfile multi-stage: compila Astro con Node y sirve dist/ con nginx.
# Node NO queda en la imagen final. Ver CLAUDE.md §10.

# ============================================================
# Etapa 1 — build (Node)
# ============================================================
FROM node:22-alpine AS build
WORKDIR /app

# Instala dependencias primero (mejor uso de la cache de capas:
# solo se reinstala si cambian package.json / package-lock.json).
COPY package.json package-lock.json ./
RUN npm ci

# Copia el código y compila el sitio estático → /app/dist
COPY . .
RUN npm run build

# ============================================================
# Etapa 2 — runtime (nginx sirve los estáticos)
# ============================================================
FROM nginx:alpine AS runtime

# Configuración para sitio estático
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Artefactos compilados de la etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
