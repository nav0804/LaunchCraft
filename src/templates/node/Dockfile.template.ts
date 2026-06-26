import { UserChoices } from "../../types";

export const NodeDockerfileTemplate = (choices: UserChoices) =>
  `

# ==========================================
# ⚠️ DEVLAUNCH TODO: VERIFY NODE VERSION
# This template defaults to NODE 20. 
# If your package.json uses Node 22, change the '20' below to '22'.
# ==========================================

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 8080
CMD ["npm", "start"]
`.trim();
