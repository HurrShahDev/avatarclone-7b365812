import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/10 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="glass-card-elevated max-w-4xl mx-auto p-8 lg:p-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Free starter plan available</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Create your avatar today
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of creators who are already using AI avatars to engage their audience. Start free, upgrade when you're ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" className="group">
              <Link to="/auth?mode=signup">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
