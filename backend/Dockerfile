# Stage 1: Development
FROM node:18 AS dev
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]

# Stage 2: Production
FROM node:18 AS prod
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/index.js"]