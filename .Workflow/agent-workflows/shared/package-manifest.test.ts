import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

function manifestPath(): string {
  let dir = dirname(fileURLToPath(import.meta.url));
  while (!existsSync(join(dir, "package.json"))) {
    const parent = dirname(dir);
    if (parent === dir) throw new Error("no package.json found above the test file");
    dir = parent;
  }
  return join(dir, "package.json");
}

type Manifest = {
  engines?: { node?: unknown };
  scripts?: Record<string, unknown>;
};

function readManifest(): Manifest {
  return JSON.parse(readFileSync(manifestPath(), "utf8")) as Manifest;
}

// - [ ] `package.json` declares `engines.node` as the exact string "24" - check: `jq -e '.engines.node == "24"' package.json`
test.fails("#107: package.json declares engines.node as the exact string \"24\"", () => {
  const manifest = readManifest();

  expect(manifest.engines?.node).toBe("24");
});

// - [ ] `package.json` stays valid JSON with its existing `scripts` block intact - check: `jq -e '.scripts.test == "node --test"' package.json`
test.fails("#107: package.json stays valid JSON with its existing scripts block intact", () => {
  const manifest = readManifest();

  expect(manifest.scripts).toEqual({
    typecheck: "true",
    lint: "true",
    test: "node --test",
  });
  expect(manifest.engines?.node).toBe("24");
});
