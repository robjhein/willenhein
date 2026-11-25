/**
 * Placeholder blocky character — swap this file later for custom art.
 * Returns a Phaser Container with a physics body (use as one unit).
 */
export function createBlockyPlayer(scene, x, y) {
  const container = scene.add.container(x, y);

  // Simple "Roblox-ish" colors drawn with rectangles.
  const legL = scene.add.rectangle(-6, 18, 10, 14, 0x2d3436);
  const legR = scene.add.rectangle(6, 18, 10, 14, 0x2d3436);
  const torso = scene.add.rectangle(0, 2, 22, 20, 0x0984e3);
  const armL = scene.add.rectangle(-14, 4, 8, 16, 0xfdcb6e);
  const armR = scene.add.rectangle(14, 4, 8, 16, 0xfdcb6e);
  const head = scene.add.rectangle(0, -16, 20, 18, 0xfdcb6e);
  const hair = scene.add.rectangle(0, -24, 22, 8, 0x6c5ce7);

  container.add([legL, legR, torso, armL, armR, head, hair]);

  scene.physics.add.existing(container);
  container.body.setSize(24, 40);
  container.body.setOffset(-12, -24);
  container.body.setCollideWorldBounds(true);
  container.body.setMaxVelocity(280, 520);

  container.facing = 1;
  container.onGround = false;

  return container;
}

/** Move the blocky player using arcade physics. */
export function updateBlockyPlayer(player, controls, jumpSpeed = -380) {
  const body = player.body;
  const speed = 200;

  if (controls.left) {
    body.setVelocityX(-speed);
    player.facing = -1;
    player.setScale(-1, 1);
  } else if (controls.right) {
    body.setVelocityX(speed);
    player.facing = 1;
    player.setScale(1, 1);
  } else {
    body.setVelocityX(0);
  }

  player.onGround = body.blocked.down || body.touching.down;

  if (controls.jumpJustPressed && player.onGround) {
    body.setVelocityY(jumpSpeed);
  }
}