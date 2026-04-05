import { Upload, Brain, VideoIcon } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const steps = [
  {
    number: '01',
    title: 'Upload',
    description: 'Share a headshot and a short voice sample.',
    icon: Upload,
  },
  {
    number: '02',
    title: 'Train',
    description: 'Our AI learns your face and voice in minutes.',
    icon: Brain,
  },
  {
    number: '03',
    title: 'Generate',
    description: 'Create videos with your avatar speaking any script.',
    icon: VideoIcon,
  },
];

const HowItWorksSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative overflow-hidden" aria-label="How it works" style={{ background: '#0F172A' }}>
      {/* Background dots */}
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#475569" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={headingRef}
          className="text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-sm font-semibold mb-3 tracking-wide uppercase" style={{ color: '#818CF8' }}>
            3 Simple Steps
          </p>
          <h2 className="text-2xl lg:text-4xl font-bold mb-4" style={{ color: '#F1F5F9' }}>
            How It Works
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
            Create your first AI avatar in three steps. No technical expertise required.
          </p>
        </div>

        <div ref={stepsRef} className="max-w-4xl mx-auto">
          {/* Desktop: horizontal */}
          <div className="hidden md:flex items-stretch justify-center">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-stretch flex-1">
                <div
                  className="flex flex-col items-center text-center px-8 py-8 flex-1 transition-all duration-700 ease-out"
                  style={{
                    opacity: stepsVisible ? 1 : 0,
                    transform: stepsVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
                      border: '1px solid rgba(99,102,241,0.2)',
                    }}
                  >
                    <step.icon className="w-7 h-7" style={{ color: '#818CF8' }} aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#6366F1' }}>
                    Step {step.number}
                  </span>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#E2E8F0' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                    {step.description}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px self-stretch my-10" style={{ background: 'rgba(148,163,184,0.2)' }} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical stacked */}
          <div className="md:hidden space-y-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="flex gap-4 items-start p-5 rounded-2xl transition-all duration-700 ease-out"
                style={{
                  opacity: stepsVisible ? 1 : 0,
                  transform: stepsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 150}ms`,
                  background: 'rgba(30,41,59,0.5)',
                  border: '1px solid rgba(99,102,241,0.1)',
                }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
                    border: '1px solid rgba(99,102,241,0.2)',
                  }}
                >
                  <step.icon className="w-5 h-5" style={{ color: '#818CF8' }} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#6366F1' }}>
                    Step {step.number}
                  </span>
                  <h3 className="text-base font-semibold mt-0.5 mb-1" style={{ color: '#E2E8F0' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
