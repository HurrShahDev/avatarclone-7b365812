import { Link } from 'react-router-dom';
import { Check, ArrowRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';

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
    <section className="py-16 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Text Content - Left Side */}
          <div className="flex-1 order-1 lg:order-1">
            <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight">
              Professional AI Avatar & Voice Clone
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Create your highly realistic AI avatar using our personalized generative cloning system. Perfect for presentations, content creation, and interactive applications. Fast, multilingual, and designed to replicate your digital persona seamlessly.
            </p>

            {/* Benefits */}
            <div className="space-y-5 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
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
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/create">
                Build Your Avatar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Demo Video - Right Side */}
          <div className="flex-1 w-full order-2 lg:order-2">
            <div
              className="relative aspect-video bg-muted rounded-2xl shadow-xl overflow-hidden cursor-pointer group"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src="/demo-video.mp4"
                playsInline
                loop
                onEnded={() => setIsPlaying(false)}
              />
              {/* Play/Pause overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: isPlaying ? 0 : 1 }}
              >
                <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center hover:bg-primary transition-colors shadow-lg">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
              </div>
              {!isPlaying && (
                <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium">
                  Watch Demo
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
