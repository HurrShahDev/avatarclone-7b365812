import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

  return (
    <section className="section-padding" aria-label="Frequently asked questions">
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

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl px-6 border"
                style={{
                  background: '#FFFFFF',
                  borderColor: '#E5E7EB',
                }}
              >
                <AccordionTrigger
                  className="text-left text-sm lg:text-base font-semibold py-5 hover:no-underline"
                  style={{ color: '#111827' }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm leading-relaxed pb-5"
                  style={{ color: '#6B7280' }}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
