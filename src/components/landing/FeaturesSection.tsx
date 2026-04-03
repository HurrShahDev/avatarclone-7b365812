import { Mic, User, Zap, Lock, Sparkles } from 'lucide-react';
import { useStaggerReveal, useScrollReveal } from '@/hooks/use-scroll-reveal';

const features = [
  {
    icon: Mic,
    title: 'Voice Cloning',
    description: 'Upload 30–60 seconds of audio to clone your unique voice, tone, and pronunciation.',
  },
  {
    icon: User,
    title: 'Realistic Avatars',
    description: 'AI-generated faces with natural lip-sync, expressions, and subtle head movement.',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Generate videos in minutes with optimized cloud GPU infrastructure.',
  },
  {
    icon: Lock,
    title: 'Consent Verified',
    description: 'Every avatar displays a consent badge showing proper authorization.',
  },
  {
    icon: Sparkles,
    title: 'High Quality Export',
    description: 'Export in 720p or 1080p. Also available as audio-only MP3 for podcasts.',
  },
];

const FeaturesSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerReveal(features.length);

  return (
    <section id="features" className="section-padding relative" aria-label="Platform features">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={headingRef}
          className="text-center max-w-xl mx-auto mb-14 transition-all duration-700 ease-out"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-sm text-primary font-semibold mb-3 tracking-wide uppercase">Features</p>
          <h2 className="section-heading">
            Everything you need for AI avatars
          </h2>
          <p className="section-subtext">
            Powerful tools for creators, educators, and businesses who value quality.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" role="list">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              role="listitem"
              className="group bg-card p-6 rounded-xl border border-border hover:border-primary/20 hover:shadow-md will-change-transform transition-all duration-300 ease-out"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(20px)',
                ...getDelay(i),
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
