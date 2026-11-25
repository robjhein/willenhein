/**
 * Builds the launcher page and every game into dist/ for GitHub Pages.
 */
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, "dist");

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// Launcher (static HTML at repo root).
cpSync(path.join(root, "index.html"), path.join(dist, "index.html"));
cpSync(path.join(root, "launcher.css"), path.join(dist, "launcher.css"));

// Build each game with Vite.
const games = ["city-platformer"];
for (const name of games) {
  execSync("npm run build", {
    cwd: path.join(root, "games", name),
    stdio: "inherit",
  });
  cpSync(path.join(root, "games", name, "dist"), path.join(dist, "games", name), {
    recursive: true,
  });
}

writeFileSync(
  path.join(dist, ".nojekyll"),
  "",
  "utf8"
);

console.log("Site ready in dist/");