import { IDatabaseSnippet } from "./IDatabaseSnippet";

export const PostgresSnippet: IDatabaseSnippet = {
  serviceName: "postgres",
  serviceYaml: (dbName: string, password: string) => `
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: ${password}
      POSTGRES_DB: ${dbName}
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data`,
  volumeYaml: `
volumes:
  pg_data:`,
};
