import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is an AI Avatar?',
    answer:
      'An AI Avatar is a digital version of you that can speak, present, and deliver messages using your face and voice.',
  },
  {
    question: 'How does the AI create my avatar?',
    answer:
      'Our system analyzes your uploaded video and voice to build a realistic digital model that can generate new videos from text.',
  },
  {
    question: 'Do I need professional equipment?',
    answer:
      'No. A smartphone camera and a clear recording environment are enough to create a high-quality avatar.',
  },
  {
    question: 'How long does it take to create my avatar?',
    answer:
      'Most avatars are ready within a few minutes after uploading your video and voice samples.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. We use secure processing and privacy-focused technology to protect your personal data and recordings.',
  },
  {
    question: 'Can I edit my avatar later?',
    answer:
      'Yes. You can update your avatar, change voice style, or regenerate videos anytime.',
  },
  {
    question: 'What can I use my AI avatar for?',
    answer:
      'You can use it for content creation, business presentations, marketing videos, online teaching, and social media content.',
  },
  {
    question: 'Do I own the videos created with my avatar?',
    answer:
      'Yes. All generated videos belong to you and can be used commercially or personally.',
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="section-padding"
      aria-label="Frequently asked questions"
      style={{
        background: 'linear-gradient(180deg, #EEF2FF 0%, #E0E7FF 50%, #C7D2FE 100%)',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className="text-center max-w-xl mx-auto mb-12 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p
            className="text-sm font-semibold mb-3 tracking-wide uppercase"
            style={{ color: '#6366F1' }}
          >
            FAQ
          </p>
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subtext">
            Everything you need to know about creating your AI avatar.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 sm:px-8 py-5 rounded-2xl text-left transition-all duration-300"
                  style={{
                    background: isOpen
                      ? 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.06))'
                      : '#FFFFFF',
                    border: isOpen ? '1px solid rgba(99,102,241,0.2)' : '1px solid #E5E7EB',
                    boxShadow: isOpen
                      ? '0 4px 20px rgba(99,102,241,0.1)'
                      : '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-sm sm:text-base font-semibold pr-4"
                    style={{ color: '#111827' }}
                  >
                    {faq.question}
                  </span>
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen
                        ? 'linear-gradient(135deg, #6366F1, #A855F7)'
                        : 'linear-gradient(135deg, #6366F1, #818CF8)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
                    }}
                  >
                    <ChevronDown className="w-4 h-4 text-white" />
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p
                    className="px-6 sm:px-8 pt-3 pb-1 text-sm leading-relaxed"
                    style={{ color: '#6B7280' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
