import { BaseDetector } from "./base/BaseDetector";
import { NodeDetector } from "./NodeDetector";
import { SpringBootDetector } from "./SpringbootDetector";

export function buildDetectorChain(): BaseDetector {
  const nodeDetector = new NodeDetector();
  const springBootDetector = new SpringBootDetector();

  nodeDetector.setNext(springBootDetector);
  return nodeDetector;
}
