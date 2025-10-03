# Stage 1: Build frontend
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install all dependencies (dev + prod)
COPY package*.json ./
RUN npm install        # NOT --only=production

# Copy source
COPY . .

# Build frontend
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
