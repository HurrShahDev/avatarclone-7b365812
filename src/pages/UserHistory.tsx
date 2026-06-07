import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Folder, Film, Download, Trash2, Loader2, AlertTriangle,
  Sparkles, Play, RefreshCw, FolderOpen, Calendar, Search,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import {
  getTrackedAvatars, removeAvatar, fetchHistory, tryDeleteVideo,
  getHiddenVideos, hideVideo, type HistoryVideo,
} from '@/lib/historyTracker';
import { toast } from 'sonner';

const UserHistory = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [videos, setVideos] = useState<HistoryVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) setAvatars(getTrackedAvatars(user.uid));
  }, [user]);

  const loadVideos = async (name: string) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const list = await fetchHistory(user.uid, name);
      const hidden = new Set(getHiddenVideos(user.uid, name));
      setVideos(list.filter((v) => !hidden.has(v.id)));
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load history');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const openFolder = (name: string) => {
    setSelected(name);
    loadVideos(name);
  };

  const handleDownload = async (v: HistoryVideo) => {
    try {
      const res = await fetch(v.url, { mode: 'cors' });
      const blob = await res.blob();
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url; a.download = v.filename;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success('Download started');
    } catch {
      window.open(v.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDelete = async (v: HistoryVideo) => {
    if (!user || !selected) return;
    if (!confirm(`Delete "${v.filename}" from history?`)) return;
    await tryDeleteVideo(user.uid, selected, v.filename);
    hideVideo(user.uid, selected, v.id);
    setVideos((prev) => prev.filter((x) => x.id !== v.id));
    toast.success('Removed from history');
  };

  const handleDeleteFolder = (name: string) => {
    if (!user) return;
    if (!confirm(`Remove "${name}" folder from your history list? Videos on the server remain untouched.`)) return;
    removeAvatar(user.uid, name);
    setAvatars(getTrackedAvatars(user.uid));
    if (selected === name) { setSelected(null); setVideos([]); }
  };

  const filteredAvatars = useMemo(
    () => avatars.filter((a) => a.toLowerCase().includes(query.toLowerCase())),
    [avatars, query],
  );

  const userName = user?.displayName || user?.email?.split('@')[0] || 'Guest';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/30">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {/* Page header */}
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Your Creations
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  {userName}'s Video History
                </h1>
                <p className="text-slate-500 mt-2 text-sm md:text-base">
                  All the avatars you've cloned and the videos you've generated.
                </p>
              </div>
              <Link to="/create">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200">
                  <Sparkles className="w-4 h-4 mr-1.5" /> Create new avatar
                </Button>
              </Link>
            </div>
          </div>

          {!selected ? (
            <FolderView
              avatars={filteredAvatars}
              query={query}
              setQuery={setQuery}
              onOpen={openFolder}
              onDelete={handleDeleteFolder}
            />
          ) : (
            <VideoView
              avatarName={selected}
              videos={videos}
              loading={loading}
              error={error}
              onBack={() => { setSelected(null); setVideos([]); setError(null); }}
              onRefresh={() => loadVideos(selected)}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
};

/* ─────────── Folder grid ─────────── */
const FolderView = ({
  avatars, query, setQuery, onOpen, onDelete,
}: {
  avatars: string[];
  query: string;
  setQuery: (s: string) => void;
  onOpen: (name: string) => void;
  onDelete: (name: string) => void;
}) => {
  if (avatars.length === 0 && !query) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 backdrop-blur-sm p-12 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
          <FolderOpen className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">No avatars yet</h3>
        <p className="text-slate-500 text-sm mb-5">
          Create your first AI avatar and your generated videos will appear here.
        </p>
        <Link to="/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Sparkles className="w-4 h-4 mr-1.5" /> Create Avatar
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="relative mb-6 max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search avatars..."
          className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-white/80 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        />
      </div>

      {avatars.length === 0 ? (
        <p className="text-sm text-slate-500">No avatars match "{query}".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {avatars.map((name, i) => (
            <button
              key={name}
              onClick={() => onOpen(name)}
              className="group relative text-left rounded-2xl bg-white border border-slate-200/70 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 overflow-hidden"
              style={{ animation: `fade-in 0.4s ease-out ${i * 60}ms both` }}
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)'
                }} />
                <Folder className="w-16 h-16 text-white drop-shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <div className="p-4 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                    {name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Click to open videos</p>
                </div>
                <span
                  onClick={(e) => { e.stopPropagation(); onDelete(name); }}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove folder from list"
                >
                  <Trash2 className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

/* ─────────── Video list ─────────── */
const VideoView = ({
  avatarName, videos, loading, error, onBack, onRefresh, onDownload, onDelete,
}: {
  avatarName: string;
  videos: HistoryVideo[];
  loading: boolean;
  error: string | null;
  onBack: () => void;
  onRefresh: () => void;
  onDownload: (v: HistoryVideo) => void;
  onDelete: (v: HistoryVideo) => void;
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-white border border-slate-200 text-slate-600"
            title="Back to folders"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            <p className="text-xs text-slate-500">Avatar</p>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 truncate">{avatarName}</h2>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </Button>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 mx-auto animate-spin text-indigo-500 mb-3" />
          <p className="text-sm text-slate-500">Loading your videos…</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-6 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="font-medium text-red-900">Couldn't load videos</p>
            <p className="text-sm text-red-700 break-words mt-1">{error}</p>
            <p className="text-xs text-red-600/80 mt-2">
              Make sure the backend is running at the URL set in <code>VITE_BACKEND_API_URL</code>.
            </p>
          </div>
        </div>
      ) : videos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center">
          <Film className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="font-semibold text-slate-900 mb-1">No videos found</h3>
          <p className="text-sm text-slate-500">
            This avatar doesn't have any generated videos yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {videos.map((v, i) => (
            <div
              key={v.id}
              className="rounded-2xl bg-white border border-slate-200/70 overflow-hidden hover:shadow-xl hover:shadow-indigo-100 hover:border-indigo-200 transition-all duration-300 flex flex-col"
              style={{ animation: `fade-in 0.4s ease-out ${i * 60}ms both` }}
            >
              <div className="aspect-video bg-slate-900 relative group">
                <video
                  src={v.url}
                  controls
                  preload="metadata"
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-medium text-slate-900 truncate text-sm" title={v.filename}>
                  {v.filename}
                </h4>
                {v.createdAt && (
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(v.createdAt).toLocaleString()}
                  </p>
                )}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => onDownload(v)}
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> Download
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(v)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHistory;
