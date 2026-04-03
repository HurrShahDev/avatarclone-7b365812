import { Link } from 'react-router-dom';
import { Check, ArrowRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { useScrollReveal, useStaggerReveal } from '@/hooks/use-scroll-reveal';

const benefits = [
  {
    title: 'Clone your face and voice with precision',
    description: 'Submit a photo and voice sample — your avatar mirrors your expressions and speech.',
  },
  {
    title: 'Replace on-camera appearances',
    description: 'Use AI avatars for presentations, demos, and content — no filming needed.',
  },
  {
    title: 'Zero production cost',
    description: 'Professional avatar videos without studios, equipment, or editing software.',
  },
];

const PromoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref: textRef, isVisible: textVisible } = useScrollReveal();
  const { ref: videoWrapRef, isVisible: videoVisible } = useScrollReveal();
  const { ref: benefitsRef, isVisible: benefitsVisible, getDelay } = useStaggerReveal(benefits.length);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePlay();
    }
  };

  return (
    <section id="demo-section" className="section-padding relative overflow-hidden" aria-label="Product demo">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
          <div className="flex-1 order-1">
            <div
              ref={textRef}
              className="transition-all duration-700 ease-out"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(24px)',
              }}
            >
              <p className="text-sm font-semibold mb-3 tracking-wide uppercase" style={{ color: '#6366F1' }}>
                See It in Action
              </p>
              <h2 className="section-heading text-2xl lg:text-3xl">
                Professional AI Avatar & Voice Clone
              </h2>
              <p className="section-subtext mb-8 max-w-lg">
                Create highly realistic AI avatars using our personalized cloning system. Perfect for presentations, content, and demos.
              </p>
            </div>

            <div ref={benefitsRef} className="space-y-5 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex gap-4 transition-all duration-500 ease-out"
                  style={{
                    opacity: benefitsVisible ? 1 : 0,
                    transform: benefitsVisible ? 'translateX(0)' : 'translateX(-16px)',
                    ...getDelay(index),
                  }}
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-0.5 text-base">
                      {benefit.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: textVisible ? 1 : 0,
                transitionDelay: '500ms',
              }}
            >
              <Button asChild size="lg" className="group shadow-md shadow-primary/15">
                <Link to="/create">
                  Build Your Avatar
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Demo Video */}
          <div className="flex-1 w-full order-2">
            <div
              ref={videoWrapRef}
              className="transition-all duration-700 ease-out"
              style={{
                opacity: videoVisible ? 1 : 0,
                transform: videoVisible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
                transitionDelay: '200ms',
              }}
            >
              <div
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border border-border shadow-lg"
                onClick={togglePlay}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-label={isPlaying ? 'Pause demo video' : 'Play demo video'}
              >
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/demo-video.mp4"
                  playsInline
                  loop
                  preload="metadata"
                  onEnded={() => setIsPlaying(false)}
                  aria-label="AvatarClone product demo video"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-foreground/5"
                  style={{ opacity: isPlaying ? 0 : 1, pointerEvents: isPlaying ? 'none' : 'auto' }}
                  aria-hidden="true"
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-all duration-300 shadow-lg">
                    <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                  </div>
                </div>
                {isPlaying && (
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Pause className="w-4 h-4 text-foreground" />
                    </div>
                  </div>
                )}
                {!isPlaying && (
                  <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium border border-border">
                    Watch Demo
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
