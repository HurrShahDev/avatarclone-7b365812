## Problem
`avatar-video.mp4` ka codec `mpeg4` hai (DivX/Xvid family). Browsers ke `<video>` tag sirf **H.264 (avc1)** decode kar sakte hain MP4 container mein. Isi liye laptop player (VLC) chala leta hai, lekin Chrome blank screen + sirf audio dikhata hai.

Fix sirf backend ke `MODAL_HUG_GIT.py` mein hai — ffmpeg ko H.264 + yuv420p mein re-encode karwana hai. Frontend / site code bilkul touch nahi hoga.

## Change (sirf 1 file: `MODAL_HUG_GIT.py`)

Function `generate_lipsync_video` ke andar **"Re-adding audio track"** wala `ffmpeg_cmd` block replace karna hai. Current mein `-c:v copy` hai (jo mpeg4 hi rakh leta hai). Isko H.264 high-quality settings se badalna hai:

```python
print("\n  🔊 Re-adding audio track + browser-compatible re-encode...")
ffmpeg_cmd = [
    "ffmpeg", "-y",
    "-i", "restored_no_audio.mp4",   # video (frames)
    "-i", "temp_output.mp4",         # audio source
    "-c:v", "libx264",               # ← H.264 (browser-compatible)
    "-pix_fmt", "yuv420p",           # ← chroma format browsers need
    "-profile:v", "high",            # high profile = better quality, sab modern browsers support
    "-level", "4.0",
    "-preset", "slow",               # ← slow = better compression at same quality
    "-crf", "17",                    # ← 17 = visually lossless (18 default; 17 thoda aur sharp)
    "-x264-params", "ref=5:bframes=3:me=umh:subme=8",  # quality tuning
    "-movflags", "+faststart",       # browser streaming-friendly (moov atom front)
    "-c:a", "aac",
    "-b:a", "192k",                  # 192 kbps audio (clear voice)
    "-ar", "44100",
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-shortest",
    "output.mp4"
]
```

Baki sab same — `subprocess.run`, fallback `shutil.copy("temp_output.mp4", "output.mp4")`, file read, return — kuch nahi badlega.

### Quality guarantees (blur nahi hoga)
- **CRF 17** = visually lossless (CRF scale: 0 lossless, 18 default "indistinguishable", 23 average). 17 par output GFPGAN-restored frames jaisa hi sharp rahega.
- **preset slow** = encoder ko zyada time deta hai better compression dhoondhne ka → same quality at smaller size, koi softening nahi.
- **profile high + ref 5 + subme 8** = motion estimation strong, lip-sync edges crisp.
- **yuv420p** = chroma subsampling browsers ke liye mandatory; GFPGAN already RGB→BGR frames likhta hai, downsample sirf chroma channel par hota hai → luma (sharpness) full rahega.
- **faststart** = `<video>` tag ko start hote hi metadata mil jata hai (warna kabhi-kabhi blank dikh sakta hai jab tak full download na ho).

### Trade-off note
`preset slow` se encoding ~2-3x slower hogi (Modal T4 par typically 10-20s extra for short clips). Agar speed chahiye to `preset medium` use kar lo — quality almost same rahegi. Blur kisi bhi case mein nahi aayega.

## Frontend status
Frontend (`avatarStorage.ts` + `CreateAvatar.tsx`) pehle se sahi hai — blob URL bana ke `<video>` mein dal raha hai. Backend ka codec fix hote hi video browser mein normally play hone lagegi, koi frontend change nahi chahiye.

## Files
- `MODAL_HUG_GIT.py` (backend, Modal) — sirf `ffmpeg_cmd` block update.
- ❌ Lovable project mein koi file nahi badlegi.
