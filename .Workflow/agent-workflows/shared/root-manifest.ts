import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export type RootManifest = {
  engines?: { node?: string };
  scripts?: Record<string, string>;
};

export function readRootManifest(): RootManifest {
  const manifestPath = fileURLToPath(new URL("../../../package.json", import.meta.url));
  return JSON.parse(readFileSync(manifestPath, "utf8")) as RootManifest;
}
