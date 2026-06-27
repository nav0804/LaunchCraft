import * as vscode from "vscode";
import { BaseDetector } from "./base/BaseDetector";
import { LanguageEnum, StackProfile } from "../types";
import { Logger } from "../utils/logger";

export class SpringBootDetector extends BaseDetector {
  protected async tryDetect(root: vscode.Uri): Promise<StackProfile | null> {
    Logger.info(`Scanning for Spring Boot project...`);
    const hasPom = await this.fileExists("pom.xml");
    const hasGradle = await this.fileExists("build.gradle");

    if (!hasPom && !hasGradle) return null;

    Logger.info(`Build file found: ${hasPom ? "pom.xml" : "build.gradle"}`);

    const profile: StackProfile = {
      language: LanguageEnum.JAVA,
      framework: "springboot",
      hasDockerfile: await this.fileExists("Dockerfile"),
    };

    try {
      const propsUri = vscode.Uri.joinPath(
        root,
        "src",
        "main",
        "resources",
        "application.properties"
      );
      const fileBytes = await vscode.workspace.fs.readFile(propsUri);
      const content = Buffer.from(fileBytes).toString("utf8");
      Logger.info(`Parsing application.properties...`);

      const urlMatch = content.match(/^spring\.datasource\.url\s*=\s*(.+)$/m);
      const userMatch = content.match(
        /^spring\.datasource\.username\s*=\s*(.+)$/m
      );
      const passMatch = content.match(
        /^spring\.datasource\.password\s*=\s*(.+)$/m
      );

      if (urlMatch) {
        const fullUrl = urlMatch[1].trim();
        const dbNameMatch = fullUrl.match(/\/([a-zA-Z0-9_-]+)(?:\?.*)?$/);
        profile.dbConfig = {
          url: fullUrl,
          username: userMatch?.[1].trim() ?? "root",
          password: passMatch?.[1].trim() ?? "rootpassword",
          dbName: dbNameMatch?.[1] ?? "devdb",
        };
        Logger.info(
          `✅ Parsed dbConfig: db=${profile.dbConfig.dbName}, user=${profile.dbConfig.username}`
        );
      }
    } catch (err) {
      Logger.info(`No application.properties found, using defaults.`);
    }

    return profile;
  }
}
