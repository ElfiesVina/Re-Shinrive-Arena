# Normalisasi frame hero (dipakai sekali untuk v0.2). Sumber: zip idle/walk/run/jump dari user, di folder x/<nama>/*.webp.
# Jalankan: python3 build_hero.py <folder_keluaran>  (keluaran = public/assets/heroes/asuka)
import glob, os, sys
import numpy as np
from PIL import Image
SRC='x/'
OUT=sys.argv[1]
CW,CH,AX,AY=256,240,128,233
STAND=200.0   # tinggi hero berdiri (px tekstur)
ANIMS={ # nama: (folder, mode_x, skala)
 'idle':('c878466a-idle','feet',STAND/1064.0),
 'walk':('2026d073-walk','torso',None),     # skala per-frame -> tinggi sama
 'run' :('ddb44666-run','torso',STAND/525.0),
 'jump':('77d16025-jump','torso',STAND/525.0),
}
for name,(folder,mode,F) in ANIMS.items():
    files=sorted(glob.glob(SRC+folder+'/*.webp'))
    od=os.path.join(OUT,name); os.makedirs(od,exist_ok=True)
    for i,f in enumerate(files):
        im=Image.open(f).convert('RGBA')
        a=np.asarray(im)[...,3]
        m=a>40
        ys,xs=np.where(m); y0,y1=ys.min(),ys.max()+1; h=y1-y0
        if mode=='feet':
            fb=m[int(y1-0.06*h):y1]; cx=np.where(fb)[1].mean()
        else:
            band=m[int(y0+0.35*h):int(y0+0.65*h)]; cx=np.where(band)[1].mean()
        s=F if F else STAND/h
        W2,H2=max(1,round(im.width*s)),max(1,round(im.height*s))
        r=im.convert('RGBa').resize((W2,H2),Image.LANCZOS).convert('RGBA')
        canvas=Image.new('RGBA',(CW,CH),(0,0,0,0))
        px=round(AX-cx*s); py=round(AY-y1*s)
        canvas.alpha_composite(r,(px,py)) if px>=0 and py>=0 else canvas.paste(r,(px,py),r)
        # cek terpotong
        ca=np.asarray(canvas)[...,3]
        edge=(ca[0].max()>8, ca[-1].max()>8, ca[:,0].max()>8, ca[:,-1].max()>8)
        if any(edge): print('PERINGATAN terpotong',name,i,edge)
        canvas.save(os.path.join(od,f'f{i:02d}.webp'),'WEBP',quality=92,method=6,alpha_quality=100)
    print(name,len(files),'ok')
