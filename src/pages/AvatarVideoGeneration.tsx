import { Link } from 'react-router-dom';
import { ArrowRight, Video, Sparkles, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AvatarVideoGeneration = () => {
  const features = [
    {
      icon: Upload,
      title: 'Upload Your Photo',
      description: 'Simply upload a clear headshot and our AI will map your facial features with precision.',
    },
    {
      icon: Video,
      title: 'AI Video Synthesis',
      description: 'Our model generates natural head movements, expressions, and lip sync from your avatar.',
    },
    {
      icon: Sparkles,
      title: 'Studio-Quality Output',
      description: 'Get HD video output with realistic lighting, shadows, and smooth frame transitions.',
    },
    {
      icon: Download,
      title: 'Export & Share',
      description: 'Download your avatar video in MP4 format, ready for social media or presentations.',
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
              <p className="text-sm text-primary font-medium mb-4">Avatar Video Generation</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-foreground">
                Turn a Single Photo Into a Talking Avatar Video
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Upload your headshot and let our AI create a lifelike video avatar that moves, speaks, and expresses — all from one still image.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link to="/create">
                    Try It Now
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Ready to Create Your Avatar Video?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Get started in minutes — no video editing skills required.
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

export default AvatarVideoGeneration;
