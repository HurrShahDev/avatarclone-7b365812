import uploadImg from '@/assets/voice-waveform.jpg';
import processImg from '@/assets/ai-processing.jpg';
import exportImg from '@/assets/video-export.jpg';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const steps = [
  {
    number: '1',
    title: 'Upload',
    description: 'Share a headshot photo and record a short voice sample. Our system analyzes your unique facial features and speech patterns.',
    details: [
      'Single high-quality photo (1024×1024 recommended)',
      '30-60 seconds of voice recording',
      'Supports drag-and-drop or direct recording',
    ],
    image: uploadImg,
  },
  {
    number: '2',
    title: 'Train',
    description: 'Our AI models learn your face and voice characteristics in just a few minutes using advanced neural networks.',
    details: [
      'Face mesh extraction and alignment',
      'Voice feature analysis and embedding',
      'Real-time progress tracking',
    ],
    image: processImg,
  },
  {
    number: '3',
    title: 'Generate',
    description: 'Create unlimited videos with your avatar speaking any script. Adjust voice settings and export in multiple formats.',
    details: [
      'Text-to-speech with your cloned voice',
      'Adjustable speed, pitch, and emotion',
      'Export as 720p, 1080p, or audio-only',
    ],
    image: exportImg,
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center transition-all duration-700 ease-out`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateY(0)'
          : `translateY(40px)`,
      }}
    >
      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md shadow-primary/20">
            {step.number}
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-0.5">Step {step.number}</p>
            <h3 className="text-xl font-bold">{step.title}</h3>
          </div>
        </div>
        <p className="text-muted-foreground mb-5 leading-relaxed">{step.description}</p>
        <ul className="space-y-2.5">
          {step.details.map((detail, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-sm text-muted-foreground transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-15px)',
                transitionDelay: `${400 + i * 100}ms`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </div>

      {/* Image */}
      <div
        className="flex-1 w-full transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translateX(0) scale(1)'
            : `translateX(${isReversed ? '-30px' : '30px'}) scale(0.97)`,
          transitionDelay: '200ms',
        }}
      >
        <div className="rounded-xl overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-500 group">
          <img
            src={step.image}
            alt={`${step.title} illustration`}
            className="w-full aspect-video object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();

  return (
    <section id="how-it-works" className="py-12 lg:py-16 bg-accent/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/[0.05] rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={headingRef}
          className="text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(25px)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
            3 Simple Steps
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground">
            Create your first AI avatar in three simple steps. No technical expertise required.
          </p>
        </div>

        <div className="space-y-20 max-w-5xl mx-auto relative">
          {/* Vertical connector line */}
          <div className="hidden lg:block absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-primary/20" />

          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
