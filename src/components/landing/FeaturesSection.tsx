import { Mic, User, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Voice Cloning',
    description: 'High-fidelity voice replication that captures your unique speech patterns and intonation.',
    detail: 'Upload just 30-60 seconds of audio to create a voice clone that sounds remarkably like you.',
  },
  {
    icon: User,
    title: 'Hyper-Realistic Avatar',
    description: 'AI-generated faces with natural expressions, lip-sync, and head movements.',
    detail: 'Our models create photorealistic avatars that move and speak naturally.',
  },
  {
    icon: Zap,
    title: 'Fast Cloud Rendering',
    description: 'Generate videos in minutes with our optimized GPU infrastructure.',
    detail: 'Enterprise-grade processing ensures quick turnaround without compromising quality.',
  },
  {
    icon: Shield,
    title: 'Privacy & Consent',
    description: 'Your data is encrypted and never shared without explicit permission.',
    detail: 'Full GDPR compliance with clear consent tracking and data deletion rights.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Everything you need to create{' '}
            <span className="gradient-text">stunning AI avatars</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed for creators, educators, and businesses who value quality and ethics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-3">
                {feature.description}
              </p>
              <p className="text-sm text-muted-foreground/70">
                {feature.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
