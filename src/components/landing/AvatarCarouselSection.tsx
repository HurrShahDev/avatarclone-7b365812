import { useState, useEffect, useRef } from 'react';
import avatar1img from '@/assets/carousel-avatar-1.jpg';
import avatar2img from '@/assets/carousel-avatar-2.jpg';
import avatar3img from '@/assets/carousel-avatar-3.jpg';
import avatar4img from '@/assets/carousel-avatar-4.jpg';
import avatar5img from '@/assets/carousel-avatar-5.jpg';
import avatar6img from '@/assets/carousel-avatar-6.jpg';
import avatar1vid from '@/assets/carousel-avatar-1.mp4';
import avatar2vid from '@/assets/carousel-avatar-2.mp4';
import avatar3vid from '@/assets/carousel-avatar-3.mp4';
import avatar4vid from '@/assets/carousel-avatar-4.mp4';
import avatar5vid from '@/assets/carousel-avatar-5.mp4';
import avatar6vid from '@/assets/carousel-avatar-6.mp4';

const avatars = [
  { img: avatar1img, vid: avatar1vid, name: 'Sarah' },
  { img: avatar2img, vid: avatar2vid, name: 'Marcus' },
  { img: avatar3img, vid: avatar3vid, name: 'James' },
  { img: avatar4img, vid: avatar4vid, name: 'Elena' },
  { img: avatar5img, vid: avatar5vid, name: 'Priya' },
  { img: avatar6img, vid: avatar6vid, name: 'Olivia' },
];

// Duplicate for seamless loop
const loopAvatars = [...avatars, ...avatars];

interface AvatarCardProps {
  avatar: typeof avatars[0];
  cardKey: string;
}

const AvatarCard = ({ avatar, cardKey }: AvatarCardProps) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (hovered) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [hovered]);

  return (
    <div
      className="flex-shrink-0 w-[220px] sm:w-[260px] lg:w-[280px] relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
          hovered
            ? 'scale-105 shadow-xl shadow-primary/20 ring-2 ring-primary/40'
            : 'scale-100'
        }`}
      >
        {/* Container that maintains aspect ratio */}
        <div className="relative w-full aspect-[3/4]">
          {/* Static image */}
          <img
            src={avatar.img}
            alt={`${avatar.name} AI avatar`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              hovered ? 'opacity-0' : 'opacity-100'
            }`}
            draggable={false}
          />

          {/* Video on hover — real face movement */}
          <video
            ref={videoRef}
            src={avatar.vid}
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Name + waveform overlay when speaking */}
          {hovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex flex-col items-center justify-end pb-4 animate-fade-in pointer-events-none">
              <div className="flex items-end gap-[3px] h-6 mb-1.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-primary"
                    style={{
                      height: `${6 + Math.sin(i * 0.9) * 8 + 6}px`,
                      animation: `waveformBar 0.45s ease-in-out ${i * 0.06}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-semibold text-primary-foreground/90 tracking-widest uppercase">
                AI Speaking…
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AvatarCarouselSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const scrollPos = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.5;

    const animate = () => {
      if (!isPaused.current && el) {
        scrollPos.current += speed;
        const halfWidth = el.scrollWidth / 2;
        if (scrollPos.current >= halfWidth) {
          scrollPos.current = 0;
        }
        el.scrollLeft = scrollPos.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <section className="pt-16 lg:pt-24 pb-6 bg-accent/20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Meet Our AI Avatars
          </h2>
          <p className="text-muted-foreground">
            Hover over any avatar to see them come to life. These AI-generated personas can speak any script you write.
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-hidden cursor-grab px-4"
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
      >
        {loopAvatars.map((avatar, index) => (
          <AvatarCard
            key={`${avatar.name}-${index}`}
            avatar={avatar}
            cardKey={`${avatar.name}-${index}`}
          />
        ))}
      </div>
    </section>
  );
};

export default AvatarCarouselSection;
