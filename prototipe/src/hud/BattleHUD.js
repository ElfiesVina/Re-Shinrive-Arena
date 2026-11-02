/**
 * FUNGSI  : HUD HP bar + nama hero
 * DIPAKAI : ArenaScene
 * MEMAKAI : config/layout.json
 * STATUS  : aktif
 */
import layout from '../config/layout.json';

export class BattleHUD {
  constructor(scene) {
    this.scene = scene;
    const hp = layout.hud.hpBar;

    // Name
    this.nameText = scene.add.text(hp.x, hp.y - 22, 'ASUKA', {
      fontFamily: 'Arial',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#ff9ec4',
    }).setScrollFactor(0).setDepth(110);

    // HP bar bg
    this.hpBg = scene.add.rectangle(hp.x, hp.y, hp.width, hp.height, 0x1a1020)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(110)
      .setStrokeStyle(1, 0xffffff, 0.3);

    // HP fill
    this.hpFill = scene.add.rectangle(hp.x + 1, hp.y, hp.width - 2, hp.height - 2, 0xff4d6d)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(111);

    this.maxW = hp.width - 2;
  }

  update(hero) {
    const ratio = hero.getHp() / hero.getMaxHp();
    this.hpFill.width = Math.max(0, this.maxW * ratio);
  }
}
