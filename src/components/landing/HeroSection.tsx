import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, UserCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroAnimation from './HeroAnimation';

const HeroSection = () => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Cyber background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 50%, hsla(210, 100%, 60%, 0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 30% 60%, hsla(270, 80%, 60%, 0.04) 0%, transparent 50%)',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="text-left">
            <p className="text-sm text-primary font-medium mb-4 tracking-wide uppercase">
              AI Avatar Generator
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-foreground">
              Create a Lifelike AI Avatar Using Your Voice & Face
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Upload a short voice sample and a headshot — our models generate a
              realistic avatar video you can preview, edit, and download.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button asChild size="lg">
                <Link to="/auth?mode=signup">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-accent" />
                Secure storage
              </span>
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-accent" />
                Consent required
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-accent" />
                Privacy focused
              </span>
            </div>
          </div>

          {/* Right: Holographic AI Animation */}
          <div className="relative flex items-center justify-center lg:justify-end">
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
