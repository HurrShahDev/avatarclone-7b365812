## Goal
Backend (FastAPI `/generate`) ka return kiya hua `.mp4` site pe properly show ho aur Download button se actually download ho (cross-origin pe bhi).

## Aaj kya hai
- `src/lib/avatarStorage.ts` → `sendAvatarToBackend()` form-data bhejta hai, response ko `res.json()` karta hai aur `{ video_url }` expect karta hai.
- `src/pages/CreateAvatar.tsx` (line 1044–1046) `video_url` set karta hai, `<video src=...>` mein dikhata hai aur `<a download>` se download try karta hai.

## Problems
1. Agar backend response **JSON nahi** — seedha `video/mp4` binary stream bhejta hai — to `res.json()` fail/empty ho jata hai aur kuch nahi dikhega.
2. Agar JSON mein URL aata hai par `.mp4` query-string ke sath hai (`/file.mp4?token=...`), to `endsWith('.mp4')` check fail ho jata hai → video ki jagah `<img>` render hota hai.
3. **Download button** cross-origin URL pe `<a download>` browsers ignore kar dete hain → file download nahi hoti, sirf naya tab khulta hai.
4. CORS: FastAPI mein CORS middleware na ho to browser response block kar dega.

## Fix plan (sirf 2 files)

### 1. `src/lib/avatarStorage.ts` — `sendAvatarToBackend` smarter banao
- Response ka `Content-Type` check karo:
  - Agar `application/json` → pehle ki tarah `{ video_url }` return.
  - Agar `video/*` (ya `application/octet-stream`) → response ko `blob()` karo, `URL.createObjectURL(blob)` se local URL banao aur `{ video_url: blobUrl, isBlob: true }` return karo.
- Errors mein status + text dono throw karo (already partially hai).

### 2. `src/pages/CreateAvatar.tsx` — preview + download fix
- Video render condition se `.endsWith('.mp4')` hatao. Backend hamesha video deta hai, to direct `<video src={generatedVideoUrl} controls playsInline />` use karo (img fallback hata do, ya sirf error case ke liye rakho).
- Naya helper `downloadVideo(url, filename)` add karo:
  - `fetch(url)` → `blob()` → `URL.createObjectURL` → temp `<a download>` click → `revokeObjectURL`.
  - Try/catch — fail ho to `window.open(url, '_blank')` fallback.
- Download Button ko `<a>` ki jagah `onClick={() => downloadVideo(generatedVideoUrl, 'avatar-video.mp4')}` se chalao.
- Component unmount / regenerate pe purane blob URL ko `URL.revokeObjectURL` karo (memory leak avoid).

### 3. Backend side note (sirf information, code change nahi)
FastAPI mein ye hona chahiye warna CORS error aayega:
```py
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
```
Aur response ya to:
- JSON: `{"video_url": "https://your-host/files/abc.mp4"}` (publicly fetchable URL), ya
- Direct: `FileResponse("output.mp4", media_type="video/mp4")`.

Dono cases ab frontend handle kar lega.

## Env
`.env` mein already `VITE_BACKEND_API_URL=http://localhost:8000/generate` (ya jo bhi ho) set hona chahiye — code already isko use karta hai. Agar nahi set, simulation chalega.

## Files changed
- `src/lib/avatarStorage.ts`
- `src/pages/CreateAvatar.tsx`

Koi aur file touch nahi hogi.
