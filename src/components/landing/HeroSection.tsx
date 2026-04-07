import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, UserCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroAnimation from './HeroAnimation';
import HeroBackground3D from './HeroBackground3D';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const HeroSection = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal({ threshold: 0.1, immediate: true });
  const { ref: animRef, isVisible: animVisible } = useScrollReveal({ threshold: 0.1, immediate: true });

  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28"
      aria-label="Hero"
      style={{
        background: 'linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 20%, #E0E7FF 45%, #C7D2FE 70%, #A5B4FC 90%, #818CF8 100%)',
      }}
    >
      {/* 3D Background */}
      <HeroBackground3D />

      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#818CF8', zIndex: 2 }} aria-hidden="true" />
      <div className="absolute bottom-10 left-[5%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: '#6366F1', zIndex: 2 }} aria-hidden="true" />

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
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-sm font-medium transition-all duration-500"
              style={{
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid #C7D2FE',
                color: '#4338CA',
                opacity: textVisible ? 1 : 0,
                transitionDelay: '100ms',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              AI-Powered Avatar Generator
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-6 transition-all duration-700"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: '200ms',
              }}
            >
              <span style={{ color: '#0F172A' }}>Create Realistic </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #4338CA, #6366F1, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI Avatar
              </span>
              <br />
              <span style={{ color: '#0F172A' }}>Videos</span>
            </h1>

            <p
              className="text-lg mb-10 max-w-lg leading-relaxed transition-all duration-700"
              style={{
                color: '#475569',
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
              <Button
                asChild
                size="lg"
                className="group min-h-[48px] text-base font-semibold px-7 btn-glow"
                style={{
                  background: 'linear-gradient(135deg, #4338CA, #4F46E5)',
                  boxShadow: '0 4px 20px rgba(67, 56, 202, 0.35)',
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
                asChild
                className="group min-h-[48px] text-base font-medium"
                style={{
                  borderColor: '#C7D2FE',
                  color: '#1E293B',
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Link to="/demo" aria-label="Watch product demo video">
                  <Play className="w-4 h-4" aria-hidden="true" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            <div
              className="flex flex-wrap items-center gap-5 text-sm transition-all duration-700"
              style={{
                color: '#64748B',
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
                  <Icon className="w-4 h-4 text-indigo-500" aria-hidden="true" />
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
