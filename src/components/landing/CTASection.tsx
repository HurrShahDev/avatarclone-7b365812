import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const CTASection = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal();

  return (
    <section
      className="py-20 lg:py-28 relative"
      aria-label="Call to action"
      style={{
        background: 'linear-gradient(180deg, #EEF2FF 0%, #E0E7FF 40%, #C7D2FE 100%)',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={textRef}
          className="max-w-2xl mx-auto text-center transition-all duration-700 ease-out"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight" style={{ color: '#0F172A' }}>
            Ready to create your{' '}
            <span style={{ color: '#4338CA' }}>AI avatar</span>?
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: '#475569' }}>
            Get started free — no credit card required. Create your first avatar video in under 5 minutes.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700"
            style={{
              opacity: textVisible ? 1 : 0,
              transitionDelay: '300ms',
            }}
          >
            <Button
              asChild
              size="lg"
              className="group min-h-[48px] text-base font-semibold px-8 btn-glow"
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
              className="min-h-[48px] text-base font-medium"
              style={{ borderColor: '#C7D2FE', color: '#1E293B', background: 'rgba(255,255,255,0.7)' }}
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
