/**
 * FUNGSI  : Kamera mengikuti hero dengan peredaman tidak bergantung FPS + batas arena
 * DIPAKAI : ArenaScene
 * MEMAKAI : config/constants.json
 * STATUS  : aktif
 *
 * Kenapa bukan startFollow bawaan Phaser:
 * - deadzone + lerp bawaan membuat hero "bergetar" saat berhenti/jalan di tepi deadzone,
 * - kamera dihitung tiap frame render tetapi posisi hero tiap langkah fisika.
 * Di sini kamera dihitung SESUDAH fisika disinkronkan (POST_UPDATE), dengan redaman
 * eksponensial yang sama di 60/90/120 Hz (tanpa pembulatan, supaya hero dan latar bergerak halus).
 */
import Phaser from 'phaser';
import constants from '../config/constants.json';

const SMOOTH = 9; // makin besar = makin lengket

export class CameraController {
  constructor(scene, target) {
    this.scene = scene;
    this.target = target;
    this.cam = scene.cameras.main;
    this.cam.setBounds(0, 0, constants.arena.width, constants.arena.height);
    this.cam.setScroll(this._desired(), 0);

    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this._post, this);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this._post, this);
    });
  }

  _desired() {
    const max = constants.arena.width - this.cam.width;
    return Phaser.Math.Clamp(this.target.x - this.cam.width / 2, 0, max);
  }

  _post(time, delta) {
    const dt = Math.min(delta, 50) / 1000;
    const k = 1 - Math.exp(-SMOOTH * dt);
    const want = this._desired();
    let x = this.cam.scrollX + (want - this.cam.scrollX) * k;
    if (Math.abs(want - x) < 0.25) x = want;
    this.cam.setScroll(x, 0);
  }

  update() {
    // dihitung di POST_UPDATE
  }
}
