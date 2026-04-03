import { useStaggerReveal } from '@/hooks/use-scroll-reveal';
import { Users, Video, UserCheck, Shield } from 'lucide-react';

const stats = [
  { icon: Video, value: '50,000+', label: 'Videos Generated', color: '#6366F1' },
  { icon: Users, value: '12,000+', label: 'Active Users', color: '#7C3AED' },
  { icon: UserCheck, value: '8,500+', label: 'Avatars Created', color: '#06B6D4' },
  { icon: Shield, value: '99.9%', label: 'Uptime', color: '#1D4ED8' },
];

const TrustSignalsSection = () => {
  const { ref: statsRef, isVisible: statsVisible, getDelay: getStatDelay } = useStaggerReveal(stats.length);

  return (
    <section className="section-padding" aria-label="Trust signals">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12"
          role="list"
          aria-label="Platform statistics"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              role="listitem"
              className="text-center p-6 rounded-xl transition-all duration-500 ease-out hover:shadow-md hover:-translate-y-1"
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                ...getStatDelay(i),
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} aria-hidden="true" />
              </div>
              <p className="text-2xl lg:text-3xl font-bold mb-1" style={{ color: '#111827' }}>{stat.value}</p>
              <p className="text-sm" style={{ color: '#6B7280' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm"
            style={{
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              color: '#0891B2',
            }}
          >
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">SOC 2 Compliant · GDPR Ready · Consent-First AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
