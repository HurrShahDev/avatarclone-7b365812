import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import avatarImage from '@/assets/ai-avatar-promo.jpg';

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-accent/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to create your avatar?
            </h2>
            <p className="text-muted-foreground mb-6">
              Start free with our starter plan. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link to="/create">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={(e) => e.preventDefault()}>
                View Pricing
              </Button>
            </div>
          </div>
          
          {/* Avatar Image - Right Side */}
          <div className="flex-1">
            <img 
              src={avatarImage} 
              alt="Professional AI Avatar" 
              className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
