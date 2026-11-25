/**
 * Simple full-screen title with a "tap to start" prompt.
 * Calls onStart() when the player presses space / clicks / taps.
 */
export function showTitleScreen(scene, { title, subtitle, onStart }) {
  const w = scene.scale.width;
  const h = scene.scale.height;

  const bg = scene.add.rectangle(w / 2, h / 2, w, h, 0x0f3460);

  scene.add
    .text(w / 2, h * 0.35, title, {
      fontSize: "36px",
      color: "#e94560",
      fontStyle: "bold",
    })
    .setOrigin(0.5);

  if (subtitle) {
    scene.add
      .text(w / 2, h * 0.45, subtitle, {
        fontSize: "18px",
        color: "#eaeaea",
        align: "center",
        wordWrap: { width: w - 40 },
      })
      .setOrigin(0.5);
  }

  const prompt = scene.add
    .text(w / 2, h * 0.72, "Press SPACE or tap to play", {
      fontSize: "20px",
      color: "#7fdbff",
    })
    .setOrigin(0.5);

  scene.tweens.add({
    targets: prompt,
    alpha: 0.3,
    duration: 700,
    yoyo: true,
    repeat: -1,
  });

  const go = () => {
    scene.input.off("pointerdown", go);
    scene.input.keyboard.off("keydown-SPACE", go);
    onStart();
  };

  scene.input.once("pointerdown", go);
  scene.input.keyboard.once("keydown-SPACE", go);

  return { bg, prompt };
}