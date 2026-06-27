import * as vscode from "vscode";
import { BaseDetector } from "./base/BaseDetector";
import { LanguageEnum, StackProfile } from "../types";
import { Logger } from "../utils/logger";

export class SpringBootDetector extends BaseDetector {
  protected async tryDetect(root: vscode.Uri): Promise<StackProfile | null> {
    Logger.info(`Scanning for Spring Boot project...`);
    const hasPom = await this.fileExists("pom.xml");
    const hasGradle = await this.fileExists("build.gradle");

    if (hasPom || hasGradle) {
      Logger.info(`Build file found: ${hasPom ? "pom.xml" : "build.gradle"}`);
      return {
        language: LanguageEnum.JAVA,
        framework: "springboot",
        hasDockerfile: await this.fileExists("Dockerfile"),
      };
    }

    return null;
  }
}
