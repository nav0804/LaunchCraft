import { BaseGenerator } from "./base/BaseGenerator";
import { UserChoices } from "../types";
import { DockerfileGenerator } from "./DockFileGenerator";
import { ComposeGenerator } from "./ComposeGenerator";
import { CicdGenerator } from "./cicd/CicdGenerator";
import { Logger } from "../utils/logger";

export class GeneratorFactory {
  static build(choices: UserChoices): BaseGenerator[] {
    Logger.info(
      `Building generator chain for: ${choices.stack.language}/${choices.stack.framework}`
    );
    const generators: BaseGenerator[] = [];

    generators.push(new DockerfileGenerator());
    Logger.info(`Added: DockerfileGenerator`);

    generators.push(new ComposeGenerator());
    Logger.info(`Added: ComposeGenerator`);

    if (choices.cicd === "jenkins") {
      generators.push(new CicdGenerator());
      Logger.info(`Added: CicdGenerator (jenkins)`);
    }

    Logger.info(`Total generators: ${generators.length}`);
    return generators;
  }
}
