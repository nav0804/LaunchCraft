import { TemplateRegistry } from "../templates/registry/TemplateRegistry";
import { UserChoices } from "../types";
import { BaseGenerator } from "./base/BaseGenerator";

export class ComposeGenerator extends BaseGenerator {
  readonly outputFileName = "docker-compose.yml";

  generate(choices: UserChoices): string {
    const registryKey = `compose:${choices.stack.language}:${choices.stack.framework}`;
    return TemplateRegistry.get(registryKey, choices);
  }
}
