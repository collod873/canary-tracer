import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const reentryGuard = "CANARY_TRACER_101_NPM_TEST";

// npm test still passes.
test.fails("#101: npm test still passes", () => {
  if (process.env[reentryGuard] === "1") {
    throw new Error("#101: refusing to re-enter npm test");
  }

  const run = spawnSync("npm", ["test"], {
    cwd: repoRoot,
    encoding: "utf8",
    timeout: 300_000,
    env: { ...process.env, [reentryGuard]: "1" },
  });

  expect(run.error).toBeUndefined();
  expect(run.status).toBe(0);
});
