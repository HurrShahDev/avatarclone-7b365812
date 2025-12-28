import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import avatar1 from '@/assets/avatar-1.jpg';
import avatar2 from '@/assets/avatar-2.jpg';
import avatar3 from '@/assets/avatar-3.jpg';

const samples = [
  { 
    name: 'Professional', 
    similarity: 96, 
    style: 'Corporate presenter',
    image: avatar1,
  },
  { 
    name: 'Casual', 
    similarity: 92, 
    style: 'Friendly narrator',
    image: avatar2,
  },
  { 
    name: 'News', 
    similarity: 94, 
    style: 'Broadcast quality',
    image: avatar3,
  },
];

const GallerySection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Sample Avatars
          </h2>
          <p className="text-muted-foreground">
            See what's possible with our technology. These avatars were created with consent.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {samples.map((sample) => (
            <div key={sample.name} className="card-simple overflow-hidden">
              <div className="aspect-[4/5] relative group cursor-pointer">
                <img 
                  src={sample.image} 
                  alt={`${sample.name} avatar sample`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <Play className="w-6 h-6 text-primary ml-1" />
                  </div>
                </div>
                <span className="absolute top-3 right-3 consent-badge">
                  Verified
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{sample.name}</h3>
                  <span className="text-sm text-accent font-medium">{sample.similarity}%</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{sample.style}</p>
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
