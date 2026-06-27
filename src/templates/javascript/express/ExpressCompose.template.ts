import { UserChoices } from "../../../types";
import { DatabaseRegistry } from "../../databases/DatabaseRegistry";

export const ExpressComposeTemplate = (choices: UserChoices) => {
  const dbSnippet =
    choices.database && choices.database !== "none"
      ? DatabaseRegistry.get(choices.database)
      : null;

  const dependsOnBlock = dbSnippet
    ? `\n    depends_on:\n      - ${dbSnippet.serviceName}`
    : "";
  const serviceYaml = dbSnippet ? `\n${dbSnippet.serviceYaml}` : "";
  const volumeYaml = dbSnippet ? `\n${dbSnippet.volumeYaml}` : "";

  return `version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env${dependsOnBlock}${serviceYaml}${volumeYaml}
`.trim();
};
