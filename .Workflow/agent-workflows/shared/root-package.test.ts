import { expect, test } from "vitest";
import { readRootPackageManifest } from "./root-package";

// package.json at the repository root has an engines.node field naming 24.
test("#78: package.json at the repository root has an engines.node field naming 24", () => {
  const manifest = readRootPackageManifest();
  expect(manifest.engines).toBeDefined();
  expect(typeof manifest.engines?.node).toBe("string");
  expect(manifest.engines?.node).toMatch(/24/);
});

// npm test still passes.
test("#78: npm test still passes", () => {
  const manifest = readRootPackageManifest();
  expect(typeof manifest.scripts?.test).toBe("string");
  expect((manifest.scripts?.test ?? "").length).toBeGreaterThan(0);
});
