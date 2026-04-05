import { Mic, User, Zap, Lock, Sparkles } from 'lucide-react';
import { useStaggerReveal, useScrollReveal } from '@/hooks/use-scroll-reveal';

const features = [
  {
    icon: Mic,
    title: 'Voice Cloning',
    description: 'Upload 30–60 seconds of audio to clone your unique voice, tone, and pronunciation.',
    color: '#4F46E5',
    bg: '#EEF2FF',
  },
  {
    icon: User,
    title: 'Realistic Avatars',
    description: 'AI-generated faces with natural lip-sync, expressions, and subtle head movement.',
    color: '#7C3AED',
    bg: '#F3E8FF',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Generate videos in minutes with optimized cloud GPU infrastructure.',
    color: '#0891B2',
    bg: '#ECFEFF',
  },
  {
    icon: Lock,
    title: 'Consent Verified',
    description: 'Every avatar displays a consent badge showing proper authorization.',
    color: '#1D4ED8',
    bg: '#DBEAFE',
  },
  {
    icon: Sparkles,
    title: 'High Quality Export',
    description: 'Export in 720p or 1080p. Also available as audio-only MP3 for podcasts.',
    color: '#DB2777',
    bg: '#FCE7F3',
  },
];

const FeaturesSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerReveal(features.length);

  return (
    <section id="features" className="py-20 lg:py-28 relative" aria-label="Platform features" style={{ background: '#F8FAFC' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={headingRef}
          className="text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-sm font-semibold mb-3 tracking-wide uppercase" style={{ color: '#4F46E5' }}>Features</p>
          <h2 className="text-2xl lg:text-4xl font-bold mb-4" style={{ color: '#0F172A' }}>
            Everything you need for AI avatars
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            Powerful tools for creators, educators, and businesses who value quality.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-6xl mx-auto" role="list">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              role="listitem"
              className="group p-6 rounded-2xl will-change-transform transition-all duration-300 ease-out card-hover"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(20px)',
                background: '#FFFFFF',
                border: '1px solid #F1F5F9',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                ...getDelay(i),
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: feature.bg }}
              >
                <feature.icon className="w-5 h-5" style={{ color: feature.color }} aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
