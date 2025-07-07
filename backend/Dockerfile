# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env.production .env

RUN npm run build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./
# COPY wait-for-postgres.sh .
# RUN chmod +x wait-for-postgres.sh

EXPOSE 4000
CMD ["./wait-for-postgres.sh"]
