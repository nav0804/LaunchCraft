import { IDatabaseSnippet } from "./IDatabaseSnippet";

export const PostgresSnippet: IDatabaseSnippet = {
  serviceName: "postgres",
  serviceYaml: `
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: rootpassword
      POSTGRES_DB: devdb
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data`,
  volumeYaml: `
volumes:
  pg_data:`
};
