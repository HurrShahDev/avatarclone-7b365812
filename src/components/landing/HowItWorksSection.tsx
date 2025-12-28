import { Upload, Cpu, Video, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload',
    description: 'Share a headshot photo and record a short voice sample. Our AI analyzes your unique features and speech patterns.',
    illustration: 'Upload your photo and voice sample',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Train',
    description: 'Our advanced models learn your face and voice in minutes. Watch real-time progress as your avatar takes shape.',
    illustration: 'AI processes your data securely',
  },
  {
    number: '03',
    icon: Video,
    title: 'Generate',
    description: 'Create unlimited videos with your avatar. Type any script and watch your digital twin bring it to life.',
    illustration: 'Generate videos on demand',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            Create your first AI avatar in just three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full">
                  <div className="flex items-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-accent/50" />
                    <ArrowRight className="w-5 h-5 text-primary mx-2" />
                  </div>
                </div>
              )}

              <div className="glass-card p-8 h-full">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-bold gradient-text opacity-50">
                    {step.number}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Illustration Placeholder */}
                <div className="mt-6 aspect-video rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center border border-border/50">
                  <p className="text-sm text-muted-foreground/50 text-center px-4">
                    {step.illustration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
