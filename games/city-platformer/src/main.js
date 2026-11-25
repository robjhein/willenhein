/**
 * City Platformer — entry point. Boots Phaser and loads our scenes.
 */
import Phaser from "phaser";
import { TitleScene } from "./scenes/TitleScene.js";
import { GameScene } from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 450,
  backgroundColor: "#87ceeb",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 900 },
      debug: false,
    },
  },
  scene: [TitleScene, GameScene],
};

new Phaser.Game(config);