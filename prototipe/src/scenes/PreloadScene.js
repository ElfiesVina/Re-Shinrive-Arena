/**
 * FUNGSI  : Load asset + buat animasi Asuka
 * DIPAKAI : BootScene
 * MEMAKAI : assets/heroes/asuka/*, assets/backgrounds/arena_*.webp
 * STATUS  : aktif
 */
import Phaser from 'phaser';
import constants from '../config/constants.json';
import { makeShadowTexture, makeSlashTexture } from '../utils/placeholder.js';

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
      idle: 8,
      walk: 10,
      run: 8,
      jump: 8,
    };

    // Latar arena (panorama menyambung)
    for (let i = 0; i < constants.arena.tileCount; i++) {
      this.load.image(`arena_${i}`, `assets/backgrounds/arena_${i}.webp`);
    }

    for (const [name, count] of Object.entries(anims)) {
      for (let i = 0; i < count; i++) {
        const key = `asuka_${name}_${i}`;
        const path = `assets/heroes/asuka/${name}/f${String(i).padStart(2, '0')}.webp`;
        this.load.image(key, path);
      }
    }
  }

  create() {
    // Create animations
    const a = constants.hero.anim;
    this._makeAnim('asuka_idle', 'idle', 8, a.idleFps, -1);
    this._makeAnim('asuka_walk', 'walk', 10, a.walkFps, -1);
    this._makeAnim('asuka_run', 'run', 8, a.runFps, -1);

    // Tekstur kecil buatan kode
    makeShadowTexture(this);
    makeSlashTexture(this);

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
