import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "import.meta.vitest": "undefined"
  },
  build: {
    emptyOutDir: false,
    outDir: "dist",
    sourcemap: true,
    lib: {
      entry: {
        kmahj: "./lib/index.ts",
        parser: "./lib/parser/index.ts",
        core: "./lib/core/index.ts",
        resolver: "./lib/resolver/index.ts"
      } ,
      formats: ["es"],
    },
  },
  test: {
    includeSource: ["lib/**/*.ts"]
  }
});
