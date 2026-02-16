import { useState, useEffect } from 'react';
import heroAvatar1 from '@/assets/hero-avatar-1.jpg';
import heroAvatar2 from '@/assets/hero-avatar-2.jpg';
import heroAvatar3 from '@/assets/hero-avatar-3.jpg';
import heroAvatar4 from '@/assets/hero-avatar-4.jpg';

const avatars = [
  { src: heroAvatar1, name: 'Sarah Chen', role: 'Marketing Lead' },
  { src: heroAvatar2, name: 'James Miller', role: 'Sales Director' },
  { src: heroAvatar3, name: 'Maria Lopez', role: 'CEO' },
  { src: heroAvatar4, name: 'David Kim', role: 'Product Manager' },
];

const HeroAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % avatars.length);
        setIsTransitioning(false);
      }, 600);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const avatar = avatars[activeIndex];

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] select-none">
      {/* Outer glow */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, hsla(210, 100%, 55%, 0.25), hsla(270, 80%, 50%, 0.15), transparent 70%)',
        }}
      />

      {/* Main container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/40 shadow-2xl">
        {/* Avatar image */}
        <img
          src={avatar.src}
          alt={avatar.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-600"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        />

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

        {/* Holographic scan line */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, hsla(210, 100%, 60%, 0.5), transparent)',
            animation: 'scanLine 3s ease-in-out infinite',
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(hsla(210, 100%, 70%, 1) 1px, transparent 1px), linear-gradient(90deg, hsla(210, 100%, 70%, 1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Corner brackets */}
        <svg className="absolute top-3 left-3 w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="none" stroke="hsla(210, 100%, 65%, 0.8)" strokeWidth="1.5">
          <path d="M2 8V2h6M2 16v6h6" />
        </svg>
        <svg className="absolute top-3 right-3 w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="none" stroke="hsla(210, 100%, 65%, 0.8)" strokeWidth="1.5">
          <path d="M22 8V2h-6M22 16v6h-6" />
        </svg>
        <svg className="absolute bottom-14 left-3 w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="none" stroke="hsla(270, 80%, 65%, 0.8)" strokeWidth="1.5">
          <path d="M2 8V2h6M2 16v6h6" />
        </svg>
        <svg className="absolute bottom-14 right-3 w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="none" stroke="hsla(270, 80%, 65%, 0.8)" strokeWidth="1.5">
          <path d="M22 8V2h-6M22 16v6h-6" />
        </svg>

        {/* Waveform overlay at bottom */}
        <div className="absolute bottom-12 left-4 right-4 flex items-end gap-[2px] h-6 opacity-60">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-full"
              style={{
                height: `${20 + Math.sin(i * 0.5 + Date.now() * 0.001) * 60}%`,
                background: `linear-gradient(to top, hsla(210, 100%, 60%, 0.7), hsla(270, 80%, 60%, 0.5))`,
                animation: `waveBar 1.5s ease-in-out ${i * 0.05}s infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* Avatar info bar */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, hsla(220, 30%, 8%, 0.95), transparent)',
            opacity: isTransitioning ? 0 : 1,
          }}
        >
          <div>
            <p className="text-sm font-medium" style={{ color: 'hsla(0, 0%, 95%, 0.9)' }}>
              {avatar.name}
            </p>
            <p className="text-xs" style={{ color: 'hsla(210, 100%, 70%, 0.7)' }}>
              {avatar.role}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: 'hsla(140, 70%, 50%, 0.9)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            <span className="text-xs" style={{ color: 'hsla(140, 70%, 60%, 0.8)' }}>
              AI Speaking
            </span>
          </div>
        </div>

        {/* Top HUD label */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium"
          style={{
            background: 'hsla(220, 30%, 10%, 0.7)',
            color: 'hsla(210, 100%, 70%, 0.8)',
            border: '1px solid hsla(210, 100%, 60%, 0.15)',
            backdropFilter: 'blur(8px)',
          }}
        >
          AI Avatar Preview
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5 pb-1">
          {avatars.map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i === activeIndex
                    ? 'hsla(210, 100%, 65%, 0.9)'
                    : 'hsla(0, 0%, 100%, 0.25)',
                transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating side elements */}
      <div
        className="absolute -right-3 top-1/4 px-2 py-1 rounded text-[9px] font-mono opacity-50"
        style={{
          color: 'hsla(210, 100%, 70%, 0.7)',
          border: '1px solid hsla(210, 100%, 60%, 0.15)',
          background: 'hsla(220, 30%, 10%, 0.5)',
          animation: 'float 4s ease-in-out infinite',
        }}
      >
        VOICE: 94%
      </div>
      <div
        className="absolute -left-3 top-1/3 px-2 py-1 rounded text-[9px] font-mono opacity-50"
        style={{
          color: 'hsla(270, 80%, 70%, 0.7)',
          border: '1px solid hsla(270, 80%, 60%, 0.15)',
          background: 'hsla(220, 30%, 10%, 0.5)',
          animation: 'float 5s ease-in-out 1s infinite',
        }}
      >
        LIP SYNC
      </div>
      <div
        className="absolute -right-2 bottom-1/3 px-2 py-1 rounded text-[9px] font-mono opacity-50"
        style={{
          color: 'hsla(160, 60%, 55%, 0.7)',
          border: '1px solid hsla(160, 60%, 50%, 0.15)',
          background: 'hsla(220, 30%, 10%, 0.5)',
          animation: 'float 4.5s ease-in-out 0.5s infinite',
        }}
      >
        VERIFIED ✓
      </div>
    </div>
  );
};

export default HeroAnimation;
