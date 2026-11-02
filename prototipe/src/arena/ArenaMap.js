/**
 * FUNGSI  : Background + ground visual (placeholder, ganti dengan desain sendiri nanti)
 * DIPAKAI : ArenaScene
 * MEMAKAI : config/constants.json
 * STATUS  : aktif (placeholder visual)
 */
import constants from '../config/constants.json';

export class ArenaMap {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    const w = constants.arena.width;
    const h = constants.arena.height;
    const groundY = constants.arena.groundY;

    // Sky gradient (far)
    const sky = this.scene.add.graphics();
    sky.fillGradientStyle(0x1a1a3e, 0x1a1a3e, 0x2d1b4e, 0x2d1b4e, 1);
    sky.fillRect(0, 0, w, h);
    sky.setScrollFactor(0.1);
    sky.setDepth(-20);

    // Mid layer - soft hills / clouds feel
    const mid = this.scene.add.graphics();
    mid.fillStyle(0x3a2a5e, 0.4);
    for (let i = 0; i < 12; i++) {
      const x = i * 450 + 100;
      mid.fillEllipse(x, groundY - 180, 380, 120);
    }
    mid.setScrollFactor(0.35);
    mid.setDepth(-10);

    // Ground visual
    const ground = this.scene.add.graphics();
    ground.fillStyle(0x2a1f3d, 1);
    ground.fillRect(0, groundY, w, h - groundY + 50);

    // Ground top line (pinkish accent)
    ground.lineStyle(4, 0xff6b9d, 0.6);
    ground.lineBetween(0, groundY, w, groundY);

    // Subtle pattern on ground
    ground.fillStyle(0x3a2a55, 0.5);
    for (let x = 0; x < w; x += 80) {
      ground.fillRect(x, groundY + 10, 40, 8);
    }
    ground.setDepth(-5);

    // Soft vignette / ambient particles feel
    const particles = this.scene.add.graphics();
    particles.fillStyle(0xff6b9d, 0.08);
    for (let i = 0; i < 40; i++) {
      const px = Math.random() * w;
      const py = 80 + Math.random() * (groundY - 120);
      particles.fillCircle(px, py, 2 + Math.random() * 3);
    }
    particles.setScrollFactor(0.5);
    particles.setDepth(-8);
  }
}
