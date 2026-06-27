import { UserChoices } from "../../../types";

export const ReactDockerfileTemplate = (choices: UserChoices) =>
  `
# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Note: If using Vite, this creates a 'dist' folder. If using Create React App, it's 'build'.
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# We copy the compiled static files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# (Optional) Copy a custom nginx.conf here if handling client-side routing
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
`.trim();
