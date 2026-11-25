# Conventions for humans and AI helpers

This repo is **Will's game studio** — keep code friendly for a 7-year-old to read with a grown-up.

## Folder layout

```
/
  index.html          # Launcher listing all games (static)
  launcher.css
  games/<name>/       # One folder per game (own package.json + Vite)
  shared/assets/      # Shared sprites, audio, fonts (with CREDITS.md)
  shared/lib/         # Tiny reusable JS modules (@willenhein/lib)
  scripts/            # Build helpers
  docs/               # Docs like this file
```

## Adding a new game

1. Copy `games/city-platformer` as a template (or start fresh).
2. Set `name` in `games/<name>/package.json`.
3. Set Vite `base` to `/willenhein/games/<name>/` in `vite.config.js`.
4. Add the game folder name to `scripts/build-site.mjs` in the `games` array.
5. Add a link in root `index.html`.
6. Run `npm install` from the repo root (workspaces pick up the new package).

## Shared assets rules

- Only **self-made**, **code-drawn**, or **CC0** assets in `shared/assets/`.
- Update `shared/assets/CREDITS.md` when you add files.
- Do not hotlink or load art from the internet at runtime.

## Code style

- **Plain JavaScript** — no TypeScript.
- **Short files**, friendly comments, one idea per file when possible.
- Player sprites / characters live in a **dedicated file** (e.g. `src/player/`) so art can be swapped.
- No analytics, ads, or network calls in games (child-safe).
- Do not put personal info about Will in the repo.

## Shared library

Import from `@willenhein/lib` inside games (Vite alias points at `shared/lib`).

Keep helpers **small**. If a helper grows huge, it probably belongs in one game only.

## Deploy

Push to `main` triggers GitHub Actions → builds `npm run build` → publishes `dist/` to GitHub Pages.

Local dev: from repo root, `npm install` then `npm run dev` (runs the default game dev server).