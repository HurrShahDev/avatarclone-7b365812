import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal, useStaggerReveal } from '@/hooks/use-scroll-reveal';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Try AvatarClone with basic features.',
    features: [
      '1 AI avatar',
      '3 video generations/month',
      '720p export quality',
      'Basic voice cloning',
      'Community support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$10',
    period: '/month',
    description: 'For creators who need more power.',
    features: [
      '5 AI avatars',
      '30 video generations/month',
      '1080p export quality',
      'Advanced voice cloning',
      'Priority support',
      'Custom backgrounds',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'Business',
    price: '$30',
    period: '/month',
    description: 'For teams and professional use.',
    features: [
      'Unlimited AI avatars',
      'Unlimited generations',
      '1080p + 4K export',
      'Premium voice cloning',
      'Dedicated support',
      'API access',
      'Team collaboration',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const PricingSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerReveal(plans.length);

  return (
    <section id="pricing" className="py-20 lg:py-28" aria-label="Pricing" style={{ background: '#F8FAFC' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={headingRef}
          className="text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-sm font-semibold mb-3 tracking-wide uppercase" style={{ color: '#4F46E5' }}>Pricing</p>
          <h2 className="text-2xl lg:text-4xl font-bold mb-4" style={{ color: '#0F172A' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            Choose a plan that fits your needs. Start free, upgrade anytime.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-7 flex flex-col transition-all duration-500 ease-out card-hover"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(24px)',
                background: plan.highlighted ? '#FFFFFF' : '#FFFFFF',
                border: plan.highlighted ? '2px solid #6366F1' : '1px solid #E5E7EB',
                boxShadow: plan.highlighted
                  ? '0 8px 40px rgba(99,102,241,0.12)'
                  : '0 1px 3px rgba(0,0,0,0.04)',
                ...getDelay(i),
              }}
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #4338CA, #6366F1)' }}
                >
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.highlighted ? '#4F46E5' : '#10B981' }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className="w-full min-h-[44px] font-semibold btn-glow"
                variant={plan.highlighted ? 'default' : 'outline'}
                style={
                  plan.highlighted
                    ? { background: 'linear-gradient(135deg, #4338CA, #4F46E5)', boxShadow: '0 4px 14px rgba(67,56,202,0.3)' }
                    : { borderColor: '#E5E7EB', color: '#374151' }
                }
              >
                <Link to="/auth?mode=signup">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
