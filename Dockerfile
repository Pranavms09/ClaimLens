# Stage 1: Build the Vite frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install all dependencies (including devDependencies)
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code and run the build script
COPY . .
RUN npm run build

# Stage 2: Setup the production Express server
FROM node:20-alpine AS production

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built Vite frontend from the builder stage
COPY --from=builder /app/dist ./dist

# Copy backend application files
COPY server.js ./
COPY routes/ ./routes/
COPY services/ ./services/

# Expose the API & Web server port
EXPOSE 5000

# Start the Express server
CMD ["node", "server.js"]
