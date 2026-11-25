/**
 * Builds one side-scrolling city level: ground, rooftops, backgrounds, goal flag.
 */

const LEVEL_WIDTH = 3200;

export function getLevelWidth() {
  return LEVEL_WIDTH;
}

/** Draw far-away building silhouettes (parallax layer). */
export function createSkyline(scene) {
  const group = scene.add.group();
  const colors = [0x636e72, 0x4b6584, 0x778ca3];

  for (let x = 0; x < LEVEL_WIDTH + 200; x += 90) {
    const h = Phaser.Math.Between(80, 160);
    const w = Phaser.Math.Between(50, 85);
    const building = scene.add
      .rectangle(x, 450 - h / 2 - 40, w, h, Phaser.Utils.Array.GetRandom(colors))
      .setOrigin(0, 0.5);
    building.setScrollFactor(0.25);
    group.add(building);

    // Little window dots.
    for (let wy = 0; wy < h - 20; wy += 18) {
      for (let wx = 8; wx < w - 8; wx += 14) {
        if (Math.random() > 0.4) {
          const win = scene.add
            .rectangle(x + wx, 450 - h + wy + 30, 4, 6, 0xffeaa7, 0.6)
            .setOrigin(0, 0.5);
          win.setScrollFactor(0.25);
          group.add(win);
        }
      }
    }
  }
  return group;
}

/** Solid platforms the player can stand on. */
export function createPlatforms(scene) {
  const statics = scene.physics.add.staticGroup();

  // Long sidewalk / ground.
  statics
    .create(LEVEL_WIDTH / 2, 438, "pixel")
    .setSize(LEVEL_WIDTH, 32)
    .setVisible(false)
    .refreshBody();

  // Brown rooftop ledges (visible).
  const ledges = [
    { x: 420, y: 360, w: 140 },
    { x: 780, y: 320, w: 120 },
    { x: 1150, y: 280, w: 100 },
    { x: 1500, y: 340, w: 160 },
    { x: 1950, y: 300, w: 130 },
    { x: 2400, y: 350, w: 140 },
    { x: 2750, y: 310, w: 110 },
  ];

  for (const { x, y, w } of ledges) {
    scene.add.rectangle(x, y, w, 12, 0x636e72);
    scene.add.rectangle(x, y - 8, w, 40, 0xb2bec3).setOrigin(0.5, 1);
    statics
      .create(x, y, "pixel")
      .setSize(w, 16)
      .setVisible(false)
      .refreshBody();
  }

  return statics;
}

/** Goal flag at the end of the level. */
export function createGoal(scene) {
  const x = LEVEL_WIDTH - 120;
  const pole = scene.add.rectangle(x, 360, 6, 90, 0xdfe6e9);
  const flag = scene.add.triangle(x + 28, 320, 0, 0, 0, 28, 36, 14, 0xe17055);

  const zone = scene.add.zone(x + 20, 380, 60, 100);
  scene.physics.add.existing(zone, true);
  zone.body.setSize(60, 100);

  return { zone, pole, flag, x };
}