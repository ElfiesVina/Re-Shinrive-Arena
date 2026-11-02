/**
 * FUNGSI  : Tombol Attack + Skill 1-4 (kanan bawah)
 * DIPAKAI : ArenaScene
 * MEMAKAI : config/layout.json, config/constants.json
 * STATUS  : aktif
 */
import Phaser from 'phaser';
import layout from '../config/layout.json';
import constants from '../config/constants.json';

export class ActionButtons {
  constructor(scene) {
    this.scene = scene;
    this.btns = {};
    this.cooldowns = {};
    this.pressed = {};
    this.attackJustPressed = false;

    const btnCfg = layout.buttons;
    const skills = constants.skills;

    // Attack (besar)
    this._makeButton('attack', btnCfg.attack, 0xff4d6d, 'ATK', skills.attack.cooldownMs);

    // Skills
    const colors = [0x7b5cff, 0x00c2ff, 0xffb800, 0xff3d71];
    const labels = ['S1', 'S2', 'S3', 'S4'];
    for (let i = 1; i <= 4; i++) {
      this._makeButton(
        `skill${i}`,
        btnCfg[`skill${i}`],
        colors[i - 1],
        labels[i - 1],
        skills[`skill${i}`].cooldownMs
      );
    }
  }

  _makeButton(key, cfg, color, label, cdMs) {
    const scene = this.scene;
    const circle = scene.add.circle(cfg.x, cfg.y, cfg.radius, color, 0.55)
      .setScrollFactor(0)
      .setDepth(100)
      .setStrokeStyle(3, 0xffffff, 0.45)
      .setInteractive({ useHandCursor: true });

    const txt = scene.add.text(cfg.x, cfg.y, label, {
      fontFamily: 'Arial',
      fontSize: key === 'attack' ? '22px' : '16px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(102);

    // Cooldown overlay
    const overlay = scene.add.circle(cfg.x, cfg.y, cfg.radius, 0x000000, 0.55)
      .setScrollFactor(0)
      .setDepth(101)
      .setVisible(false);

    const cdText = scene.add.text(cfg.x, cfg.y, '', {
      fontFamily: 'Arial',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(103).setVisible(false);

    this.btns[key] = { circle, txt, overlay, cdText, radius: cfg.radius };
    this.cooldowns[key] = { remaining: 0, total: cdMs };
    this.pressed[key] = false;

    circle.on('pointerdown', () => {
      if (this.cooldowns[key].remaining > 0) return;
      this.pressed[key] = true;
      if (key === 'attack') this.attackJustPressed = true;
      circle.setFillStyle(color, 0.9);
      // Start cooldown
      this.cooldowns[key].remaining = this.cooldowns[key].total;
    });

    circle.on('pointerup', () => {
      this.pressed[key] = false;
      circle.setFillStyle(color, 0.55);
    });

    circle.on('pointerout', () => {
      this.pressed[key] = false;
      circle.setFillStyle(color, 0.55);
    });
  }

  wasAttackPressed() {
    const v = this.attackJustPressed;
    this.attackJustPressed = false;
    return v;
  }

  update(time) {
    for (const key of Object.keys(this.cooldowns)) {
      const cd = this.cooldowns[key];
      if (cd.remaining > 0) {
        cd.remaining -= 16; // approx
        if (cd.remaining < 0) cd.remaining = 0;

        const b = this.btns[key];
        if (cd.remaining > 0) {
          b.overlay.setVisible(true);
          b.cdText.setVisible(true);
          b.cdText.setText(Math.ceil(cd.remaining / 1000));
        } else {
          b.overlay.setVisible(false);
          b.cdText.setVisible(false);
        }
      }
    }
  }
}
