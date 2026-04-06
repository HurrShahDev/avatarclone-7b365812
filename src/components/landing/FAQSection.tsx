import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What exactly is an AI Avatar and how does it represent me?',
    answer: 'An AI Avatar is a realistic digital replica of your face and voice, powered by advanced generative AI. It captures your facial features, expressions, and vocal patterns to create a virtual version of you that can deliver presentations, narrate content, and communicate on your behalf — all from a simple text input, without ever stepping in front of a camera again.',
  },
  {
    question: 'How does AvatarClone generate such realistic avatar videos?',
    answer: 'AvatarClone uses a multi-stage deep learning pipeline that combines facial synthesis, motion mapping, and voice cloning. When you upload a short video and voice sample, our system trains a personalized model that learns your unique expressions, lip movements, and speech patterns. This allows it to generate new videos where your avatar speaks any text naturally with lifelike head movements and emotional tone.',
  },
  {
    question: 'Do I need a professional camera, microphone, or studio setup?',
    answer: 'Not at all. A standard smartphone camera and a quiet room are more than enough to get started. Our AI is trained to work with everyday recording conditions — you don\'t need professional lighting, a DSLR, or a studio microphone. Just record a short clip in a well-lit space with minimal background noise, and our system handles the rest.',
  },
  {
    question: 'How long does it take to create my personalized AI avatar?',
    answer: 'The entire process typically takes just a few minutes. After you upload your video and voice samples, our system processes and trains your personalized avatar model in the background. Most users receive their ready-to-use avatar within 3–5 minutes, depending on the length and quality of the uploaded samples.',
  },
  {
    question: 'How does AvatarClone protect my personal data and biometric information?',
    answer: 'Security is our top priority. All uploaded media and biometric data are encrypted both in transit and at rest using industry-standard AES-256 encryption. Your data is processed on isolated, secure servers and is never shared with third parties. You retain full control over your data and can request permanent deletion at any time through your account settings.',
  },
  {
    question: 'Can I update, modify, or retrain my avatar after it has been created?',
    answer: 'Absolutely. AvatarClone gives you full flexibility to update your avatar whenever you want. You can re-upload new video or voice samples to improve quality, change your avatar\'s voice style or tone, and regenerate videos with updated settings. Your avatar evolves with you — there are no limits on how often you can retrain or modify it.',
  },
  {
    question: 'What are the main use cases for AI avatar videos in real-world scenarios?',
    answer: 'AI avatar videos are incredibly versatile. Professionals use them for corporate training, sales pitches, and investor presentations. Educators create lecture videos and course content at scale. Marketers produce personalized video ads and social media content. Content creators generate multilingual videos without re-recording. The possibilities span across business communication, e-learning, digital marketing, and personal branding.',
  },
  {
    question: 'Do I own full rights to the videos generated with my AI avatar?',
    answer: 'Yes, you retain 100% ownership of every video generated using your avatar on AvatarClone. There are no licensing restrictions — you are free to use your videos for commercial purposes, publish them on any platform, embed them on your website, or distribute them to clients. Your content is yours, with no watermarks on paid plans and no usage limitations.',
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
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: '#FFFFFF',
                    border: isOpen ? '1px solid #C7D2FE' : '1px solid #E5E7EB',
                    boxShadow: isOpen ? '0 4px 20px rgba(99,102,241,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold pr-4" style={{ color: '#1E293B' }}>
                    {faq.question}
                  </span>
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen
                        ? 'linear-gradient(135deg, #4338CA, #6366F1)'
                        : '#EEF2FF',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <ChevronDown className="w-4 h-4" style={{ color: isOpen ? '#FFFFFF' : '#4F46E5' }} />
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
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
