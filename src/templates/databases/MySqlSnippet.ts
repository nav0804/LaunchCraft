import { IDatabaseSnippet } from "./IDatabaseSnippet";

export const MySqlSnippet: IDatabaseSnippet = {
  serviceName: "mysql",
  serviceYaml: (dbName: string, password: string) => `
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: ${password}
      MYSQL_DATABASE: ${dbName}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5`,
  volumeYaml: `
volumes:
  mysql_data:`
};
