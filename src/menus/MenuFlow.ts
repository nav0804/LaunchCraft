import * as vscode from "vscode";
import { StackProfile, UserChoices } from "../types";

export async function runMenuFlow(
  detected: StackProfile
): Promise<UserChoices | null> {
  // 1. Confirm Stack
  const confirmStack = await vscode.window.showQuickPick(
    ["Yes, use detected stack", "No, cancel"],
    {
      placeHolder: `Detected: ${detected.language} (${detected.framework}). Is this correct?`,
    }
  );
  if (confirmStack !== "Yes, use detected stack") {
    return null;
  }

  // 2. Select Database
  const database = await vscode.window.showQuickPick(
    ["none", "postgres", "mysql", "mongodb", "redis"],
    { placeHolder: "Select your database" }
  );
  if (!database) {
    return null;
  }

  // 3. Select CI/CD
  const cicd = await vscode.window.showQuickPick(
    ["none", "jenkins", "github-actions"],
    { placeHolder: "Select your CI/CD pipeline" }
  );
  if (!cicd) {
    return null;
  }
  // 4. Select Platform
  const platform = await vscode.window.showQuickPick(
    ["docker-only", "railway", "render", "fly"],
    { placeHolder: "Select deployment target" }
  );
  if (!platform) {
    return null;
  }

  return {
    stack: detected,
    database: database as UserChoices["database"],
    cicd: cicd as UserChoices["cicd"],
    platform: platform as UserChoices["platform"],
  };
}
