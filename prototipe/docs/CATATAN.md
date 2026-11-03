# Catatan prototipe
- Arah gambar: hero menghadap KANAN; hadap kiri = dibalik oleh kode (flipX).
- Tombol digambar di canvas Phaser, bukan HTML (sesuai docs/ARSITEKTUR.md proyek utama).
- Multitouch wajib: jempol kiri (joystick) dan kanan (tombol) jalan bersamaan.
- Prioritas pengerjaan: 1) tanah + kamera, 2) joystick, 3) attack + skill + cooldown, 4) pasang desain.
- Batas prototipe: tanpa musuh/tower/server. Itu bagian roadmap Fase 1 lanjutan.

## Update arena + hero (v0.2)
- Penyebab hero bergetar: frame lama rusak (hasil chroma key, hanya 7-14% piksel tersisa) dan frame baru punya ukuran kanvas berbeda tiap animasi dengan badan melayang 10-40 px antar frame. Sekarang semua frame dinormalkan oleh skrip dan dikunci ke satu titik pijak.
- Kamera: tanpa deadzone/lerp bawaan; peredaman tidak bergantung FPS, dihitung sesudah fisika. Fisika `fixedStep: false`.
- Arena: panorama menyambung, bukan halaman bersambung. Sisi kanan = cermin sisi kiri dengan base merah di ujung kanan.
- Skala: layar 720 px = tinggi gambar arena x0.8; hero 150 px (tinggi berdiri).
- Hero menyatu: bayangan kontak yang mengecil saat lompat, tint dingin ringan, berpijak di paving.
- Belum ada: frame attack dan blink yang bersih (blink punya potongan putih di 4 dari 6 frame).
