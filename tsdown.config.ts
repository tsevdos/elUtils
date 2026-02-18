import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/**/*.ts", "!./src/**/*.test.ts"],
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  target: false,
});
