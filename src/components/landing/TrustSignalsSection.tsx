import { useStaggerReveal } from '@/hooks/use-scroll-reveal';
import { Users, Video, UserCheck, Shield } from 'lucide-react';

const stats = [
  { icon: Video, value: '50,000+', label: 'Videos Generated' },
  { icon: Users, value: '12,000+', label: 'Active Users' },
  { icon: UserCheck, value: '8,500+', label: 'Avatars Created' },
  { icon: Shield, value: '99.9%', label: 'Uptime' },
];

const TrustSignalsSection = () => {
  const { ref: statsRef, isVisible: statsVisible, getDelay: getStatDelay } = useStaggerReveal(stats.length);

  return (
    <section className="section-padding" aria-label="Trust signals">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats */}
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
              className="text-center p-6 rounded-xl bg-card border border-border transition-all duration-500 ease-out"
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
                ...getStatDelay(i),
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Privacy badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-accent/8 border border-accent/20 rounded-full px-5 py-2.5 text-sm text-accent">
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">SOC 2 Compliant · GDPR Ready · Consent-First AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
