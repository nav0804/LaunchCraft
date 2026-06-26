import * as vscode from "vscode";
import { buildDetectorChain } from "./detector/DetectorChain";
import { GeneratorFactory } from "./generators/GeneratorFactory";
import { TemplateRegistry } from "./templates/registry/TemplateRegistry";
import { NodeDockerfileTemplate } from "./templates/node/Dockfile.template";
import { runMenuFlow } from "./menus/MenuFlow";
import { NodeComposeTemplate } from "./templates/node/Docker-compose.template";
import { ReactDockerfileTemplate } from "./templates/node/ReactDockerfile.template";
import { ReactComposeTemplate } from "./templates/node/ReactCompose.template";
import { SpringBootDockerfileTemplate } from "./templates/springboot/SpringBootDockerfile.template";
import { GoDockerfileTemplate } from "./templates/go/GoDockerfile.template";
import { NodeJenkinsTemplate } from "./templates/node/NodeJenkinsfile.template";
import { Logger } from "./utils/logger";

export function activate(context: vscode.ExtensionContext) {
  // 1. Register Templates on startup
  Logger.initialize("LaunchCraft");
  Logger.info("Extension activated and ready.");

  // --- NODE (EXPRESS) ---
  TemplateRegistry.register("dockerfile:node:express", NodeDockerfileTemplate);
  TemplateRegistry.register("compose:node:express", NodeComposeTemplate);
  TemplateRegistry.register("jenkins:node:express", NodeJenkinsTemplate);

  // --- NODE (REACT) ---
  TemplateRegistry.register("dockerfile:node:react", ReactDockerfileTemplate);
  TemplateRegistry.register("compose:node:react", ReactComposeTemplate);
  TemplateRegistry.register("jenkins:node:react", NodeJenkinsTemplate);

  // --- JAVA (SPRING BOOT) ---
  TemplateRegistry.register(
    "dockerfile:java:springboot",
    SpringBootDockerfileTemplate
  );
  // Reusing Node templates as fallbacks just to prevent crashes during testing!
  /**
   * We will have to call the sprinboot template here.
   */
  // TemplateRegistry.register("compose:java:springboot", NodeComposeTemplate);
  // TemplateRegistry.register("jenkins:java:springboot", NodeJenkinsTemplate);

  // --- GO ---
  TemplateRegistry.register("dockerfile:go:none", GoDockerfileTemplate);

  // 2. Register Command
  let disposable = vscode.commands.registerCommand(
    "devlaunch.initialize",
    async () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage(
          "DevLaunch: Please open a project folder first!"
        );
        return;
      }

      const rootUri = workspaceFolders[0].uri;

      // Step 1: Detect
      const detectorChain = buildDetectorChain();
      const detectedProfile = await detectorChain.detect(rootUri);

      if (!detectedProfile || detectedProfile.language === "unknown") {
        vscode.window.showErrorMessage(
          "DevLaunch: Could not detect a supported tech stack."
        );
        return;
      }

      // Step 2: Menus
      const userChoices = await runMenuFlow(detectedProfile);
      if (!userChoices) {
        return; // User cancelled
      }

      // Step 3: Generate & Write
      try {
        const generators = GeneratorFactory.build(userChoices);
        for (const generator of generators) {
          await generator.write(userChoices, rootUri);
        }
        vscode.window.showInformationMessage(
          "🚀 DevLaunch: Dockerfile generated! (Note: Please verify the Java/Node versions in the generated files match your project)"
        );
      } catch (error: any) {
        vscode.window.showErrorMessage(`DevLaunch Error: ${error.message}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
