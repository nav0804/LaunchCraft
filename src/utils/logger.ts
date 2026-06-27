import * as vscode from "vscode";

export class Logger {
  private static channel: vscode.OutputChannel;

  // Call this once when the extension activates
  static initialize(channelName: string = "LaunchCraft") {
    if (!this.channel) {
      this.channel = vscode.window.createOutputChannel(channelName);
      this.info("Logger initialized.");
    }
  }

  static info(message: string) {
    if (this.channel) {
      const timestamp = new Date().toLocaleTimeString();
      this.channel.appendLine(`[INFO  - ${timestamp}] ${message}`);
    }
  }

  static error(message: string, error?: any) {
    if (this.channel) {
      const timestamp = new Date().toLocaleTimeString();
      const errorDetails = error ? `\nDetails: ${String(error)}` : "";
      this.channel.appendLine(
        `[ERROR - ${timestamp}] ${message}${errorDetails}`
      );
      // Automatically pop open the output panel on errors
      this.channel.show(true);
    }
  }

  // Helper to show the channel to the user
  static show() {
    if (this.channel) {
      this.channel.show(true);
    }
  }
}
