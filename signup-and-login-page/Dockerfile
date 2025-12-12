# Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]