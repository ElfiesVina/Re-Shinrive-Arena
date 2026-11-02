/**
 * FUNGSI  : Keyboard untuk tes di PC (A/D / arrows + Space + J attack)
 * DIPAKAI : ArenaScene
 * MEMAKAI : -
 * STATUS  : aktif
 */
import Phaser from 'phaser';

export class KeyboardDebug {
  constructor(scene) {
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys({
      a: 'A',
      d: 'D',
      w: 'W',
      space: 'SPACE',
      j: 'J',
      k: 'K',
    });
  }

  getState() {
    return {
      left: this.cursors.left.isDown || this.keys.a.isDown,
      right: this.cursors.right.isDown || this.keys.d.isDown,
      up: this.cursors.up.isDown || this.keys.w.isDown,
      space: this.keys.space.isDown,
      attack: Phaser.Input.Keyboard.JustDown(this.keys.j) || Phaser.Input.Keyboard.JustDown(this.keys.k),
    };
  }
}
