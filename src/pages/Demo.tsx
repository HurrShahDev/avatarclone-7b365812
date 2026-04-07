import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const Demo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgMusicRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    const music = bgMusicRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      if (music) {
        music.volume = 0.15;
        music.play().catch(() => {});
      }
      setIsPlaying(true);
    } else {
      video.pause();
      if (music) music.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.muted = !isMuted;
    }
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 50%, #E0E7FF 100%)' }}>
      <Header />
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold mb-2 tracking-wide uppercase" style={{ color: '#4F46E5' }}>
              Product Demo
            </p>
            <h1 className="text-3xl lg:text-5xl font-bold mb-3" style={{ color: '#0F172A' }}>
              See AvatarClone in Action
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Watch how you can create professional AI avatar videos in minutes — no camera, no studio, no editing required.
            </p>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group mx-auto"
            onClick={togglePlay}
            style={{
              boxShadow: '0 8px 60px rgba(99, 102, 241, 0.15), 0 2px 20px rgba(0,0,0,0.08)',
              border: '1px solid #C7D2FE',
            }}
          >
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              src="/demo-video.mp4"
              playsInline
              loop
              preload="metadata"
              onEnded={() => setIsPlaying(false)}
            />

            {/* Play overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: isPlaying ? 0 : 1, pointerEvents: isPlaying ? 'none' : 'auto', background: 'rgba(0,0,0,0.15)' }}
            >
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-300">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>

            {/* Controls */}
            {isPlaying && (
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <Pause className="w-4 h-4 text-gray-800" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-gray-800" /> : <Volume2 className="w-4 h-4 text-gray-800" />}
                </button>
              </div>
            )}
          </div>

          {/* Background music - ambient soft music URL */}
          <audio ref={bgMusicRef} loop preload="auto">
            <source src="https://cdn.pixabay.com/audio/2024/11/29/audio_d26b821233.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
