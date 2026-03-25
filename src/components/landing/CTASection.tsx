import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const CTASection = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal();

  return (
    <section className="section-padding relative" aria-label="Call to action">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={textRef}
          className="max-w-2xl mx-auto text-center transition-all duration-700 ease-out"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-foreground leading-tight">
            Ready to create your AI avatar?
          </h2>
          <p className="section-subtext mb-8 text-lg">
            Get started free — no credit card required. Create your first avatar video in under 5 minutes.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700"
            style={{
              opacity: textVisible ? 1 : 0,
              transitionDelay: '300ms',
            }}
          >
            <Button asChild size="lg" className="group shadow-md shadow-primary/15 min-h-[44px]">
              <Link to="/auth?mode=signup">
                Get Started Free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="min-h-[44px]">
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
                  className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">500+</span> creators already on board
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
