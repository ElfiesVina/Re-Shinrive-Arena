/**
 * FUNGSI  : Titik masuk: buat game Phaser dengan config lalu daftarkan scene
 * DIPAKAI : index.html
 * MEMAKAI : config/game.config, scenes/*
 * STATUS  : aktif
 */
import Phaser from 'phaser';
import { gameConfig } from './config/game.config.js';
import { BootScene } from './scenes/BootScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { ArenaScene } from './scenes/ArenaScene.js';

const config = {
  ...gameConfig,
  scene: [BootScene, PreloadScene, ArenaScene],
};

new Phaser.Game(config);
