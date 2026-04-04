import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const CTASection = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal();

  return (
    <section
      className="section-padding relative"
      aria-label="Call to action"
      style={{
        background: 'linear-gradient(180deg, #DBEAFE 0%, #C7D2FE 40%, #A5B4FC 80%, #818CF8 100%)',
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
          <h2
            className="text-2xl lg:text-4xl font-bold mb-4 leading-tight"
            style={{ color: '#111827' }}
          >
            Ready to create your{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #6366F1, #A855F7, #EC4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AI avatar
            </span>
            ?
          </h2>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: '#334155' }}>
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
              className="group min-h-[44px] btn-glow"
              style={{
                background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
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
              className="min-h-[44px]"
              style={{ borderColor: '#C7D2FE', color: '#1E293B', background: 'rgba(255,255,255,0.6)' }}
            >
              View Pricing
            </Button>
          </div>

          <div
            className="flex items-center gap-4 mt-10 justify-center transition-all duration-700"
            style={{ opacity: textVisible ? 1 : 0, transitionDelay: '500ms' }}
          >
            <div className="flex -space-x-2" aria-hidden="true">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{
                    background: '#E2E8F0',
                    border: '2px solid rgba(255,255,255,0.8)',
                    color: '#6B7280',
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm" style={{ color: '#475569' }}>
              <span className="font-semibold" style={{ color: '#111827' }}>500+</span> creators already on board
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
