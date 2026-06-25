import { UserChoices } from "../../types";

export const ReactComposeTemplate = (choices: UserChoices) =>
  `
services:
  frontend:
    build: 
      context: .
      dockerfile: Dockerfile
    container_name: devlaunch-react-app
    ports:
      # Maps your machine's port 3000 to Nginx's internal port 80
      - "3000:80"
    restart: unless-stopped
`.trim();
