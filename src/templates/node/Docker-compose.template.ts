import { UserChoices } from "../../types";

export const NodeComposeTemplate = (choices: UserChoices) => {
  let dbConfig = "";
  let appDependsOn = "";
  let appEnv = `      - NODE_ENV=production\n      - PORT=8080`;
  let volumes = "";

  // Dynamically inject PostgreSQL if selected
  if (choices.database === "postgres") {
    appDependsOn = `
    depends_on:
      - postgres`;

    appEnv += `
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USER=devuser
      - DB_PASSWORD=devpassword
      - DB_NAME=app_db`;

    dbConfig = `
  postgres:
    image: postgres:15-alpine
    container_name: devlaunch-postgres
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: devpassword
      POSTGRES_DB: app_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devuser -d app_db"]
      interval: 5s
      timeout: 5s
      retries: 5`;

    volumes = `\nvolumes:\n  pgdata:`;
  }

  return `
services:
  app:
    build: 
      context: .
      dockerfile: Dockerfile
    container_name: devlaunch-node-app
    ports:
      - "8080:8080"
    environment:
${appEnv}${appDependsOn}
${dbConfig}
${volumes}
`.trim();
};
