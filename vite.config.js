import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "picmo-facebook-emoji-renderer",
      fileName: (format) => `picmo-facebook-emoji-renderer.${format}.js`,
    },
    minify: true,
    rollupOptions: {
      external: ["picmo"],
    },
  },
});
