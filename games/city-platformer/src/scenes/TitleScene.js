import Phaser from "phaser";
import { showTitleScreen } from "@willenhein/lib/titleScreen";

export class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  create() {
    showTitleScreen(this, {
      title: "City Platformer",
      subtitle: "Reach the flag at the end of the block!",
      onStart: () => this.scene.start("Game"),
    });
  }
}