import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [".Workflow/**/*.test.ts", ".claude/**/*.test.ts"],
    exclude: ["**/node_modules/**"],
  },
});
