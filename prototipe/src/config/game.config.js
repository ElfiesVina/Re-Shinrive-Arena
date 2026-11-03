/**
 * FUNGSI  : Konfigurasi Phaser: ukuran desain 1280x720 landscape, Scale.FIT, multitouch
 * DIPAKAI : main.js
 * MEMAKAI : -
 * STATUS  : aktif
 */
import Phaser from 'phaser';

export const gameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1280,
  height: 720,
  backgroundColor: '#6fa8f0',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1400 },
      fps: 60,
      fixedStep: false, // langkah fisika mengikuti tiap frame render -> tidak bergetar di layar 90/120Hz
      debug: false,
    },
  },
  input: {
    activePointers: 3,
  },
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false,
  },
};
