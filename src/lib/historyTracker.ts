/**
 * Tracks avatar names a user has generated videos for, per-user, in localStorage.
 * Backend /history/{user_id} requires an `avatar_name` query, so we keep our own
 * folder index locally.
 */

const KEY = (uid: string) => `avatarclone:history:avatars:${uid}`;
const HIDDEN_KEY = (uid: string) => `avatarclone:history:hidden:${uid}`;

export function getTrackedAvatars(uid: string): string[] {
  try {
    const raw = localStorage.getItem(KEY(uid));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function trackAvatar(uid: string, avatarName: string) {
  if (!uid || !avatarName?.trim()) return;
  const list = getTrackedAvatars(uid);
  if (!list.includes(avatarName)) {
    list.unshift(avatarName);
    localStorage.setItem(KEY(uid), JSON.stringify(list));
  }
}

export function removeAvatar(uid: string, avatarName: string) {
  const list = getTrackedAvatars(uid).filter((n) => n !== avatarName);
  localStorage.setItem(KEY(uid), JSON.stringify(list));
}

export function getHiddenVideos(uid: string, avatarName: string): string[] {
  try {
    const raw = localStorage.getItem(HIDDEN_KEY(uid));
    const all = raw ? JSON.parse(raw) : {};
    return all[avatarName] ?? [];
  } catch {
    return [];
  }
}

export function hideVideo(uid: string, avatarName: string, videoId: string) {
  try {
    const raw = localStorage.getItem(HIDDEN_KEY(uid));
    const all = raw ? JSON.parse(raw) : {};
    all[avatarName] = Array.from(new Set([...(all[avatarName] ?? []), videoId]));
    localStorage.setItem(HIDDEN_KEY(uid), JSON.stringify(all));
  } catch {
    /* ignore */
  }
}

/** Base URL of the FastAPI backend, derived from VITE_BACKEND_API_URL. */
export function getBackendBase(): string {
  const url = (import.meta as any).env?.VITE_BACKEND_API_URL as string | undefined;
  if (!url) return 'http://127.0.0.1:8000';
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.host}`;
  } catch {
    return url.replace(/\/(generate(-from-file)?|generate_from_text)\/?$/, '');
  }
}

export interface HistoryVideo {
  id: string;
  url: string;
  filename: string;
  createdAt?: string;
  size?: number;
  thumbnail?: string;
}

/** Normalises whatever shape the backend returns into HistoryVideo[]. */
export async function fetchHistory(uid: string, avatarName: string): Promise<HistoryVideo[]> {
  const base = getBackendBase();

  const url = `${base}/history/${encodeURIComponent(avatarName)}?avatar_name=${encodeURIComponent(avatarName)}`;

  const res = await fetch(url , { headers: {'ngrok-skip-browser-warning': 'true'}});
  if (!res.ok) throw new Error(`Backend ${res.status}: ${await res.text().catch(() => '')}`);
  const data = await res.json();

  // ✅ FIX: data.records ab pehle check hoga (backend yahi return karta hai)
  const rawList: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.records)
      ? data.records
      : Array.isArray(data?.videos)
        ? data.videos
        : Array.isArray(data?.history)
          ? data.history
          : Array.isArray(data?.files)
            ? data.files
            : [];

  return rawList.map((item: any, idx: number) => {
    if (typeof item === 'string') {
      const filename = item.split('/').pop() ?? `video-${idx}.mp4`;
      const full = item.startsWith('http') ? item : `${base}${item.startsWith('/') ? '' : '/'}${item}`;
      return { id: filename, url: full, filename };
    }
    const filename: string =
      item.filename ?? item.name ?? item.file ?? item.video_name ?? `video-${idx}.mp4`;
    const rawUrl: string =
      item.url ?? item.video_url ?? item.path ?? item.file_url ?? item.download_url ?? '';
    const fullUrl = rawUrl?.startsWith('http')
      ? rawUrl
      : rawUrl
        ? `${base}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`
        : `${base}/history/${encodeURIComponent(avatarName)}/${encodeURIComponent(avatarName)}/${encodeURIComponent(filename)}`;
    return {
      id: item.id ?? filename,
      url: fullUrl,
      filename,
      createdAt: item.created_at ?? item.createdAt ?? item.timestamp,
      size: item.size ?? item.bytes,
      thumbnail: item.thumbnail ?? item.thumb,
    };
  });
}

/** Attempts a backend delete using the avatarName as the primary identifier. */
export async function tryDeleteVideo(uid: string, avatarName: string, filename: string) {
  const base = getBackendBase();

  const candidates = [
    `${base}/history/${encodeURIComponent(avatarName)}/${encodeURIComponent(filename)}?avatar_name=${encodeURIComponent(avatarName)}`,
    `${base}/history/${encodeURIComponent(avatarName)}?avatar_name=${encodeURIComponent(avatarName)}&filename=${encodeURIComponent(filename)}`,
  ];
  for (const url of candidates) {
    try {
      const res = await fetch(url, { method: 'DELETE' , headers: { 'ngrok-skip-browser-warning': 'true' } });
      if (res.ok) return true;
    } catch {
      /* try next */
    }
  }
  return false;
}