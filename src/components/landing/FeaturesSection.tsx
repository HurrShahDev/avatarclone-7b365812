import { Mic, User, Zap, Shield, Globe, Lock, Sparkles, Clock } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Voice Cloning',
    description: 'Upload just 30-60 seconds of audio to create a voice clone that captures your unique speech patterns, tone, and pronunciation.',
  },
  {
    icon: User,
    title: 'Realistic Avatars',
    description: 'AI-generated faces with natural expressions, accurate lip-sync, and subtle head movements that look genuinely human.',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Generate videos in minutes with our optimized cloud GPU infrastructure. No waiting hours for results.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is encrypted end-to-end and never shared. Full GDPR compliance with easy data deletion.',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Support for English, Spanish, French, German, and Chinese with more languages coming soon.',
  },
  {
    icon: Lock,
    title: 'Consent Verified',
    description: 'Every avatar displays a consent badge showing it was created with proper authorization.',
  },
  {
    icon: Sparkles,
    title: 'High Quality Export',
    description: 'Export in 720p or 1080p resolution. Also available as audio-only MP3 for podcasts.',
  },
  {
    icon: Clock,
    title: 'Unlimited Videos',
    description: 'Create as many videos as you need on paid plans. No per-video charges or hidden fees.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Everything you need to create AI avatars
          </h2>
          <p className="text-muted-foreground">
            Powerful features designed for creators, educators, and businesses who value quality and ethics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="card-simple p-6 hover:shadow-md transition-shadow">
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
