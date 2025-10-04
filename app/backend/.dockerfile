FROM node:18-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV PORT=8002
EXPOSE $PORT

# 🩺 Health Check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --spider -q http://localhost:$PORT/health || exit 1

CMD ["node", "server.js"]
