/**
 * FUNGSI  : Scene awal, langsung ke Preload
 * DIPAKAI : main.js
 * MEMAKAI : -
 * STATUS  : aktif
 */
import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    this.scene.start('Preload');
  }
}
