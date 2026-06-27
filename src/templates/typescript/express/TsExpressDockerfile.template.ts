import { UserChoices } from "../../../types";

export const TsDockerfileTemplate = (choices: UserChoices) =>
  `
# Stage 1: Build the TypeScript code
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Install ALL dependencies (including devDependencies like typescript)
RUN npm install
COPY . .
# Compile the TS code to JS (usually outputs to a /dist or /build folder)
RUN npm run build

# Stage 2: Production runtime
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Install ONLY production dependencies to keep the image tiny
RUN npm ci --only=production
# Copy the compiled JS files from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000
# Run the compiled JavaScript
CMD ["node", "dist/index.js"]
`.trim();
