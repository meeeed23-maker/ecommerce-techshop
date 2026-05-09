# Étape 1: Build de l'application Angular
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm ci --silent

# Copier le reste du code source
COPY . .

# Build en mode production
RUN npm run build -- --configuration=production

# Étape 2: Servir avec nginx
FROM nginx:alpine

# Copier les fichiers buildés
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# Configuration nginx pour le routing Angular
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://backend:8080; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
