import * as vscode from "vscode";
import { BaseDetector } from "./base/BaseDetector";
import { languageEnum, StackProfile } from "../types";

export class NodeDetector extends BaseDetector {
  protected async tryDetect(root: vscode.Uri): Promise<StackProfile | null> {
    const files = await vscode.workspace.findFiles(
      "package.json",
      "**/node_modules/**",
      1
    );

    if (files.length > 0) {
      // Read the package.json to see what kind of JS project this is
      const document = await vscode.workspace.openTextDocument(files[0]);
      const text = document.getText();

      let framework = "express"; // Default fallback

      if (text.includes('"react"')) {
        framework = "react";
      } else if (text.includes('"@angular/core"')) {
        framework = "angular";
      }

      return {
        language: languageEnum.NODE,
        framework: framework,
        hasDockerfile: await this.fileExists("Dockerfile"),
      };
    }
    return null;
  }
}
