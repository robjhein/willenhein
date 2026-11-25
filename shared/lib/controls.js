/**
 * Keyboard (arrows / WASD + space) and simple on-screen touch buttons.
 * Returns an object you read each frame: { left, right, jump, jumpJustPressed }.
 */
export function createKeyboardAndTouchControls(scene, options = {}) {
  const { jumpKey = scene.input.keyboard.addKey("SPACE") } = options;

  const cursors = scene.input.keyboard.createCursorKeys();
  const keys = scene.input.keyboard.addKeys({
    W: "W",
    A: "A",
    S: "S",
    D: "D",
  });

  let jumpWasDown = false;

  // Touch overlay (only when pointer is coarse / touch device).
  const pad = scene.add.container(0, 0).setScrollFactor(0).setDepth(1000);

  const makeBtn = (x, y, label, w = 56, h = 56) => {
    const g = scene.add
      .rectangle(x, y, w, h, 0x000000, 0.35)
      .setStrokeStyle(2, 0xffffff, 0.5);
    const t = scene.add
      .text(x, y, label, { fontSize: "22px", color: "#fff" })
      .setOrigin(0.5);
    const zone = scene.add.zone(x, y, w, h).setInteractive();
    return { g, t, zone, down: false };
  };

  const leftBtn = makeBtn(70, scene.scale.height - 70, "◀", 64, 64);
  const rightBtn = makeBtn(150, scene.scale.height - 70, "▶", 64, 64);
  const jumpBtn = makeBtn(scene.scale.width - 80, scene.scale.height - 80, "⭡", 72, 72);

  for (const btn of [leftBtn, rightBtn, jumpBtn]) {
    pad.add([btn.g, btn.t, btn.zone]);
    btn.zone.on("pointerdown", () => {
      btn.down = true;
    });
    btn.zone.on("pointerup", () => {
      btn.down = false;
    });
    btn.zone.on("pointerout", () => {
      btn.down = false;
    });
  }

  const layoutTouch = () => {
    jumpBtn.g.setPosition(scene.scale.width - 80, scene.scale.height - 80);
    jumpBtn.t.setPosition(scene.scale.width - 80, scene.scale.height - 80);
    jumpBtn.zone.setPosition(scene.scale.width - 80, scene.scale.height - 80);
    leftBtn.g.setPosition(70, scene.scale.height - 70);
    leftBtn.t.setPosition(70, scene.scale.height - 70);
    leftBtn.zone.setPosition(70, scene.scale.height - 70);
    rightBtn.g.setPosition(150, scene.scale.height - 70);
    rightBtn.t.setPosition(150, scene.scale.height - 70);
    rightBtn.zone.setPosition(150, scene.scale.height - 70);
  };
  scene.scale.on("resize", layoutTouch);

  const read = () => {
    const left =
      cursors.left.isDown || keys.A.isDown || leftBtn.down;
    const right =
      cursors.right.isDown || keys.D.isDown || rightBtn.down;
    const jumpKeyDown =
      cursors.up.isDown ||
      keys.W.isDown ||
      jumpKey.isDown ||
      jumpBtn.down;
    const jumpJustPressed = jumpKeyDown && !jumpWasDown;
    jumpWasDown = jumpKeyDown;

    return { left, right, jump: jumpKeyDown, jumpJustPressed };
  };

  return { read, pad };
}