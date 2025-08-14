# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the NestJS app
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose port (match your .env or default 4000)
EXPOSE 4000

# Set environment variables (optional, can also use .env)
ENV NODE_ENV=production

# Run the app
CMD ["node", "dist/main.js"]
