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
 *   const res = await sendAvatarToBackend('http://localhost:8000/generate');
 *   // → backend receives multipart/form-data with `face_file`, `ref_audio_file`, `text`, `user_id`
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
  scriptFile?: Blob;
  scriptFileName?: string;
  scriptFileType?: string;
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

export async function saveScriptFile(file: Blob, name = 'script.txt', type?: string) {
  return putAvatarAsset({ scriptFile: file, scriptFileName: name, scriptFileType: type ?? file.type });
}

export async function clearScriptFile() {
  return putAvatarAsset({ scriptFile: undefined, scriptFileName: undefined, scriptFileType: undefined });
}

export async function clearAvatarAsset() {
  await tx('readwrite', (s) => s.delete(RECORD_ID));
}

/**
 * Derive the FastAPI base URL from VITE_BACKEND_API_URL (which may point at
 * `/generate` already). Returns e.g. "http://localhost:8000".
 */
function deriveBase(apiUrl: string): string {
  return apiUrl.replace(/\/+$/, '').replace(/\/(generate(-from-file)?)$/, '');
}

/**
 * POST the stored avatar to the backend.
 *
 * - If a script .txt file is stored → POST /generate-from-file
 *     (face_file, ref_audio_file, text_file, user_id)
 * - Otherwise                       → POST /generate
 *     (face_file, ref_audio_file, text, user_id)
 */
export async function sendAvatarToBackend(apiUrl: string, extraHeaders: Record<string, string> = {}) {
  const asset = await getAvatarAsset();
  if (!asset?.photo || !asset?.voice) {
    throw new Error('Missing photo or voice. Complete the upload steps first.');
  }

  const base = deriveBase(apiUrl);
  const useFile = !!asset.scriptFile;
  const endpoint = useFile ? `${base}/generate-from-file` : `${base}/generate`;

  const fd = new FormData();
  fd.append('face_file', new File([asset.photo], asset.photoName ?? 'photo.png', { type: asset.photoType }));
  fd.append('ref_audio_file', new File([asset.voice], asset.voiceName ?? 'voice.webm', { type: asset.voiceType }));
  fd.append('user_id', asset.meta?.name ?? 'anonymous');

  if (useFile && asset.scriptFile) {
    // NOTE: field name `text_file` matches the FastAPI generate_from_file signature.
    fd.append('text_file', new File([asset.scriptFile], asset.scriptFileName ?? 'script.txt', { type: asset.scriptFileType ?? 'text/plain' }));
  } else {
    fd.append('text', asset.meta?.script ?? '');
  }

  const res = await fetch(endpoint, { method: 'POST', body: fd, headers: extraHeaders });
  if (!res.ok) throw new Error(`Backend returned ${res.status}: ${await res.text()}`);

  const contentType = res.headers.get('content-type')?.toLowerCase() ?? '';
  if (contentType.includes('application/json')) {
    return res.json().catch(() => ({}));
  }
  if (contentType.startsWith('video/') || contentType.includes('octet-stream')) {
    const blob = await res.blob();
    return { video_url: URL.createObjectURL(blob), isBlob: true };
  }
  try {
    return await res.json();
  } catch {
    const blob = await res.blob();
    return { video_url: URL.createObjectURL(blob), isBlob: true };
  }
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