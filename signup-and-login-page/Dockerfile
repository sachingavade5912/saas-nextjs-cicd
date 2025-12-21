# ===============================
# Build stage
# ===============================
FROM node:18 AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only dependency files first (better cache)
COPY package.json pnpm-lock.yaml ./

# Install dependencies exactly as locked
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

RUN node -v && pnpm -v
RUN ls -la
RUN cat package.json

RUN pnpm run build || (echo "==== NEXT BUILD FAILED ====" && exit 1)


# ===============================
# Runtime stage
# ===============================
FROM node:18 AS runner

WORKDIR /app
ENV NODE_ENV=production

# Install pnpm for runtime scripts
RUN npm install -g pnpm

# Copy built app and dependencies
COPY --from=builder /app ./

EXPOSE 3000

CMD ["pnpm", "start"]
