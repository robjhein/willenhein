import Phaser from "phaser";
import { createKeyboardAndTouchControls } from "@willenhein/lib/controls";
import { createBlockyPlayer, updateBlockyPlayer } from "../player/BlockyPlayer.js";
import {
  createSkyline,
  createPlatforms,
  createGoal,
  getLevelWidth,
} from "../level/cityLevel.js";

/**
 * TODO (future): collectible power-ups that change look AND ability:
 * - gravity coil — jump higher
 * - speed coil — run faster
 * - jetpack — hover / fly briefly
 * - helmet — one extra hit
 * - magnet gloves — pull nearby coins
 * (Not implemented yet — stubs for Will & Rob to build later.)
 */

export class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    const levelW = getLevelWidth();

    // One white pixel texture for invisible physics tiles.
    if (!this.textures.exists("pixel")) {
      const g = this.make.graphics({ add: false });
      g.fillStyle(0xffffff);
      g.fillRect(0, 0, 1, 1);
      g.generateTexture("pixel", 1, 1);
    }

    this.physics.world.setBounds(0, 0, levelW, 450);

    // Ground stripe (visual).
    this.add.rectangle(levelW / 2, 448, levelW, 24, 0x55efc4);

    createSkyline(this);
    this.platforms = createPlatforms(this);

    this.player = createBlockyPlayer(this, 80, 408);
    this.controls = createKeyboardAndTouchControls(this);

    this.physics.add.collider(this.player, this.platforms);

    this.cameras.main.setBounds(0, 0, levelW, 450);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    const goal = createGoal(this);
    this.physics.add.overlap(this.player, goal.zone, () => this.winLevel());

    this.add
      .text(16, 12, "← → move   SPACE jump", {
        fontSize: "14px",
        color: "#2d3436",
        backgroundColor: "#ffffffaa",
        padding: { x: 6, y: 4 },
      })
      .setScrollFactor(0)
      .setDepth(999);
  }

  winLevel() {
    if (this.won) return;
    this.won = true;
    this.physics.pause();
    this.player.body.setVelocity(0, 0);

    const { width, height } = this.scale;
    this.add
      .rectangle(width / 2, height / 2, width, height, 0x000000, 0.5)
      .setScrollFactor(0)
      .setDepth(2000);
    this.add
      .text(width / 2, height / 2, "You made it!\nSPACE to play again", {
        fontSize: "28px",
        color: "#ffeaa7",
        align: "center",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(2001);

    this.input.keyboard.once("keydown-SPACE", () => this.scene.restart());
    this.input.once("pointerdown", () => this.scene.restart());
  }

  update() {
    if (this.won) return;
    const input = this.controls.read();
    updateBlockyPlayer(this.player, input);
  }
}