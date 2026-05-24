/**
 * Avatar Asset Storage
 * ────────────────────
 * Persists the user's uploaded photo + voice locally in IndexedDB so they
 * survive page reloads and can later be POSTed to a backend API.
 *
 * Why IndexedDB (not localStorage)?
 *   - Stores Blob/File natively (no base64 inflation)
 *   - ~Quota of hundreds of MB (vs ~5 MB for localStorage)
 *   - Async, non-blocking
 *
 * How to send to your backend (when ready):
 *   import { getAvatarAsset, sendAvatarToBackend } from '@/lib/avatarStorage';
 *   const res = await sendAvatarToBackend('https://api.your-backend.com/avatars');
 *   // → backend receives multipart/form-data with `photo`, `voice`, `meta`
 */

const DB_NAME = 'avatarclone-assets';
const DB_VERSION = 1;
const STORE = 'avatar';
const RECORD_ID = 'current'; // single active draft

export interface AvatarMeta {
  name: string;
  description: string;
  language: string;
  privacy: 'public' | 'unlisted' | 'private';
  consent: boolean;
  script?: string;
}

export interface AvatarAsset {
  id: string;
  photo?: Blob;
  photoName?: string;
  photoType?: string;
  voice?: Blob;
  voiceName?: string;
  voiceType?: string;
  voiceDurationSec?: number;
  meta?: Partial<AvatarMeta>;
  updatedAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const store = t.objectStore(STORE);
    const req = fn(store);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getAvatarAsset(): Promise<AvatarAsset | undefined> {
  return tx('readonly', (s) => s.get(RECORD_ID) as IDBRequest<AvatarAsset | undefined>);
}

async function putAvatarAsset(patch: Partial<AvatarAsset>): Promise<AvatarAsset> {
  const existing = (await getAvatarAsset()) ?? { id: RECORD_ID, updatedAt: 0 };
  const merged: AvatarAsset = { ...existing, ...patch, id: RECORD_ID, updatedAt: Date.now() };
  await tx('readwrite', (s) => s.put(merged));
  return merged;
}

export async function savePhoto(file: Blob, name = 'photo.png', type?: string) {
  return putAvatarAsset({ photo: file, photoName: name, photoType: type ?? file.type });
}

export async function saveVoice(blob: Blob, name = 'voice.webm', type?: string, durationSec?: number) {
  return putAvatarAsset({ voice: blob, voiceName: name, voiceType: type ?? blob.type, voiceDurationSec: durationSec });
}

export async function saveMeta(meta: Partial<AvatarMeta>) {
  return putAvatarAsset({ meta });
}

export async function clearAvatarAsset() {
  await tx('readwrite', (s) => s.delete(RECORD_ID));
}

/**
 * POST the stored avatar to a backend endpoint as multipart/form-data.
 *
 * Backend will receive form fields:
 *   - photo  (File)  — JPG / PNG of the user's face
 *   - voice  (File)  — WebM / MP3 / WAV of the user's voice
 *   - meta   (JSON string) — { name, description, language, script, ... }
 *
 * Example FastAPI signature:
 *   @app.post("/avatars")
 *   async def create_avatar(photo: UploadFile, voice: UploadFile, meta: str = Form(...)):
 *       ...
 *
 * Example Express + multer signature:
 *   app.post('/avatars', upload.fields([{name:'photo'}, {name:'voice'}]), (req, res) => { ... })
 */
export async function sendAvatarToBackend(apiUrl: string, extraHeaders: Record<string, string> = {}) {
  const asset = await getAvatarAsset();
  if (!asset?.photo || !asset?.voice) {
    throw new Error('Missing photo or voice. Complete the upload steps first.');
  }
  const fd = new FormData();
  fd.append('photo', new File([asset.photo], asset.photoName ?? 'photo.png', { type: asset.photoType }));
  fd.append('voice', new File([asset.voice], asset.voiceName ?? 'voice.webm', { type: asset.voiceType }));
  fd.append('meta', JSON.stringify(asset.meta ?? {}));
  const res = await fetch(apiUrl, { method: 'POST', body: fd, headers: extraHeaders });
  if (!res.ok) throw new Error(`Backend returned ${res.status}: ${await res.text()}`);
  return res.json().catch(() => ({}));
}

/** Helper for debugging: dump current storage info to the console. */
export async function debugDumpAvatarAsset() {
  const a = await getAvatarAsset();
  // eslint-disable-next-line no-console
  console.log('[AvatarStorage]', a ? {
    photo: a.photo ? `${a.photoType} ${a.photo.size}B` : 'none',
    voice: a.voice ? `${a.voiceType} ${a.voice.size}B (${a.voiceDurationSec}s)` : 'none',
    meta: a.meta,
    updatedAt: new Date(a.updatedAt).toISOString(),
  } : 'empty');
}
