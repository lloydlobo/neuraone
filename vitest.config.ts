/* eslint-disable import/no-default-export */
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "packages/template/*", "tests/*"],
    environment: "happy-dom",
  },
});
