# Prototipe Arena - Re:Shinrive Arena

Prototipe OFFLINE (Fase 1): arena + Asuka (sprite) + joystick + tombol attack + skill 1-4.

**Stack:** Phaser 3 + Vite

## Cara menjalankan

```bash
cd prototype
npm install
npm run dev
```

Buka di browser. **Mode landscape** (atau DevTools → Device mode → landscape HP).

### Kontrol

| Input | Aksi |
|-------|------|
| Joystick kiri / A D | Gerak kiri-kanan |
| Joystick atas / W / Space | Lompat |
| Tombol ATK / J atau K | Basic Attack |
| S1–S4 | Skill (cooldown only) |

## Status saat ini

- Hero: **Asuka** (frame webp baru, sudah dinormalkan: ukuran kanvas sama, kaki selalu di titik pijak yang sama)
- Animasi: idle, walk, run, jump (attack sementara = tebasan kode; blink belum dipakai)
- Joystick multitouch + keyboard debug
- Tombol attack + 4 skill dengan cooldown visual
- Arena: satu panorama menyambung 4064x720 (base biru kiri, base merah kanan, castle + plat di tengah)
- UI tombol digambar kode (ganti dengan asset PNG kamu nanti lewat `layout.json` + `assets.manifest.json`)

## Ganti background / UI sendiri

1. Taruh file di `public/assets/backgrounds/` dan `public/assets/ui/`
2. Sesuaikan nama di `public/assets/assets.manifest.json`
3. Atur posisi di `src/config/layout.json`

## Struktur

```
src/
  main.js
  config/          constants + layout
  scenes/          Boot → Preload → Arena
  hero/            Asuka
  input/           Joystick, ActionButtons, Keyboard
  arena/           Map + Camera
  hud/             HP + nama
public/assets/heroes/asuka/
  idle/ walk/ run/ jump/
tools/
  build_arena.py   susun ulang panorama dari tools/arena_src/*.jpg
```

Nama folder mengikuti proyek utama agar mudah digabung ke `client/src/battle/`.

## Mengubah arena
Taruh gambar baru di `tools/arena_src/` (blue/red/neutral.jpg, 1600x900), atur angka di `tools/build_arena.py`, lalu `python3 tools/build_arena.py`.
Posisi lantai, base, dan spawn ada di `src/config/constants.json` (`arena.groundY`, `arena.bases`, `arena.spawn`). Ukuran hero: `hero.standHeight`.
