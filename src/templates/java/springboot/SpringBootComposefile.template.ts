import { UserChoices, DatabaseEnum } from "../../../types";
import { DatabaseRegistry } from "../../databases/DatabaseRegistry";

export const SpringBootComposeTemplate = (choices: UserChoices) => {
  const dbSnippet =
    choices.database && choices.database !== "none"
      ? DatabaseRegistry.get(choices.database)
      : null;

  const dbName = choices.stack.dbConfig?.dbName ?? "devdb";
  const username = choices.stack.dbConfig?.username ?? "root";
  const password = choices.stack.dbConfig?.password ?? "rootpassword";

  let springEnvVars = "";
  if (choices.database === DatabaseEnum.POSTGRES) {
    springEnvVars = `
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/${dbName}
      - SPRING_DATASOURCE_USERNAME=${username}
      - SPRING_DATASOURCE_PASSWORD=${password}
      - SPRING_JPA_HIBERNATE_DDL_AUTO=update`;
  } else if (choices.database === DatabaseEnum.MYSQL) {
    springEnvVars = `
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/${dbName}?allowPublicKeyRetrieval=true&useSSL=false
      - SPRING_DATASOURCE_USERNAME=${username}
      - SPRING_DATASOURCE_PASSWORD=${password}
      - SPRING_JPA_HIBERNATE_DDL_AUTO=update`;
  } else if (choices.database === DatabaseEnum.MONGODB) {
    springEnvVars = `
    environment:
      - SPRING_DATA_MONGODB_URI=mongodb://mongo:27017/${dbName}`;
  }

  const dependsOnBlock = dbSnippet
    ? choices.database === DatabaseEnum.MYSQL
      ? `\n    depends_on:\n      ${dbSnippet.serviceName}:\n        condition: service_healthy`
      : `\n    depends_on:\n      - ${dbSnippet.serviceName}`
    : "";

  const serviceYaml = dbSnippet
    ? `\n${dbSnippet.serviceYaml(dbName, password)}`
    : "";
  const volumeYaml = dbSnippet ? `\n${dbSnippet.volumeYaml}` : "";

  return `version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8080:8080"${springEnvVars}${dependsOnBlock}${serviceYaml}${volumeYaml}`.trim();
};
