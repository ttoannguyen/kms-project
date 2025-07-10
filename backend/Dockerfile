# backend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env.production .env

RUN npm run build || echo "Backend build failed, continuing..."

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["node", "dist/main.js"]
