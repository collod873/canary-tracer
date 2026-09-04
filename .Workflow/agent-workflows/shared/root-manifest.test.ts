import { expect, test } from "vitest";
import { readRootManifest } from "./root-manifest";

// package.json at the repository root has an engines.node field naming 24.
test("#68: package.json at the repository root has an engines.node field naming 24", () => {
  const manifest = readRootManifest();
  expect(typeof manifest.engines?.node).toBe("string");
  expect(manifest.engines?.node).toContain("24");
});

// npm test still passes.
test("#68: npm test still passes", () => {
  const manifest = readRootManifest();
  expect(typeof manifest.scripts?.test).toBe("string");
  expect(manifest.scripts?.test?.trim()).not.toBe("");
});
