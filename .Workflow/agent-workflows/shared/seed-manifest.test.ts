import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

type SeedManifest = {
  engines?: { node?: string };
  scripts?: Record<string, string>;
};

function seedManifestPath(): string {
  let dir = dirname(fileURLToPath(import.meta.url));
  for (;;) {
    const candidate = join(dir, "package.json");
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) throw new Error("no package.json found above the test");
    dir = parent;
  }
}

function readSeedManifestSource(): string {
  return readFileSync(seedManifestPath(), "utf8");
}

function readSeedManifest(): SeedManifest {
  return JSON.parse(readSeedManifestSource()) as SeedManifest;
}

// - [ ] `package.json` declares `engines.node` as the exact string "24" - check: `jq -e '.engines.node == "24"' package.json`
test('#107: package.json declares engines.node as the exact string "24"', () => {
  expect(readSeedManifest().engines?.node).toBe("24");
});

// - [ ] `package.json` stays valid JSON with its existing `scripts` block intact - check: `jq -e '.scripts.test == "node --test"' package.json`
test("#107: package.json stays valid JSON with its existing scripts block intact", () => {
  const source = readSeedManifestSource();
  expect(() => JSON.parse(source)).not.toThrow();

  const manifest = JSON.parse(source) as SeedManifest;
  expect(manifest.engines?.node).toBe("24");
  expect(manifest.scripts?.test).toBe("node --test");
  expect(manifest.scripts?.typecheck).toBe("true");
  expect(manifest.scripts?.lint).toBe("true");
});
