import { Mic, User, Zap, Lock, Sparkles } from 'lucide-react';
import { useStaggerReveal, useScrollReveal } from '@/hooks/use-scroll-reveal';

const features = [
  {
    icon: Mic,
    title: 'Voice Cloning',
    description: 'Upload just 30-60 seconds of audio to create a voice clone that captures your unique speech patterns, tone, and pronunciation.',
    accent: 'primary',
  },
  {
    icon: User,
    title: 'Realistic Avatars',
    description: 'AI-generated faces with natural expressions, accurate lip-sync, and subtle head movements that look genuinely human.',
    accent: 'accent',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Generate videos in minutes with our optimized cloud GPU infrastructure. No waiting hours for results.',
    accent: 'primary',
  },
  {
    icon: Lock,
    title: 'Consent Verified',
    description: 'Every avatar displays a consent badge showing it was created with proper authorization.',
    accent: 'accent',
  },
  {
    icon: Sparkles,
    title: 'High Quality Export',
    description: 'Export in 720p or 1080p resolution. Also available as audio-only MP3 for podcasts.',
    accent: 'primary',
  },
];

const FeaturesSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerReveal(features.length);

  return (
    <section id="features" className="py-12 lg:py-16 bg-muted/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={headingRef}
          className="text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ease-out"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(25px)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-medium mb-4">
            Features
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Everything you need to create AI avatars
          </h2>
          <p className="text-muted-foreground">
            Powerful features designed for creators, educators, and businesses who value quality and ethics.
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative bg-card p-6 rounded-xl border border-border/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 ease-out"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
                ...getDelay(i),
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
