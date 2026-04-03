import { Mic, User, Zap, Lock, Sparkles } from 'lucide-react';
import { useStaggerReveal, useScrollReveal } from '@/hooks/use-scroll-reveal';

const features = [
  {
    icon: Mic,
    title: 'Voice Cloning',
    description: 'Upload 30–60 seconds of audio to clone your unique voice, tone, and pronunciation.',
    gradient: 'linear-gradient(135deg, #6366F1, #818CF8)',
  },
  {
    icon: User,
    title: 'Realistic Avatars',
    description: 'AI-generated faces with natural lip-sync, expressions, and subtle head movement.',
    gradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Generate videos in minutes with optimized cloud GPU infrastructure.',
    gradient: 'linear-gradient(135deg, #06B6D4, #22D3EE)',
  },
  {
    icon: Lock,
    title: 'Consent Verified',
    description: 'Every avatar displays a consent badge showing proper authorization.',
    gradient: 'linear-gradient(135deg, #1D4ED8, #3B82F6)',
  },
  {
    icon: Sparkles,
    title: 'High Quality Export',
    description: 'Export in 720p or 1080p. Also available as audio-only MP3 for podcasts.',
    gradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
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
          <p className="text-sm font-semibold mb-3 tracking-wide uppercase" style={{ color: '#6366F1' }}>Features</p>
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
              className="group p-6 rounded-xl will-change-transform transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(20px)',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                ...getDelay(i),
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: feature.gradient }}
              >
                <feature.icon className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#111827' }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
