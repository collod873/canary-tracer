import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type RootPackage = {
  name?: string;
  engines?: { node?: string };
  [key: string]: unknown;
};

export function readRootPackage(): RootPackage {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
  return JSON.parse(readFileSync(path.join(repoRoot, "package.json"), "utf8")) as RootPackage;
}
