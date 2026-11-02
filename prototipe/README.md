# Prototipe Arena - Re:Shinrive Arena
Prototipe OFFLINE (Fase 1 roadmap): hanya tampilan arena + joystick + tombol attack + skill 1-4.
Tanpa server, tanpa login, tanpa menu. Stack: Phaser 3 + Vite.

## Menjalankan (setelah kode diisi)
    npm install
    npm run dev      # buka di browser, mode landscape (atau DevTools > mode HP)

## Cara memasang desain
1. Kirim desain -> potong sesuai nama file di `public/assets/assets.manifest.json`.
2. Taruh file di `public/assets/ui/` dan `public/assets/backgrounds/`.
3. Atur posisi/ukuran tombol di `src/config/layout.json` (tanpa ubah kode).

## Peta folder
    src/main.js            titik masuk Phaser
    src/config/            ukuran layar, layout tombol, angka sementara
    src/scenes/            Boot -> Preload -> Arena
    src/arena/             peta, kamera, tanah
    src/hero/              hero placeholder (kotak) sampai sprite siap
    src/input/             joystick, tombol attack/skill, keyboard (tes PC)
    src/hud/               HUD digambar di canvas
    src/skills/            cooldown + data skill placeholder
    public/assets/         gambar desain (ui, backgrounds, heroes)

Nama folder dan gaya header file mengikuti proyek utama supaya nanti mudah digabung
ke `client/src/battle/`.
