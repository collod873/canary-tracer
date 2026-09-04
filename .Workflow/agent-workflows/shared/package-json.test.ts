import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function readRootPackageJson(): Record<string, unknown> {
  return JSON.parse(readFileSync(path.join(repoRoot, "package.json"), "utf8"));
}

// package.json at the repository root has an engines.node field naming 24.
test("#101: package.json at the repository root has an engines.node field naming 24", () => {
  const pkg = readRootPackageJson();
  const engines = pkg.engines as Record<string, unknown> | undefined;

  expect(engines).toBeDefined();
  expect(typeof engines?.node).toBe("string");
  expect(String(engines?.node)).toMatch(/24/);
});
