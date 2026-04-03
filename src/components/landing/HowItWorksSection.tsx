import { Upload, Brain, VideoIcon } from 'lucide-react';
import uploadImg from '@/assets/voice-waveform.jpg';
import processImg from '@/assets/ai-processing.jpg';
import exportImg from '@/assets/video-export.jpg';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const steps = [
  {
    number: '1',
    title: 'Upload',
    description: 'Share a headshot and a short voice sample.',
    icon: Upload,
    details: [
      'One high-quality photo (1024×1024 recommended)',
      '30–60 seconds of voice recording',
      'Drag-and-drop or direct recording supported',
    ],
    image: uploadImg,
  },
  {
    number: '2',
    title: 'Train',
    description: 'Our AI learns your face and voice in minutes.',
    icon: Brain,
    details: [
      'Automatic face mesh extraction',
      'Voice feature analysis and embedding',
      'Real-time progress tracking',
    ],
    image: processImg,
  },
  {
    number: '3',
    title: 'Generate',
    description: 'Create videos with your avatar speaking any script.',
    icon: VideoIcon,
    details: [
      'Text-to-speech with your cloned voice',
      'Adjustable speed, pitch, and emotion',
      'Export as 720p, 1080p, or audio-only',
    ],
    image: exportImg,
  },
];

/* Circle pipeline row — matches SmartML dark section design */
const PipelineCircles = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto mb-20">
      {/* Connecting line */}
      <div
        className="absolute top-1/2 left-[15%] right-[15%] h-px -translate-y-1/2 hidden lg:block"
        style={{
          background: 'linear-gradient(90deg, transparent, #1E293B 10%, #334155 50%, #1E293B 90%, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-3 gap-6 lg:gap-0 relative z-10">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="flex flex-col items-center transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
              transitionDelay: `${i * 150}ms`,
            }}
          >
            {/* Number badge */}
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #A855F7)',
                color: '#fff',
                boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
              }}
            >
              {step.number}
            </div>

            {/* Circle */}
            <div
              className="w-24 h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:scale-105"
              style={{
                background: '#0F172A',
                border: '2px solid #1E293B',
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.08), inset 0 0 20px rgba(99, 102, 241, 0.05)',
              }}
            >
              <step.icon
                className="w-8 h-8 lg:w-9 lg:h-9"
                style={{ color: '#94A3B8' }}
                aria-hidden="true"
              />
            </div>

            {/* Label */}
            <span
              className="text-xs lg:text-sm font-semibold tracking-wider uppercase"
              style={{ color: '#E2E8F0' }}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center transition-all duration-700 ease-out`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg"
            style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff' }}
            aria-hidden="true"
          >
            {step.number}
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: '#A5B4FC' }}>
              Step {step.number}
            </p>
            <h3 className="text-xl font-bold" style={{ color: '#fff' }}>{step.title}</h3>
          </div>
        </div>
        <p className="mb-5 leading-relaxed" style={{ color: '#94A3B8' }}>{step.description}</p>
        <ul className="space-y-3" role="list">
          {step.details.map((detail, i) => (
            <li
              key={i}
              role="listitem"
              className="flex items-center gap-3 text-sm transition-all duration-500"
              style={{
                color: '#94A3B8',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-12px)',
                transitionDelay: `${400 + i * 100}ms`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: '#A5B4FC' }}
                aria-hidden="true"
              />
              {detail}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="flex-1 w-full transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.97)',
          transitionDelay: '200ms',
        }}
      >
        <div className="rounded-xl overflow-hidden shadow-md" style={{ border: '1px solid #1E293B' }}>
          <img
            src={step.image}
            alt={`Step ${step.number}: ${step.title} — ${step.description}`}
            className="w-full aspect-video object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();

  return (
    <section id="how-it-works" className="section-padding dark-section relative" aria-label="How it works">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={headingRef}
          className="text-center max-w-xl mx-auto mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-sm font-semibold mb-3 tracking-wide uppercase" style={{ color: '#A5B4FC' }}>
            3 Simple Steps
          </p>
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subtext">
            Create your first AI avatar in three steps. No technical expertise required.
          </p>
        </div>

        {/* Pipeline circles */}
        <PipelineCircles />

        {/* Detailed step cards */}
        <div className="space-y-20 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
