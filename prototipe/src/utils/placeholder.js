/**
 * FUNGSI  : Membuat tekstur kecil lewat kode (bayangan kaki + efek tebasan sementara)
 * DIPAKAI : PreloadScene
 * MEMAKAI : -
 * STATUS  : aktif (efek tebasan = placeholder sampai ada animasi attack)
 */

/** Bayangan lembut di tanah (elips gelap kebiruan, tepi memudar). */
export function makeShadowTexture(scene, key = 'shadow_fx') {
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, 128, 32);
  const ctx = tex.getContext();
  ctx.save();
  ctx.translate(64, 16);
  ctx.scale(1, 0.25);
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 64);
  g.addColorStop(0, 'rgba(28,24,70,0.95)');
  g.addColorStop(0.55, 'rgba(28,24,70,0.55)');
  g.addColorStop(1, 'rgba(28,24,70,0)');
  ctx.fillStyle = g;
  ctx.fillRect(-64, -64, 128, 128);
  ctx.restore();
  tex.refresh();
}

/** Tebasan bulan sabit (placeholder attack). Menghadap kanan; dibalik lewat flipX. */
export function makeSlashTexture(scene, key = 'slash_fx') {
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, 160, 160);
  const ctx = tex.getContext();
  const g = ctx.createLinearGradient(20, 0, 140, 0);
  g.addColorStop(0, 'rgba(255,190,225,0)');
  g.addColorStop(0.6, 'rgba(255,225,240,0.9)');
  g.addColorStop(1, 'rgba(255,255,255,1)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(40, 80, 100, -0.85, 0.85, false);
  ctx.arc(-122, 80, 240, 0.318, -0.318, true);
  ctx.closePath();
  ctx.fill();
  tex.refresh();
}
