import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import avatar1 from '@/assets/avatar-1.jpg';

const HeroSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-primary font-medium mb-4">
            AI Avatar Generator
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-foreground">
            Create a Lifelike AI Avatar Using Your Voice & Face
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload a short voice sample and a headshot — our models generate a realistic avatar video you can preview, edit, and download.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button asChild size="lg">
              <Link to="/create">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Play className="w-4 h-4" />
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Data encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Consent required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              GDPR compliant
            </span>
          </div>
        </div>

        {/* Preview Card */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="card-simple p-6">
            <div className="aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center mb-4 relative group cursor-pointer">
              <img 
                src={avatar1} 
                alt="Sample avatar preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 text-primary ml-1" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sample Avatar Demo</p>
                <p className="text-sm text-muted-foreground">Voice similarity: 94%</p>
              </div>
              <span className="consent-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Consent Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
