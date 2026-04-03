import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, UserCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroAnimation from './HeroAnimation';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const HeroSection = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal({ threshold: 0.1, immediate: true });
  const { ref: animRef, isVisible: animVisible } = useScrollReveal({ threshold: 0.1, immediate: true });

  const scrollToDemo = () => {
    const el = document.getElementById('demo-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative section-padding overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            ref={textRef}
            className="text-left transition-all duration-700 ease-out"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            {/* Pill badge like SmartML */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-medium transition-all duration-500"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid #C7D2FE',
                color: '#4F46E5',
                opacity: textVisible ? 1 : 0,
                transitionDelay: '100ms',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              AvatarClone • AI-Powered Avatar Generator
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-5 transition-all duration-700"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: '200ms',
              }}
            >
              <span style={{ color: '#111827' }}>Create Realistic </span>
              <span
                style={{
                  background: 'linear-gradient(90deg, #1D4ED8, #6366F1, #A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI Avatar
              </span>
              <br />
              <span style={{ color: '#111827' }}>Videos</span>
            </h1>

            <p
              className="text-lg mb-8 max-w-lg leading-relaxed transition-all duration-700"
              style={{
                color: '#334155',
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: '350ms',
              }}
            >
              Upload a headshot and voice sample — generate professional talking avatar videos in minutes. No camera needed.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 mb-10 transition-all duration-700"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: '450ms',
              }}
            >
              {/* Primary CTA with gradient border-bottom like SmartML */}
              <Button
                asChild
                size="lg"
                className="group min-h-[44px] relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35), 0 2px 0 0 #06B6D4',
                }}
              >
                <Link to="/auth?mode=signup">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToDemo}
                className="group min-h-[44px]"
                style={{ borderColor: '#C7D2FE', color: '#1E293B' }}
                aria-label="Watch product demo video"
              >
                <Play className="w-4 h-4" aria-hidden="true" />
                Watch Demo
              </Button>
            </div>

            <div
              className="flex flex-wrap items-center gap-6 text-sm transition-all duration-700"
              style={{
                color: '#6B7280',
                opacity: textVisible ? 1 : 0,
                transitionDelay: '550ms',
              }}
              role="list"
              aria-label="Security features"
            >
              {[
                { icon: Shield, label: 'Secure storage' },
                { icon: UserCheck, label: 'Consent required' },
                { icon: Lock, label: 'Privacy focused' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5" role="listitem">
                  <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={animRef}
            className="relative flex items-center justify-center lg:justify-end transition-all duration-1000 ease-out"
            style={{
              opacity: animVisible ? 1 : 0,
              transform: animVisible ? 'translateX(0) scale(1)' : 'translateX(30px) scale(0.97)',
              transitionDelay: '300ms',
            }}
            aria-hidden="true"
          >
            <div className="w-full max-w-lg aspect-square">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
