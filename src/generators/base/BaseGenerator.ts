import * as vscode from "vscode";
import { UserChoices } from "../../types";

export abstract class BaseGenerator {
  abstract readonly outputFileName: string;

  abstract generate(choices: UserChoices): string;

  public async write(choices: UserChoices, rootUri: vscode.Uri): Promise<void> {
    const content = this.generate(choices);
    const filePath = vscode.Uri.joinPath(rootUri, this.outputFileName);
    const encoder = new TextEncoder();
    await vscode.workspace.fs.writeFile(filePath, encoder.encode(content));
  }
}
