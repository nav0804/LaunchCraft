import * as vscode from "vscode";
import { StackProfile, UserChoices } from "../types";
import { Logger } from "../utils/logger";

export async function runMenuFlow(
  detected: StackProfile
): Promise<UserChoices | null> {
  Logger.info(
    `Starting menu flow for detected stack: ${detected.language}/${detected.framework}`
  );

  const confirmStack = await vscode.window.showQuickPick(
    ["Yes, use detected stack", "No, cancel"],
    {
      placeHolder: `Detected: ${detected.language} (${detected.framework}). Is this correct?`,
    }
  );
  if (confirmStack !== "Yes, use detected stack") {
    Logger.info(`User cancelled at stack confirmation.`);
    return null;
  }

  const database = await vscode.window.showQuickPick(
    ["none", "postgres", "mysql", "mongodb", "redis"],
    { placeHolder: "Select your database" }
  );
  if (!database) {
    Logger.info(`User cancelled at database selection.`);
    return null;
  }
  Logger.info(`Database selected: ${database}`);

  const cicd = await vscode.window.showQuickPick(
    ["none", "jenkins", "github-actions"],
    { placeHolder: "Select your CI/CD pipeline" }
  );
  if (!cicd) {
    Logger.info(`User cancelled at CI/CD selection.`);
    return null;
  }
  Logger.info(`CI/CD selected: ${cicd}`);

  const platform = await vscode.window.showQuickPick(
    ["docker-only", "railway", "render", "fly"],
    { placeHolder: "Select deployment target" }
  );
  if (!platform) {
    Logger.info(`User cancelled at platform selection.`);
    return null;
  }
  Logger.info(`Platform selected: ${platform}`);

  Logger.info(
    `✅ Menu flow complete. Choices: db=${database}, cicd=${cicd}, platform=${platform}`
  );
  return {
    stack: detected,
    database: database as UserChoices["database"],
    cicd: cicd as UserChoices["cicd"],
    platform: platform as UserChoices["platform"],
  };
}
