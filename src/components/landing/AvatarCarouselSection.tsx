import { useState, useEffect, useRef } from 'react';
import avatar1 from '@/assets/carousel-avatar-1.jpg';
import avatar2 from '@/assets/carousel-avatar-2.jpg';
import avatar3 from '@/assets/carousel-avatar-3.jpg';
import avatar4 from '@/assets/carousel-avatar-4.jpg';
import avatar5 from '@/assets/carousel-avatar-5.jpg';
import avatar6 from '@/assets/carousel-avatar-6.jpg';

const avatars = [
  { src: avatar1, name: 'Sarah' },
  { src: avatar2, name: 'Marcus' },
  { src: avatar3, name: 'James' },
  { src: avatar4, name: 'Elena' },
  { src: avatar5, name: 'Priya' },
  { src: avatar6, name: 'Olivia' },
];

// Duplicate for seamless loop
const loopAvatars = [...avatars, ...avatars];

const SpeakingOverlay = () => (
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col items-center justify-end pb-4 animate-fade-in">
    {/* Waveform bars */}
    <div className="flex items-end gap-[3px] h-8 mb-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-primary"
          style={{
            animation: `waveformBar 0.6s ease-in-out ${i * 0.05}s infinite alternate`,
            height: `${8 + Math.random() * 20}px`,
          }}
        />
      ))}
    </div>
    <span className="text-xs font-medium text-primary-foreground/90 tracking-wider uppercase">
      AI Speaking…
    </span>
  </div>
);

const AvatarCarouselSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const scrollPos = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.5; // px per frame

    const animate = () => {
      if (!isPaused.current && el) {
        scrollPos.current += speed;
        // Reset when we've scrolled through the first set
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
    <section className="py-16 lg:py-24 bg-accent/20 overflow-hidden">
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
        onMouseLeave={() => { isPaused.current = false; setHoveredIndex(null); }}
      >
        {loopAvatars.map((avatar, index) => (
          <div
            key={`${avatar.name}-${index}`}
            className="flex-shrink-0 w-[220px] sm:w-[260px] lg:w-[280px] relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                hoveredIndex === index
                  ? 'scale-105 shadow-xl shadow-primary/20 ring-2 ring-primary/40'
                  : 'scale-100'
              }`}
            >
              <img
                src={avatar.src}
                alt={`${avatar.name} AI avatar`}
                className="w-full aspect-[3/4] object-cover"
                draggable={false}
              />

              {hoveredIndex === index && <SpeakingOverlay />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvatarCarouselSection;
