import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is an AI Avatar?',
    answer: 'An AI Avatar is a digital version of you that can speak, present, and deliver messages using your face and voice.',
  },
  {
    question: 'How does the AI create my avatar?',
    answer: 'Our system analyzes your uploaded video and voice to build a realistic digital model that can generate new videos from text.',
  },
  {
    question: 'Do I need professional equipment?',
    answer: 'No. A smartphone camera and a clear recording environment are enough to create a high-quality avatar.',
  },
  {
    question: 'How long does it take to create my avatar?',
    answer: 'Most avatars are ready within a few minutes after uploading your video and voice samples.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use secure processing and privacy-focused technology to protect your personal data and recordings.',
  },
  {
    question: 'Can I edit my avatar later?',
    answer: 'Yes. You can update your avatar, change voice style, or regenerate videos anytime.',
  },
  {
    question: 'What can I use my AI avatar for?',
    answer: 'You can use it for content creation, business presentations, marketing videos, online teaching, and social media content.',
  },
  {
    question: 'Do I own the videos created with my avatar?',
    answer: 'Yes. All generated videos belong to you and can be used commercially or personally.',
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28" aria-label="Frequently asked questions" style={{ background: '#FFFFFF' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className="text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-sm font-semibold mb-3 tracking-wide uppercase" style={{ color: '#4F46E5' }}>FAQ</p>
          <h2 className="text-2xl lg:text-4xl font-bold mb-4" style={{ color: '#0F172A' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            Everything you need to know about creating your AI avatar.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                  transitionDelay: `${i * 40}ms`,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4.5 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: isOpen ? '#F8FAFC' : '#F8FAFC',
                    border: isOpen ? '1px solid #C7D2FE' : '1px solid #F1F5F9',
                  }}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold pr-4" style={{ color: '#1E293B' }}>
                    {faq.question}
                  </span>
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? '#4F46E5' : '#E0E7FF',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <ChevronDown className="w-4 h-4" style={{ color: isOpen ? '#FFFFFF' : '#4F46E5' }} />
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-6 pt-3 pb-2 text-sm leading-relaxed text-gray-500">
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
