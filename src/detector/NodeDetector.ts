import * as vscode from "vscode";
import { BaseDetector } from "./base/BaseDetector";
import { LanguageEnum, StackProfile } from "../types";
import { Logger } from "../utils/logger";

export class NodeDetector extends BaseDetector {
  protected async tryDetect(root: vscode.Uri): Promise<StackProfile | null> {
    Logger.info(`Scanning for Node.js project...`);
    const files = await vscode.workspace.findFiles(
      "package.json",
      "**/node_modules/**",
      1
    );

    if (files.length > 0) {
      Logger.info(`Found package.json at ${files[0].path}`);
      const isTypeScript = await this.fileExists("tsconfig.json");
      Logger.info(`TypeScript detected: ${isTypeScript}`);

      const document = await vscode.workspace.openTextDocument(files[0]);
      const text = document.getText();
      let framework = "express";

      if (text.includes('"react"')) {
        framework = "react";
      } else if (text.includes('"@angular/core"')) {
        framework = "angular";
      }

      Logger.info(`Framework detected: ${framework}`);

      return {
        language: isTypeScript
          ? LanguageEnum.TYPESCRIPT
          : LanguageEnum.JAVASCRIPT,
        framework,
        hasDockerfile: await this.fileExists("Dockerfile"),
      };
    }

    return null;
  }
}
