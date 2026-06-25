import { UserChoices } from "../../types";

type TemplateLoader = (choices: UserChoices) => string;

export class TemplateRegistry {
  private static registry = new Map<string, TemplateLoader>();

  static register(key: string, loader: TemplateLoader): void {
    this.registry.set(key, loader);
  }

  static get(key: string, choices: UserChoices): string {
    const loader = this.registry.get(key);
    if (!loader) {
      throw new Error(`No template found for: ${key}`);
    }
    return loader(choices);
  }
}
