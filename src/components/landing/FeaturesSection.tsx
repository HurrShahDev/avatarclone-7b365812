import { Mic, User, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Voice Cloning',
    description: 'Upload 30-60 seconds of audio to create a voice clone that sounds remarkably like you.',
  },
  {
    icon: User,
    title: 'Realistic Avatar',
    description: 'AI-generated faces with natural expressions, lip-sync, and head movements.',
  },
  {
    icon: Zap,
    title: 'Fast Rendering',
    description: 'Generate videos in minutes with our optimized cloud infrastructure.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is encrypted and never shared without explicit permission.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Everything you need
          </h2>
          <p className="text-muted-foreground">
            Powerful features for creators, educators, and businesses.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="card-simple p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
