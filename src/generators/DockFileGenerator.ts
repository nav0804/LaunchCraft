import { TemplateRegistry } from "../templates/registry/TemplateRegistry";
import { UserChoices } from "../types";
import { BaseGenerator } from "./base/BaseGenerator";

export class DockerfileGenerator extends BaseGenerator {
  readonly outputFileName = "Dockerfile";

  generate(choices: UserChoices): string {
    // Looks up the template based on the language (e.g., 'dockerfile:node')
    const registryKey = `dockerfile:${choices.stack.language}:${choices.stack.framework}`;
    return TemplateRegistry.get(registryKey, choices);
  }
}
