import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/**/*.ts", "!./src/**/*.test.ts", "!./src/helpers/**"],
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  target: false,
});
