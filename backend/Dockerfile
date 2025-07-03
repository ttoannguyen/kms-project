# 1. Base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy source code
COPY . .

# 5. Set env (for local dev only, already mounted via volume)
COPY .env.production .env

# 6. Build TypeScript
RUN npm run build

# 7. Copy wait script
COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh

# 8. Expose port and run
EXPOSE 4000
CMD ["./wait-for-postgres.sh"]
