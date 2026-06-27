  import { UserChoices } from "../../../types";

  export const NodeDockerfileTemplate = (choices: UserChoices) =>
    `

  # ==========================================
  # ⚠️ DEVLAUNCH TODO: VERIFY NODE VERSION
  # This template defaults to NODE 20. 
  # If your package.json uses Node 22, change the '20' below to '22'.
  # ==========================================

  FROM node:20-alpine
  # Set the working directory
  WORKDIR /app
  # Copy package files and install dependencies
  COPY package*.json ./
  RUN npm ci
  # Copy the rest of the application code
  COPY . .
  # Expose the standard Node port (update if your app uses a different one)
  EXPOSE 3000
  # Start the application
  CMD ["npm", "start"]
  `.trim();
