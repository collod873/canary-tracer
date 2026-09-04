import { expect, test } from "vitest";
import { readRootPackage } from "./root-package";

// package.json, rooted at the repository root, declares an engines.node field naming Node 24 - check: `jq -e '.engines.node | test("24")' package.json`
test("#90: package.json at the repository root declares an engines.node field naming Node 24", () => {
  const pkg = readRootPackage();
  expect(pkg.engines).toBeDefined();
  expect(pkg.engines?.node).toMatch(/24/);
});

// package.json remains valid JSON with its existing name field preserved after the edit - check: `jq -e '.name == "canary-tracer"' package.json`
test("#90: package.json remains valid JSON with its existing name field preserved", () => {
  const pkg = readRootPackage();
  expect(pkg).toBeTypeOf("object");
  expect(pkg.name).toBe("canary-tracer");
});
