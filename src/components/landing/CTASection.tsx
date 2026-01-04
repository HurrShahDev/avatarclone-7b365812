import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="card-simple max-w-2xl mx-auto p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to create your avatar?
          </h2>
          <p className="text-muted-foreground mb-6">
            Start free with our starter plan. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
      </div>
    </section>
  );
};

export default CTASection;
