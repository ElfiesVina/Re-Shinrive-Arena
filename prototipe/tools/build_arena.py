"""
Membangun panorama arena dari 3 gambar sumber (tools/arena_src/*.jpg), lalu memotongnya jadi
public/assets/backgrounds/arena_0..2.webp.  Jalankan dari folder prototipe:  python3 tools/build_arena.py

Susunan (satuan piksel gambar sumber 1600x900):
  [base biru 0..440] [lorong: blok cermin P|P' x3] [inti castle 440..1000]  | cermin dari kiri, base merah di kanan
  - Blok lorong = potongan x=440..440+m dipantulkan, jadi sambungan antar blok sama persis (tanpa jahitan).
  - Sumbu cermin di x=1000 (lengkung jembatan); plat tengah diambil dari gambar netral lalu di-feather.
  - Sisi kanan = cermin sisi kiri, dengan zona base diganti gambar merah (cross-fade 70px).
"""
import json, os, sys
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'arena_src')
OUT = os.path.join(HERE, '..', 'public', 'assets', 'backgrounds')
X0, AXIS, FADE = 440, 1000, 70
BLOCKS = [260, 300, 210]          # lebar tiap blok lorong (urutan = variasi awan)
SCALE, TILE, OVERLAP = 0.8, 1356, 2

def load(n): return np.asarray(Image.open(os.path.join(SRC, n + '.jpg')).convert('RGB')).astype(np.float32)
blue, red, neu = load('blue'), load('red'), load('neutral')

zb = blue[:, :X0]
w = np.zeros(X0, np.float32); w[X0 - FADE:] = np.linspace(0, 1, FADE)
zr = red[:, :X0] * (1 - w)[None, :, None] + zb * w[None, :, None]
lane = np.concatenate([np.concatenate([blue[:, X0:X0 + m], blue[:, X0:X0 + m][:, ::-1]], axis=1) for m in BLOCKS], axis=1)
core = blue[:, X0:AXIS]
left = np.concatenate([zb, lane, core], axis=1)
left_red = np.concatenate([zr, lane, core], axis=1)
pano = np.concatenate([left, left_red[:, ::-1]], axis=1)
H, W, _ = pano.shape; cx = left.shape[1]

# plat tengah (feather elips) dari gambar netral
pcx, pcy, rx, ry = 800, 632, 215, 58
sx0, sy0, ew, eh = pcx - rx - 30, pcy - ry - 30, 2 * rx + 60, 2 * ry + 60
src = neu[sy0:sy0 + eh, sx0:sx0 + ew]
ly, lx = np.mgrid[0:eh, 0:ew].astype(np.float32)
d = np.sqrt(((lx - ew / 2) / rx) ** 2 + ((ly - eh / 2) / ry) ** 2)
a = np.clip((1.0 - d) / 0.28, 0, 1); a = a * a * (3 - 2 * a)
dx0 = cx - ew // 2
pano[sy0:sy0 + eh, dx0:dx0 + ew] = pano[sy0:sy0 + eh, dx0:dx0 + ew] * (1 - a[..., None]) + src * a[..., None]

img = Image.fromarray(np.clip(pano, 0, 255).astype(np.uint8))
fw, fh = round(W * SCALE), round(H * SCALE)
img = img.resize((fw, fh), Image.LANCZOS)
os.makedirs(OUT, exist_ok=True)
n = -(-fw // TILE)
for i in range(n):
    x = i * TILE
    img.crop((x, 0, min(fw, x + TILE + OVERLAP), fh)).save(os.path.join(OUT, f'arena_{i}.webp'), 'WEBP', quality=90, method=6)
print(json.dumps(dict(width=fw, height=fh, tiles=n, centerX=round(cx * SCALE))))
