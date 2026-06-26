import * as vscode from "vscode";
import { BaseDetector } from "./base/BaseDetector";
import { languageEnum, StackProfile } from "../types";

export class SpringBootDetector extends BaseDetector {
  protected async tryDetect(root: vscode.Uri): Promise<StackProfile | null> {
    if (
      (await this.fileExists("pom.xml")) ||
      (await this.fileExists("build.gradle"))
    ) {
      return {
        language: languageEnum.JAVA,
        framework: "springboot",
        hasDockerfile: await this.fileExists("Dockerfile"),
      };
    }
    return null;
  }
}
