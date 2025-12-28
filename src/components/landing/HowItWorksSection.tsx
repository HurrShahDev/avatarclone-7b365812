import { Upload, Cpu, Video } from 'lucide-react';

const steps = [
  {
    number: '1',
    icon: Upload,
    title: 'Upload',
    description: 'Share a headshot photo and record a short voice sample.',
  },
  {
    number: '2',
    icon: Cpu,
    title: 'Train',
    description: 'Our models learn your face and voice in minutes.',
  },
  {
    number: '3',
    icon: Video,
    title: 'Generate',
    description: 'Create videos with your avatar speaking any script.',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground">
            Create your first AI avatar in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
