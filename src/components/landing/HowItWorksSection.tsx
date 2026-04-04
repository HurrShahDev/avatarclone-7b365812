import { Upload, Brain, VideoIcon } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const steps = [
  {
    number: '1',
    title: 'Upload',
    description: 'Share a headshot and a short voice sample.',
    icon: Upload,
  },
  {
    number: '2',
    title: 'Train',
    description: 'Our AI learns your face and voice in minutes.',
    icon: Brain,
  },
  {
    number: '3',
    title: 'Generate',
    description: 'Create videos with your avatar speaking any script.',
    icon: VideoIcon,
  },
];

const HowItWorksSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section id="how-it-works" className="section-padding dark-section relative overflow-hidden" aria-label="How it works">
      {/* Background dots pattern - larger size */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#334155" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
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

        {/* Horizontal steps row */}
        <div ref={stepsRef} className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch justify-center">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-stretch flex-1">
                {/* Step content */}
                <div
                  className="flex flex-col items-center text-center px-6 py-8 flex-1 transition-all duration-700 ease-out"
                  style={{
                    opacity: stepsVisible ? 1 : 0,
                    transform: stepsVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  {/* Number badge */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #6366F1, #A855F7)',
                      color: '#fff',
                      boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Circle icon with pulse animation */}
                  <div
                    className="w-24 h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center mb-5 transition-all duration-300 hover:scale-105 icon-pulse"
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

                  {/* Title */}
                  <h3
                    className="text-sm lg:text-base font-semibold tracking-wider uppercase mb-2"
                    style={{ color: '#E2E8F0' }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs lg:text-sm leading-relaxed max-w-[200px]" style={{ color: '#94A3B8' }}>
                    {step.description}
                  </p>
                </div>

                {/* White vertical divider (not after last step) */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block w-px self-stretch my-8"
                    style={{ background: 'rgba(255, 255, 255, 0.15)' }}
                    aria-hidden="true"
                  />
                )}

                {/* Horizontal divider for mobile */}
                {i < steps.length - 1 && (
                  <div
                    className="block md:hidden h-px w-3/4 mx-auto"
                    style={{ background: 'rgba(255, 255, 255, 0.15)' }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
