FROM node:18 AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:18 AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app ./
EXPOSE 3000
CMD ["pnpm", "start"]