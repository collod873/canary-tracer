import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const manifestPath = fileURLToPath(new URL("../../../package.json", import.meta.url));

type Manifest = {
  name?: string;
  private?: boolean;
  description?: string;
  engines?: { node?: string };
  scripts?: Record<string, string>;
};

function readManifest(): Manifest {
  return JSON.parse(readFileSync(manifestPath, "utf8")) as Manifest;
}

// package.json declares engines.node as exactly "24.x" - check: `jq -e '.engines.node == "24.x"' package.json`
test.fails('#50: package.json declares engines.node as exactly "24.x"', () => {
  expect(readManifest().engines?.node).toBe("24.x");
});

// package.json remains valid JSON with no other fields changed - check: `jq -e '.name == "canary-tracer" and .scripts.test == "node --test"' package.json`
test.fails("#50: package.json remains valid JSON with no other fields changed", () => {
  const manifest = readManifest();

  expect(manifest.name).toBe("canary-tracer");
  expect(manifest.private).toBe(true);
  expect(manifest.description).toBe(
    "The smallest honest target: three contract slots and one test, so the machine has something to check that is provably not itself.",
  );
  expect(manifest.scripts).toEqual({
    typecheck: "true",
    lint: "true",
    test: "node --test",
  });
  expect(Object.keys(manifest).sort()).toEqual([
    "description",
    "engines",
    "name",
    "private",
    "scripts",
  ]);
  expect(manifest.engines).toEqual({ node: "24.x" });
});
