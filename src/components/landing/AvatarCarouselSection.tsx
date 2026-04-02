import { useState, useEffect, useRef, useCallback } from 'react';
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
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const avatars = [
  { img: avatar1img, vid: avatar1vid, name: 'Sarah' },
  { img: avatar2img, vid: avatar2vid, name: 'Marcus' },
  { img: avatar3img, vid: avatar3vid, name: 'James' },
  { img: avatar4img, vid: avatar4vid, name: 'Elena' },
  { img: avatar5img, vid: avatar5vid, name: 'Priya' },
  { img: avatar6img, vid: avatar6vid, name: 'Olivia' },
];

const loopAvatars = [...avatars, ...avatars];

const AvatarCard = ({ avatar }: { avatar: typeof avatars[0] }) => {
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
      className="flex-shrink-0 w-[220px] sm:w-[250px] lg:w-[270px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="group"
      aria-label={`${avatar.name} AI avatar preview`}
    >
      <div
        className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
          hovered ? 'scale-[1.03] shadow-lg' : 'shadow-sm'
        }`}
      >
        <div className="relative w-full aspect-[3/4]">
          <img
            src={avatar.img}
            alt={`${avatar.name} AI avatar`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              hovered ? 'opacity-0' : 'opacity-100'
            }`}
            draggable={false}
            loading="lazy"
          />
          <video
            ref={videoRef}
            src={avatar.vid}
            loop
            muted
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          />

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/70 to-transparent p-4 pt-10">
            <span className="text-sm font-medium text-primary-foreground">{avatar.name}</span>
          </div>

          {hovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent flex flex-col items-center justify-end pb-4 animate-fade-in pointer-events-none">
              <div className="flex items-end gap-[3px] h-5 mb-1" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-primary-foreground/80"
                    style={{
                      height: `${6 + Math.sin(i * 0.9) * 6 + 4}px`,
                      animation: `waveformBar 0.45s ease-in-out ${i * 0.06}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-medium text-primary-foreground/80 tracking-wider uppercase">
                Speaking…
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
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();

  // Use reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const animate = useCallback(() => {
    const el = scrollRef.current;
    if (!el || prefersReducedMotion.current) return;

    if (!isPaused.current) {
      scrollPos.current += 0.5;
      const halfWidth = el.scrollWidth / 2;
      if (scrollPos.current >= halfWidth) {
        scrollPos.current = 0;
      }
      el.scrollLeft = scrollPos.current;
    }
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  return (
    <section className="section-padding overflow-hidden" aria-label="AI Avatar gallery">
      <div className="container mx-auto px-4 lg:px-8 mb-10">
        <div
          ref={headingRef}
          className="text-center max-w-xl mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-sm text-primary font-semibold mb-3 tracking-wide uppercase">Sample Preview</p>
          <h2 className="section-heading">
            Your AI Avatar in Action
          </h2>
          <p className="section-subtext">
            View sample videos showcasing how your real avatar can deliver messages naturally. These examples highlight the style and output your personalized video can achieve.
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-hidden cursor-grab px-4"
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
        role="region"
        aria-label="Scrolling avatar carousel"
      >
        {loopAvatars.map((avatar, index) => (
          <AvatarCard
            key={`${avatar.name}-${index}`}
            avatar={avatar}
          />
        ))}
      </div>
    </section>
  );
};

export default AvatarCarouselSection;
