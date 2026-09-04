import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type RootPackageManifest = {
  engines?: { node?: string };
  scripts?: Record<string, string>;
};

const rootPackageJsonPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../package.json",
);

export function readRootPackageManifest(): RootPackageManifest {
  return JSON.parse(readFileSync(rootPackageJsonPath, "utf8"));
}
