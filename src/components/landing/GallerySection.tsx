import { Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const samples = [
  {
    name: 'Professional Style',
    similarity: 96,
    style: 'Corporate presenter',
  },
  {
    name: 'Casual Vibe',
    similarity: 92,
    style: 'Friendly narrator',
  },
  {
    name: 'News Anchor',
    similarity: 94,
    style: 'Broadcast quality',
  },
];

const GallerySection = () => {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            See what's possible
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore sample avatars created with our technology
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {samples.map((sample, index) => (
            <div
              key={sample.name}
              className="avatar-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-primary/10 to-accent/10">
                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-primary-foreground/70" />
                  </div>
                </div>

                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/10 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-xl">
                    <Play className="w-6 h-6 text-primary ml-1" />
                  </div>
                </div>

                {/* Consent Badge */}
                <div className="absolute top-4 right-4 consent-badge">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Verified
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{sample.name}</h3>
                  <span className="text-sm text-accent font-medium">{sample.similarity}%</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{sample.style}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Use this style
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
