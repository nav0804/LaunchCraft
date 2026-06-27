import * as vscode from "vscode";
import { Logger } from "./utils/logger";
import { TemplateRegistry } from "./templates/registry/TemplateRegistry";
import { NodeDockerfileTemplate } from "./templates/javascript/express/ExpressDockerfile.template";
import { NodeJenkinsTemplate } from "./templates/javascript/express/ExpressJenkins.template";
import { TsDockerfileTemplate } from "./templates/typescript/express/TsExpressDockerfile.template";
import { ReactDockerfileTemplate } from "./templates/javascript/react/ReactDockerfile.template";
import { ReactComposeTemplate } from "./templates/javascript/react/ReactCompose.template";
import { SpringBootDockerfileTemplate } from "./templates/java/springboot/SpringBootDockerfile.template";
import { buildDetectorChain } from "./detector/DetectorChain";
import { runMenuFlow } from "./menus/MenuFlow";
import { GeneratorFactory } from "./generators/GeneratorFactory";
import { UserChoices } from "./types";
import { ExpressComposeTemplate } from "./templates/javascript/express/ExpressCompose.template";
import { SpringBootComposeTemplate } from "./templates/java/springboot/SpringBootComposefile.template";

export function activate(context: vscode.ExtensionContext) {
  Logger.initialize("LaunchCraft");
  Logger.info("Extension activated and ready.");

  TemplateRegistry.register(
    "dockerfile:javascript:express",
    NodeDockerfileTemplate
  );
  TemplateRegistry.register(
    "compose:javascript:express",
    ExpressComposeTemplate
  );
  TemplateRegistry.register("jenkins:javascript:express", NodeJenkinsTemplate);

  TemplateRegistry.register(
    "dockerfile:typescript:express",
    TsDockerfileTemplate
  );
  TemplateRegistry.register(
    "compose:typescript:express",
    ExpressComposeTemplate
  );
  TemplateRegistry.register("jenkins:typescript:express", NodeJenkinsTemplate);

  TemplateRegistry.register(
    "dockerfile:javascript:react",
    ReactDockerfileTemplate
  );
  TemplateRegistry.register("compose:javascript:react", ReactComposeTemplate);
  TemplateRegistry.register("jenkins:javascript:react", NodeJenkinsTemplate);

  TemplateRegistry.register(
    "dockerfile:java:springboot",
    SpringBootDockerfileTemplate
  );
  TemplateRegistry.register(
    "compose:java:springboot",
    SpringBootComposeTemplate
  );

  // --- GO ---
  // TemplateRegistry.register("dockerfile:go:none", GoDockerfileTemplate);

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

      const detectorChain = buildDetectorChain();
      const detectedProfile = await detectorChain.detect(rootUri);

      if (!detectedProfile || detectedProfile.language === "unknown") {
        vscode.window.showErrorMessage(
          "DevLaunch: Could not detect a supported tech stack."
        );
        return;
      }

      const userChoices = await runMenuFlow(detectedProfile);
      if (!userChoices) {
        return;
      }

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
