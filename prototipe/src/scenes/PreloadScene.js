/**
 * FUNGSI  : Load asset + buat animasi Asuka
 * DIPAKAI : BootScene
 * MEMAKAI : assets/heroes/asuka/*
 * STATUS  : aktif
 */
import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    // Progress bar
    const barBg = this.add.rectangle(w / 2, h / 2, 400, 24, 0x222233).setOrigin(0.5);
    const bar = this.add.rectangle(w / 2 - 196, h / 2, 0, 16, 0xff6b9d).setOrigin(0, 0.5);
    const txt = this.add.text(w / 2, h / 2 - 40, 'Loading Asuka...', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.load.on('progress', (v) => {
      bar.width = 392 * v;
    });

    // Load frames
    const anims = {
      idle: 4,
      walk: 10,
      run: 8,
      jump: 8,
      attack: 16,
    };

    for (const [name, count] of Object.entries(anims)) {
      for (let i = 0; i < count; i++) {
        const key = `asuka_${name}_${i}`;
        const path = `assets/heroes/asuka/${name}/f${String(i).padStart(2, '0')}.png`;
        this.load.image(key, path);
      }
    }
  }

  create() {
    // Create animations
    this._makeAnim('asuka_idle', 'idle', 4, 6, -1);
    this._makeAnim('asuka_walk', 'walk', 10, 12, -1);
    this._makeAnim('asuka_run', 'run', 8, 14, -1);
    this._makeAnim('asuka_jump', 'jump', 8, 10, 0);
    this._makeAnim('asuka_attack', 'attack', 16, 18, 0);

    this.scene.start('Arena');
  }

  _makeAnim(key, folder, count, frameRate, repeat) {
    const frames = [];
    for (let i = 0; i < count; i++) {
      frames.push({ key: `asuka_${folder}_${i}` });
    }
    this.anims.create({
      key,
      frames,
      frameRate,
      repeat,
    });
  }
}
