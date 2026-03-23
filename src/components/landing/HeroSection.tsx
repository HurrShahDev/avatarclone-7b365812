import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, UserCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroAnimation from './HeroAnimation';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const HeroSection = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: animRef, isVisible: animVisible } = useScrollReveal({ threshold: 0.1 });

  const scrollToDemo = () => {
    const el = document.getElementById('demo-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 lg:py-28 overflow-hidden">
      {/* Cyber background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 50%, hsla(210, 100%, 60%, 0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 30% 60%, hsla(270, 80%, 60%, 0.04) 0%, transparent 50%)',
        }}
      />

      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${4 + i * 0.7}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div
            ref={textRef}
            className="text-left transition-all duration-700 ease-out"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <p
              className="text-sm text-primary font-medium mb-4 tracking-wide uppercase transition-all duration-500"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: '100ms',
              }}
            >
              AI Avatar Generator
            </p>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-foreground transition-all duration-700"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '200ms',
              }}
            >
              Create a Lifelike AI Avatar Using Your Voice & Face
            </h1>

            <p
              className="text-lg text-muted-foreground mb-8 max-w-xl transition-all duration-700"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '350ms',
              }}
            >
              Upload a short voice sample and a headshot — our models generate a
              realistic avatar video you can preview, edit, and download.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 mb-8 transition-all duration-700"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '450ms',
              }}
            >
              <Button asChild size="lg" className="group">
                <Link to="/auth?mode=signup">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToDemo} className="group">
                <Play className="w-4 h-4 transition-transform group-hover:scale-110" />
                Watch Demo
              </Button>
            </div>

            <div
              className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground transition-all duration-700"
              style={{
                opacity: textVisible ? 1 : 0,
                transitionDelay: '550ms',
              }}
            >
              {[
                { icon: Shield, label: 'Secure storage' },
                { icon: UserCheck, label: 'Consent required' },
                { icon: Lock, label: 'Privacy focused' },
              ].map(({ icon: Icon, label }, i) => (
                <span key={label} className="flex items-center gap-1.5 transition-all duration-500" style={{ transitionDelay: `${600 + i * 100}ms`, opacity: textVisible ? 1 : 0, transform: textVisible ? 'translateY(0)' : 'translateY(10px)' }}>
                  <Icon className="w-3.5 h-3.5 text-accent" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Holographic AI Animation */}
          <div
            ref={animRef}
            className="relative flex items-center justify-center lg:justify-end transition-all duration-1000 ease-out"
            style={{
              opacity: animVisible ? 1 : 0,
              transform: animVisible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.95)',
              transitionDelay: '300ms',
            }}
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
