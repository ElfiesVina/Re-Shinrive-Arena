/**
 * FUNGSI  : Kamera follow hero dengan smoothing + batas arena
 * DIPAKAI : ArenaScene
 * MEMAKAI : config/constants.json
 * STATUS  : aktif
 */
import constants from '../config/constants.json';

export class CameraController {
  constructor(scene, target) {
    this.scene = scene;
    this.target = target;
    const cam = scene.cameras.main;
    cam.setBounds(0, 0, constants.arena.width, constants.arena.height);
    cam.startFollow(target, true, 0.12, 0.12);
    cam.setDeadzone(180, 100);
  }

  update() {
    // follow sudah di-handle Phaser
  }
}
