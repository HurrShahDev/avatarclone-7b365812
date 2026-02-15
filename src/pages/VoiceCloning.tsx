import { Link } from 'react-router-dom';
import { ArrowRight, Mic, AudioWaveform, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const VoiceCloning = () => {
  const features = [
    {
      icon: Mic,
      title: 'Record or Upload',
      description: 'Provide a short voice sample — as little as 30 seconds — and our AI learns your tone and cadence.',
    },
    {
      icon: AudioWaveform,
      title: 'Voice Replication',
      description: 'Our model captures pitch, rhythm, and intonation to produce a natural-sounding voice clone.',
    },
    {
      icon: Shield,
      title: 'Consent & Privacy',
      description: 'Voice cloning requires explicit consent. Your data is encrypted and never shared with third parties.',
    },
    {
      icon: Headphones,
      title: 'Preview & Refine',
      description: 'Listen to your cloned voice, adjust parameters, and pair it with your avatar for seamless video.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm text-primary font-medium mb-4">Voice Cloning</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-foreground">
                Clone Your Voice with AI Precision
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Record a short sample and our AI will replicate your unique voice — perfect for pairing with your avatar video.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link to="/create">
                    Clone Your Voice
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/home">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-foreground">How It Works</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {features.map((feature, i) => (
                <div key={i} className="card-simple p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Ready to Clone Your Voice?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              It takes less than a minute to create a realistic AI voice clone.
            </p>
            <Button asChild size="lg">
              <Link to="/create">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VoiceCloning;
