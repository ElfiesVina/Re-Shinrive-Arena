/**
 * FUNGSI  : Hero Asuka: gerak, lompat, animasi, attack
 * DIPAKAI : ArenaScene
 * MEMAKAI : config/constants.json
 * STATUS  : aktif
 */
import Phaser from 'phaser';
import constants from '../config/constants.json';

export class Hero {
  constructor(scene, x, y) {
    this.scene = scene;
    this.const = constants.hero;

    this.sprite = scene.physics.add.sprite(x, y, 'asuka_idle_0');
    this.sprite.setScale(this.const.scale);
    this.sprite.setTint(0xffffff);
    this.sprite.setAlpha(1);
    this.sprite.setBlendMode(Phaser.BlendModes.NORMAL);
    this.sprite.setCollideWorldBounds(false);
    // Approximate body relative to 300x400 texture
    this.sprite.body.setSize(100, 280);
    this.sprite.body.setOffset(100, 90);
    this.sprite.setDepth(10);

    this.facing = 1;
    this.onGround = false;
    this.isAttacking = false;
    this.currentAnim = '';

    this.sprite.play('asuka_idle');
    this.currentAnim = 'asuka_idle';

    this.sprite.on('animationcomplete', (anim) => {
      if (anim.key === 'asuka_attack') {
        this.isAttacking = false;
        this.playAnim('asuka_idle');
      }
    });

    scene.physics.world.setBounds(0, 0, constants.arena.width, constants.arena.height);
  }

  update(moveX, jumpPressed, attackPressed, delta) {
    const body = this.sprite.body;
    this.onGround = body.blocked.down || body.touching.down;

    // Attack
    if (attackPressed && !this.isAttacking && this.onGround) {
      this.isAttacking = true;
      this.playAnim('asuka_attack');
      body.setVelocityX(0);
      return;
    }

    if (this.isAttacking) {
      body.setVelocityX(0);
      return;
    }

    // Horizontal
    const absX = Math.abs(moveX);
    if (absX > 0.15) {
      const speed = absX > 0.65 ? this.const.runSpeed : this.const.speed;
      body.setVelocityX(moveX * speed);
      this.facing = moveX > 0 ? 1 : -1;
      this.sprite.setFlipX(this.facing < 0);
    } else {
      body.setVelocityX(0);
    }

    // Jump
    if (jumpPressed && this.onGround) {
      body.setVelocityY(-this.const.jumpPower);
      this.playAnim('asuka_jump');
    }

    // Animation state machine
    if (!this.onGround) {
      if (this.currentAnim !== 'asuka_jump') this.playAnim('asuka_jump');
    } else if (absX > 0.65) {
      this.playAnim('asuka_run');
    } else if (absX > 0.15) {
      this.playAnim('asuka_walk');
    } else {
      this.playAnim('asuka_idle');
    }
  }

  playAnim(key) {
    if (this.currentAnim === key) return;
    this.sprite.play(key, true);
    this.currentAnim = key;
  }

  getHp() {
    return this.const.maxHp;
  }

  getMaxHp() {
    return this.const.maxHp;
  }
}
