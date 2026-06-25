import { BaseDetector } from "./base/BaseDetector";
import { NodeDetector } from "./NodeDetector";

export function buildDetectorChain(): BaseDetector {
  const nodeDetector = new NodeDetector();

  return nodeDetector;
}
