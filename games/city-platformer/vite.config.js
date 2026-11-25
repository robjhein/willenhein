import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

// Production base for GitHub Pages: .../willenhein/games/city-platformer/
export default defineConfig(({ command }) => ({
  base:
    command === "build"
      ? (process.env.VITE_BASE_PATH ?? "/willenhein/games/city-platformer/")
      : "/",
  resolve: {
    alias: {
      "@willenhein/lib": path.resolve(root, "../../shared/lib"),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
}));