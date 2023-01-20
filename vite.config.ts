import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => ({
  plugins: [tsconfigPaths()],
  server: {
    port: 3005,
  },
  build: {
    sourcemap: true,
    manifest: true,
    emptyOutDir: true,
  },
}));
