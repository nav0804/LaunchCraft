import * as vscode from "vscode";
import { StackProfile } from "../../types";

export abstract class BaseDetector {
  protected next: BaseDetector | null = null;

  public setNext(detector: BaseDetector): BaseDetector {
    this.next = detector;
    return detector;
  }

  public async detect(root: vscode.Uri): Promise<StackProfile | null> {
    const result = await this.tryDetect(root);
    if (result) {
      return result;
    }
    return this.next ? this.next.detect(root) : null;
  }

  protected abstract tryDetect(root: vscode.Uri): Promise<StackProfile | null>;

  protected async fileExists(filename: string): Promise<boolean> {
    const files = await vscode.workspace.findFiles(
      filename,
      "**/node_modules/**",
      1
    );
    return files.length > 0;
  }
}
