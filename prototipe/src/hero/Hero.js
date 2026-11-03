/**
 * FUNGSI  : Hero Asuka: gerak, lompat, animasi, attack (placeholder), bayangan di tanah
 * DIPAKAI : ArenaScene
 * MEMAKAI : config/constants.json, assets/heroes/asuka/*, utils/placeholder.js
 * STATUS  : aktif
 *
 * Anti-getar:
 * - Semua frame sudah dinormalkan (kanvas sama 256x240, titik pijak kaki tetap di (128,233)),
 *   jadi origin sprite = titik pijak dan tidak ada loncatan antar frame.
 * - Hitbox fisika dipasang relatif ke titik pijak yang sama, ukurannya tidak bergantung frame.
 * - Bayangan dan efek diperbarui di POST_UPDATE (sesudah fisika), bukan di update().
 */
import Phaser from 'phaser';
import constants from '../config/constants.json';

const C = constants.hero;
const T = C.texture;

export class Hero {
  constructor(scene, x, y) {
    this.scene = scene;
    this.const = C;
    this.groundY = constants.arena.groundY;

    // Bayangan (di bawah hero)
    this.shadow = scene.add
      .image(x, this.groundY + 1, 'shadow_fx')
      .setDepth(9)
      .setAlpha(C.shadow.alpha);

    this.sprite = scene.physics.add.sprite(x, y, 'asuka_idle_0');
    this.sprite.setOrigin(T.anchorX / T.width, T.anchorY / T.height);
    this.sprite.setScale(C.standHeight / T.standHeight);
    this.sprite.setTint(C.tint); // sedikit dingin agar senada dengan langit arena
    this.sprite.setDepth(10);
    this.sprite.setCollideWorldBounds(true);

    // Hitbox (satuan piksel tekstur; ikut diskalakan Phaser). Dasar hitbox = titik pijak.
    this.sprite.body.setSize(C.body.width, C.body.height, false);
    this.sprite.body.setOffset(T.anchorX - C.body.width / 2, T.anchorY - C.body.height);

    const pad = constants.arena.edgePadding;
    scene.physics.world.setBounds(pad, 0, constants.arena.width - pad * 2, constants.arena.height);

    this.facing = 1;
    this.onGround = false;
    this.wasOnGround = false;
    this.isAttacking = false;
    this.attackT = 0;
    this.landT = 0;
    this.fallV = 0;
    this.current = '';

    this._playLoop('idle');

    scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this._post, this);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this._post, this);
    });
  }

  update(moveX, jumpPressed, attackPressed, delta) {
    const body = this.sprite.body;
    const dt = Math.min(delta, 50);
    this.onGround = body.blocked.down || body.touching.down;

    // Kecepatan jatuh tertinggi selama di udara (saat menyentuh tanah, Arcade sudah meng-nol-kan vy)
    if (!this.onGround) this.fallV = Math.max(this.fallV, body.velocity.y);
    // Mendarat: sedikit "jongkok" kalau tidak sedang bergerak
    if (this.onGround && !this.wasOnGround && this.fallV > 250 && Math.abs(moveX) < 0.15) {
      this.landT = 90;
    }
    if (this.onGround) this.fallV = 0;
    this.wasOnGround = this.onGround;

    // ---- Attack (placeholder: tebasan + maju sedikit) ----
    if (attackPressed && !this.isAttacking && this.onGround) {
      this.isAttacking = true;
      this.attackT = C.attackMs;
      this._spawnSlash();
    }
    if (this.isAttacking) {
      this.attackT -= dt;
      body.setVelocityX(this.attackT > C.attackMs - 110 ? this.facing * 110 : 0);
      this._setFrame('idle', 3);
      if (this.attackT <= 0) this.isAttacking = false;
      return;
    }

    // ---- Gerak horizontal ----
    const absX = Math.abs(moveX);
    if (absX > 0.15) {
      const run = absX > 0.65;
      body.setVelocityX(Math.sign(moveX) * (run ? C.runSpeed : C.speed) * (run ? 1 : Math.max(absX / 0.65, 0.6)));
      this.facing = moveX > 0 ? 1 : -1;
      this.sprite.setFlipX(this.facing < 0);
    } else {
      body.setVelocityX(0);
    }

    // ---- Lompat ----
    if (jumpPressed && this.onGround) {
      body.setVelocityY(-C.jumpPower);
      this.onGround = false;
    }

    // ---- Pilih pose ----
    if (!this.onGround) {
      const vy = body.velocity.y;
      let f = 3; // puncak
      if (vy < -250) f = 1;
      else if (vy < -60) f = 2;
      else if (vy > 250) f = 5;
      else if (vy > 60) f = 4;
      this._setFrame('jump', f);
    } else if (this.landT > 0) {
      this.landT -= dt;
      this._setFrame('jump', 6);
    } else if (absX > 0.65) {
      this._playLoop('run', Math.abs(body.velocity.x) / C.anim.runRefSpeed);
    } else if (absX > 0.15) {
      this._playLoop('walk', Math.abs(body.velocity.x) / C.anim.walkRefSpeed);
    } else {
      this._playLoop('idle');
    }
  }

  /** Loop animasi; laju animasi mengikuti kecepatan supaya kaki tidak "meluncur". */
  _playLoop(name, speedRatio = 1) {
    const key = `asuka_${name}`;
    if (this.current !== name) {
      this.sprite.anims.play(key, true);
      this.current = name;
    }
    this.sprite.anims.timeScale = Phaser.Math.Clamp(speedRatio, 0.6, 1.4);
  }

  /** Tampilkan satu frame tetap (lompat/attack). */
  _setFrame(name, index) {
    const id = `${name}:${index}`;
    if (this.current === id) return;
    this.sprite.anims.stop();
    this.sprite.setTexture(`asuka_${name}_${index}`);
    this.current = id;
  }

  _spawnSlash() {
    const s = this.sprite;
    const fx = this.scene.add
      .image(s.x + this.facing * 62, s.y - C.standHeight * 0.5, 'slash_fx')
      .setDepth(11)
      .setFlipX(this.facing < 0)
      .setBlendMode(Phaser.BlendModes.ADD);
    this.scene.tweens.add({
      targets: fx,
      alpha: { from: 0.95, to: 0 },
      scale: { from: 0.7, to: 1.15 },
      duration: 240,
      ease: 'Quad.easeOut',
      onComplete: () => fx.destroy(),
    });
  }

  /** Dipanggil sesudah fisika disinkronkan ke sprite. */
  _post() {
    const s = this.sprite;
    const h = Math.max(0, this.groundY - s.y);
    const k = Phaser.Math.Clamp(1 - h / 320, 0.35, 1);
    this.shadow.setPosition(s.x, this.groundY + 1);
    this.shadow.setDisplaySize(C.shadow.width * k, C.shadow.height * k);
    this.shadow.setAlpha(C.shadow.alpha * k);
  }

  getHp() {
    return this.const.maxHp;
  }

  getMaxHp() {
    return this.const.maxHp;
  }
}
