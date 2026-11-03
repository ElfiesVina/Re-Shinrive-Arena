/**
 * FUNGSI  : Latar arena: panorama menyambung (3 potongan 1356px + overlap 2px agar tanpa celah)
 * DIPAKAI : ArenaScene
 * MEMAKAI : config/constants.json, assets/backgrounds/arena_0..2.webp
 * STATUS  : aktif
 *
 * Catatan desain: seluruh arena satu gambar panorama (bukan halaman disambung).
 * Sisi kiri = base biru, sisi kanan = base merah (cermin), tengah = castle + plat.
 * Tiap potongan di-render pada koordinat bilangan bulat supaya tidak ada garis tipis.
 */
import constants from '../config/constants.json';

export class ArenaMap {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    const a = constants.arena;
    for (let i = 0; i < a.tileCount; i++) {
      this.scene.add
        .image(i * a.tileWidth, 0, `arena_${i}`)
        .setOrigin(0, 0)
        .setDepth(-20)
        .setScrollFactor(1);
    }

    // Warna senada seluruh arena: lapisan tipis di atas hero tidak dipakai; hero diberi tint sendiri.
    this.scene.cameras.main.setBackgroundColor(0x6fa8f0);
  }
}
