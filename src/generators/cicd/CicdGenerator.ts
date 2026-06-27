import { BaseGenerator } from "../base/BaseGenerator";
import { UserChoices } from "../../types";
import { TemplateRegistry } from "../../templates/registry/TemplateRegistry";

export class CicdGenerator extends BaseGenerator {
  readonly outputFileName = "Jenkinsfile"; // Adjust if supporting GitHub actions later

  generate(choices: UserChoices): string {
    // e.g., 'jenkins:node:express' or 'jenkins:java:springboot'
    const registryKey = `jenkins:${choices.stack.language}:${choices.stack.framework}`;
    return TemplateRegistry.get(registryKey, choices);
  }
}
