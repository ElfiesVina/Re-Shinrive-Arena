/**
 * FUNGSI  : Scene prototipe: arena, hero Asuka, joystick, tombol, kamera
 * DIPAKAI : PreloadScene
 * MEMAKAI : arena/*, hero/*, input/*, hud/*
 * STATUS  : aktif
 */
import Phaser from 'phaser';
import constants from '../config/constants.json';
import layout from '../config/layout.json';
import { Hero } from '../hero/Hero.js';
import { Joystick } from '../input/Joystick.js';
import { ActionButtons } from '../input/ActionButtons.js';
import { KeyboardDebug } from '../input/KeyboardDebug.js';
import { BattleHUD } from '../hud/BattleHUD.js';
import { ArenaMap } from '../arena/ArenaMap.js';
import { CameraController } from '../arena/CameraController.js';

export class ArenaScene extends Phaser.Scene {
  constructor() {
    super('Arena');
  }

  create() {
    this.constants = constants;
    this.layout = layout;

    // Arena
    this.arenaMap = new ArenaMap(this);
    this.arenaMap.create();

    // Ground collider (tepat di groundY)
    this.ground = this.physics.add.staticGroup();
    const groundY = constants.arena.groundY;
    const g = this.add.rectangle(
      constants.arena.width / 2,
      groundY + 20,
      constants.arena.width,
      40,
      0x000000,
      0
    );
    this.physics.add.existing(g, true);
    this.ground.add(g);

    // Hero berdiri di atas tanah, mulai di depan base biru
    this.hero = new Hero(this, constants.arena.spawn.blue, groundY);
    this.physics.add.collider(this.hero.sprite, this.ground);
    
    // Camera
    this.cameraCtrl = new CameraController(this, this.hero.sprite);

    // Input
    this.joystick = new Joystick(this);
    this.actionButtons = new ActionButtons(this);
    this.keyboard = new KeyboardDebug(this);

    // HUD
    this.hud = new BattleHUD(this);

    // State
    this.isAttacking = false;
  }

  update(time, delta) {
    const joy = this.joystick.getVector();
    const keys = this.keyboard.getState();

    // Merge input: joystick + keyboard
    let moveX = joy.x;
    if (keys.left) moveX = -1;
    if (keys.right) moveX = 1;

    const jumpPressed = joy.y < -0.55 || keys.up || keys.space;
    const attackPressed = this.actionButtons.wasAttackPressed() || keys.attack;

    this.hero.update(moveX, jumpPressed, attackPressed, delta);

    this.cameraCtrl.update();
    this.joystick.update();
    this.actionButtons.update(time);
    this.hud.update(this.hero);
  }
}
