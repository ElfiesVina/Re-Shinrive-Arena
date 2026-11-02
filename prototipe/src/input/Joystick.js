/**
 * FUNGSI  : Joystick virtual kiri layar; keluaran: vektor -1..1
 * DIPAKAI : ArenaScene
 * MEMAKAI : config/layout.json
 * STATUS  : aktif
 */
import Phaser from 'phaser';
import layout from '../config/layout.json';

export class Joystick {
  constructor(scene) {
    this.scene = scene;
    this.cfg = layout.joystick;
    this.vector = { x: 0, y: 0 };
    this.active = false;
    this.pointerId = null;

    const cam = scene.cameras.main;
    // Fixed to camera (UI)
    this.base = scene.add.circle(this.cfg.x, this.cfg.y, this.cfg.baseRadius, 0xffffff, 0.12)
      .setScrollFactor(0)
      .setDepth(100)
      .setStrokeStyle(3, 0xffffff, 0.35);

    this.knob = scene.add.circle(this.cfg.x, this.cfg.y, this.cfg.knobRadius, 0xff6b9d, 0.7)
      .setScrollFactor(0)
      .setDepth(101)
      .setStrokeStyle(2, 0xffffff, 0.5);

    // Label
    scene.add.text(this.cfg.x, this.cfg.y + this.cfg.baseRadius + 18, 'MOVE', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#ffffff',
      alpha: 0.5,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);

    // Pointer handling
    scene.input.on('pointerdown', (p) => {
      if (this.active) return;
      const dx = p.x - this.cfg.x;
      const dy = p.y - this.cfg.y;
      if (Math.sqrt(dx * dx + dy * dy) <= this.cfg.baseRadius * 1.4) {
        this.active = true;
        this.pointerId = p.id;
        this._updateKnob(p);
      }
    });

    scene.input.on('pointermove', (p) => {
      if (!this.active || p.id !== this.pointerId) return;
      this._updateKnob(p);
    });

    scene.input.on('pointerup', (p) => {
      if (p.id === this.pointerId) {
        this.active = false;
        this.pointerId = null;
        this.vector = { x: 0, y: 0 };
        this.knob.setPosition(this.cfg.x, this.cfg.y);
      }
    });
  }

  _updateKnob(p) {
    let dx = p.x - this.cfg.x;
    let dy = p.y - this.cfg.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const max = this.cfg.baseRadius - 10;

    if (dist > max) {
      dx = (dx / dist) * max;
      dy = (dy / dist) * max;
    }

    this.knob.setPosition(this.cfg.x + dx, this.cfg.y + dy);

    const nx = dx / max;
    const ny = dy / max;
    const dead = this.cfg.deadZone || 0.15;
    this.vector = {
      x: Math.abs(nx) < dead ? 0 : nx,
      y: Math.abs(ny) < dead ? 0 : ny,
    };
  }

  getVector() {
    return this.vector;
  }

  update() {
    // nothing per frame needed
  }
}
