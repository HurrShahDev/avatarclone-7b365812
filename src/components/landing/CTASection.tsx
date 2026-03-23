import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import avatarImage from '@/assets/ai-avatar-promo.jpg';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const CTASection = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal();
  const { ref: imgRef, isVisible: imgVisible } = useScrollReveal();

  return (
    <section className="py-12 lg:py-16 bg-accent/20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/[0.04] rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Text Content */}
          <div
            ref={textRef}
            className="flex-1 text-center lg:text-left transition-all duration-700 ease-out"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-medium mb-5 transition-all duration-500"
              style={{ opacity: textVisible ? 1 : 0, transitionDelay: '200ms' }}
            >
              <Star className="w-3 h-3" />
              Start for Free
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight">
              Ready to create your avatar?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Start free with our starter plan. No credit card required.
              Create your first AI avatar video in under 5 minutes.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start transition-all duration-700"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateY(0)' : 'translateY(15px)',
                transitionDelay: '400ms',
              }}
            >
              <Button asChild size="lg" className="group shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25 transition-all">
                <Link to="/create">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={(e) => e.preventDefault()} className="hover:bg-muted/50 transition-colors">
                View Pricing
              </Button>
            </div>

            {/* Trust indicators */}
            <div
              className="flex items-center gap-4 mt-8 justify-center lg:justify-start transition-all duration-700"
              style={{ opacity: textVisible ? 1 : 0, transitionDelay: '600ms' }}
            >
              <div className="flex -space-x-2">
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

          {/* Avatar Image - Right Side */}
          <div
            ref={imgRef}
            className="flex-1 transition-all duration-700 ease-out"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? 'translateX(0) scale(1)' : 'translateX(30px) scale(0.95)',
              transitionDelay: '200ms',
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
              <img
                src={avatarImage}
                alt="Professional AI Avatar"
                className="relative w-full max-w-sm mx-auto rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
