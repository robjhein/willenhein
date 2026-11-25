# Willenhein — Will's browser games

Hi! This is a home for **small browser games** made by **Will** with **Rob** and sometimes an AI assistant.

Right now there is one game: **City Platformer** — run and jump across a made-up city to reach the flag.

No ads, no tracking, no internet needed while you play.

## Run locally

You need **Node.js 18+** ([download](https://nodejs.org/)).

### On an Intel Mac

1. Open **Terminal**.
2. `cd` into this project folder.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the URL Vite prints (usually `http://localhost:5173`).

### On Windows

1. Open **Command Prompt** or **PowerShell**.
2. `cd` into this project folder.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the URL Vite prints in your browser.

### Play from the game launcher

To see the **launcher page** that lists all games, build and preview the whole site:

```bash
npm install
npm run build
npx serve dist
```

Then open the URL shown and click **City Platformer**.

## Controls (City Platformer)

- **Arrow keys** or **WASD** to move
- **Space** to jump
- On phones/tablets: on-screen **◀ ▶ ⭡** buttons

## Add a new game

1. Create a folder `games/your-game-name/`.
2. Give it a `package.json`, `index.html`, Vite config, and Phaser (copy `city-platformer` as a starting point).
3. Add your game name to the list in `scripts/build-site.mjs`.
4. Add a link on `index.html`.
5. Run `npm install` at the repo root.

More detail for helpers (including AI): see [docs/CONVENTIONS.md](docs/CONVENTIONS.md).

## Deployed site

When changes land on `main`, GitHub Actions publishes to:

**https://robjhein.github.io/willenhein/**

## License

Family project — play and learn freely. Asset credits live in `shared/assets/CREDITS.md`.