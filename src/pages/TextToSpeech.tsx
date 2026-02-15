import { Link } from 'react-router-dom';
import { ArrowRight, Type, Volume2, Languages, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TextToSpeech = () => {
  const features = [
    {
      icon: Type,
      title: 'Type Your Script',
      description: 'Enter any text — from a single sentence to a full script — and hear it spoken in seconds.',
    },
    {
      icon: Volume2,
      title: 'Natural AI Voices',
      description: 'Choose from multiple realistic voices or use your own cloned voice for a personal touch.',
    },
    {
      icon: Languages,
      title: 'Multi-Language Support',
      description: 'Generate speech in multiple languages and accents with accurate pronunciation.',
    },
    {
      icon: Sliders,
      title: 'Fine-Tune Output',
      description: 'Adjust speed, pitch, and emphasis to get the exact delivery you need.',
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
              <p className="text-sm text-primary font-medium mb-4">Text to Speech</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-foreground">
                Convert Text to Natural-Sounding Speech
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Type your script and let our AI produce studio-quality voiceovers — perfect for videos, presentations, and content creation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link to="/create">
                    Try Text to Speech
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Ready to Generate Speech?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              No recording equipment needed — just type and listen.
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

export default TextToSpeech;
