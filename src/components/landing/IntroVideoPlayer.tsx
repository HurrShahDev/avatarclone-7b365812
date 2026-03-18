import { useState, useEffect, useRef, useCallback } from 'react';
import clip1Asset from '@/assets/intro-clip-1.mp4.asset.json';
import clip2Asset from '@/assets/intro-clip-2.mp4.asset.json';
import clip3Asset from '@/assets/intro-clip-3.mp4.asset.json';
import clip4Asset from '@/assets/intro-clip-4.mp4.asset.json';
import clip5Asset from '@/assets/intro-clip-5.mp4.asset.json';
import clip6Asset from '@/assets/intro-clip-6.mp4.asset.json';
import clip7Asset from '@/assets/intro-clip-7.mp4.asset.json';

interface SubtitleSegment {
  text: string;
  highlights: string[];
  clipUrl: string;
}

const segments: SubtitleSegment[] = [
  { text: 'Welcome to AvatarClone.', highlights: [], clipUrl: clip1Asset.url },
  { text: 'A new way to create videos using your own AI avatar.', highlights: ['AI avatar'], clipUrl: clip2Asset.url },
  { text: 'Simply write a script, and watch your avatar bring it to life.', highlights: [], clipUrl: clip3Asset.url },
  { text: 'Clone your face, your voice, and your presence — all powered by AI.', highlights: ['Clone'], clipUrl: clip4Asset.url },
  { text: 'No cameras. No microphones. Just your ideas.', highlights: [], clipUrl: clip5Asset.url },
  { text: 'Create professional, realistic videos in seconds.', highlights: ['Create videos'], clipUrl: clip6Asset.url },
  { text: 'Sign up to get started, or log in to continue your journey.', highlights: [], clipUrl: clip7Asset.url },
];

const HighlightedText = ({ text, highlights }: { text: string; highlights: string[] }) => {
  if (highlights.length === 0) return <>{text}</>;

  let result = text;
  const parts: (string | { highlighted: string })[] = [];
  let remaining = text;

  for (const h of highlights) {
    const idx = remaining.toLowerCase().indexOf(h.toLowerCase());
    if (idx >= 0) {
      if (idx > 0) parts.push(remaining.slice(0, idx));
      parts.push({ highlighted: remaining.slice(idx, idx + h.length) });
      remaining = remaining.slice(idx + h.length);
    }
  }
  if (remaining) parts.push(remaining);

  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          <span key={i}>{p}</span>
        ) : (
          <span key={i} className="text-primary font-bold">{p.highlighted}</span>
        )
      )}
    </>
  );
};

const IntroVideoPlayer = () => {
  const [currentSegment, setCurrentSegment] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  const goToNextSegment = useCallback(() => {
    const next = (currentSegment + 1) % segments.length;

    // Fade out subtitle
    setSubtitleVisible(false);
    setTransitioning(true);

    // Preload next video
    if (nextVideoRef.current) {
      nextVideoRef.current.src = segments[next].clipUrl;
      nextVideoRef.current.load();
    }

    setTimeout(() => {
      setCurrentSegment(next);
      setTransitioning(false);

      // Show subtitle after a brief delay
      setTimeout(() => setSubtitleVisible(true), 300);
    }, 500);
  }, [currentSegment]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = segments[currentSegment].clipUrl;
    video.load();
    video.play().catch(() => {});

    // Show subtitle
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 400);

    const handleEnded = () => goToNextSegment();
    video.addEventListener('ended', handleEnded);

    return () => {
      clearTimeout(subtitleTimer);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentSegment, goToNextSegment]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ border: '1px solid hsl(220 20% 20%)' }}>
      {/* Main video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: transitioning ? 0 : 1 }}
        muted
        playsInline
      />

      {/* Preload next video (hidden) */}
      <video ref={nextVideoRef} className="hidden" muted playsInline preload="auto" />

      {/* Gradient overlay for subtitle readability */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '50%',
          background: 'linear-gradient(to top, hsl(220 25% 5% / 0.85) 0%, hsl(220 25% 5% / 0.4) 50%, transparent 100%)',
        }}
      />

      {/* Subtle top vignette */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(to bottom, hsl(220 25% 5% / 0.3), transparent)',
        }}
      />

      {/* Subtitle */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-6 px-6 pointer-events-none">
        <div
          className="text-center transition-all duration-500 ease-out max-w-lg"
          style={{
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? 'translateY(0)' : 'translateY(12px)',
            filter: subtitleVisible ? 'blur(0)' : 'blur(4px)',
          }}
        >
          <p
            className="text-sm md:text-base lg:text-lg font-medium leading-relaxed"
            style={{
              color: 'hsl(0 0% 95%)',
              textShadow: '0 2px 8px hsl(0 0% 0% / 0.6), 0 0 20px hsl(0 0% 0% / 0.3)',
            }}
          >
            <HighlightedText
              text={segments[currentSegment].text}
              highlights={segments[currentSegment].highlights}
            />
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-1.5 inset-x-0 flex justify-center gap-1.5 pointer-events-none">
        {segments.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === currentSegment ? 16 : 4,
              height: 4,
              background: i === currentSegment ? 'hsl(var(--primary))' : 'hsl(0 0% 100% / 0.3)',
            }}
          />
        ))}
      </div>

      {/* Corner brackets */}
      <svg className="absolute top-3 left-3 w-5 h-5 opacity-20" viewBox="0 0 24 24" fill="none" stroke="hsl(220 60% 60%)" strokeWidth="1.5"><path d="M1 8V1h7" /></svg>
      <svg className="absolute top-3 right-3 w-5 h-5 opacity-20" viewBox="0 0 24 24" fill="none" stroke="hsl(220 60% 60%)" strokeWidth="1.5"><path d="M23 8V1h-7" /></svg>
      <svg className="absolute bottom-8 left-3 w-5 h-5 opacity-20" viewBox="0 0 24 24" fill="none" stroke="hsl(220 60% 60%)" strokeWidth="1.5"><path d="M1 16v7h7" /></svg>
      <svg className="absolute bottom-8 right-3 w-5 h-5 opacity-20" viewBox="0 0 24 24" fill="none" stroke="hsl(220 60% 60%)" strokeWidth="1.5"><path d="M23 16v7h-7" /></svg>
    </div>
  );
};

export default IntroVideoPlayer;
