/**
 * FUNGSI  : Konfigurasi Phaser: ukuran desain 1280x720 landscape, Scale.FIT, multitouch
 * DIPAKAI : main.js
 * MEMAKAI : -
 * STATUS  : aktif
 */
export const gameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1280,
  height: 720,
  backgroundColor: '#1a1a2e',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1400 },
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
