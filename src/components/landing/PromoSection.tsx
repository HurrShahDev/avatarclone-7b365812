import { Link } from 'react-router-dom';
import { Check, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { useScrollReveal, useStaggerReveal } from '@/hooks/use-scroll-reveal';

const benefits = [
  {
    title: 'Replicate human image and clone voice 1:1',
    description: 'Submit an image and voice sample, and your avatar mirrors your facial expressions and cloned voice.',
  },
  {
    title: 'Substitute for humans on camera',
    description: 'Use your avatar videos for presentations or demos, eliminating the need for on-camera presence.',
  },
  {
    title: 'Zero production cost',
    description: 'Professional-level avatar creation without studios or equipment.',
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

  return (
    <section id="demo-section" className="py-12 lg:py-16 bg-muted/20 relative overflow-hidden">
      {/* Subtle decorative accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-7xl mx-auto">
          {/* Text Content - Left Side */}
          <div className="flex-1 order-1 lg:order-1">
            <div
              ref={textRef}
              className="transition-all duration-700 ease-out"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-medium mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Watch How It Works
              </div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight">
                Professional AI Avatar & Voice Clone
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Create your highly realistic AI avatar using our personalized generative cloning system. Perfect for presentations, content creation, and interactive applications.
              </p>
            </div>

            {/* Benefits with stagger */}
            <div ref={benefitsRef} className="space-y-5 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex gap-4 transition-all duration-500 ease-out"
                  style={{
                    opacity: benefitsVisible ? 1 : 0,
                    transform: benefitsVisible ? 'translateX(0)' : 'translateX(-20px)',
                    ...getDelay(index),
                  }}
                >
                  <div className="flex-shrink-0 w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 border border-primary/20">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(15px)',
                transitionDelay: '500ms',
              }}
            >
              <Button asChild size="lg" className="text-base px-8 group">
                <Link to="/create">
                  Build Your Avatar
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Demo Video - Right Side */}
          <div className="flex-1 w-full order-2 lg:order-2">
            <div
              ref={videoWrapRef}
              className="transition-all duration-700 ease-out"
              style={{
                opacity: videoVisible ? 1 : 0,
                transform: videoVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
                transitionDelay: '200ms',
              }}
            >
              <div
                className="relative aspect-video rounded-2xl shadow-xl overflow-hidden cursor-pointer group border border-border/50"
                onClick={togglePlay}
                style={{
                  boxShadow: isPlaying
                    ? '0 25px 50px -12px hsla(220, 60%, 45%, 0.15)'
                    : '0 20px 40px -12px hsla(0, 0%, 0%, 0.1)',
                }}
              >
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/demo-video.mp4"
                  playsInline
                  loop
                  onEnded={() => setIsPlaying(false)}
                />
                {/* Play overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all duration-500 bg-foreground/5"
                  style={{ opacity: isPlaying ? 0 : 1, pointerEvents: isPlaying ? 'none' : 'auto' }}
                >
                  <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-primary/30 hover:shadow-xl">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                </div>
                {!isPlaying && (
                  <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium border border-border/50">
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
