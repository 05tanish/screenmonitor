
FROM node:18-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production


COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV PORT=8002
EXPOSE $PORT

CMD ["node", "server.js"]