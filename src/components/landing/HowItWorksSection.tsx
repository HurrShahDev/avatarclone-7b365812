import uploadImg from '@/assets/voice-waveform.jpg';
import processImg from '@/assets/ai-processing.jpg';
import exportImg from '@/assets/video-export.jpg';

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

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-accent/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground">
            Create your first AI avatar in three simple steps. No technical expertise required.
          </p>
        </div>

        <div className="space-y-16 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="flex-1 w-full">
                <div className="card-simple overflow-hidden">
                  <img 
                    src={step.image} 
                    alt={`${step.title} illustration`}
                    className="w-full aspect-video object-cover"
                  />
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
