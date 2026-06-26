import { BaseGenerator } from "./base/BaseGenerator";
import { UserChoices } from "../types";
import { DockerfileGenerator } from "./DockFileGenerator";
import { ComposeGenerator } from "./ComposeGenerator";
import { CicdGenerator } from "./cicd/CicdGenerator";

export class GeneratorFactory {
  static build(choices: UserChoices): BaseGenerator[] {
    const generators: BaseGenerator[] = [];

    // In V1, we always generate a Dockerfile
    generators.push(new DockerfileGenerator());
    generators.push(new ComposeGenerator());
    if (choices.cicd === "jenkins") {
      generators.push(new CicdGenerator());
    }

    // Future: Add ComposeGenerator, JenkinsGenerator, etc. based on choices.cicd

    return generators;
  }
}
