import { useScrollReveal, useStaggerReveal } from '@/hooks/use-scroll-reveal';
import { Users, Video, UserCheck, Shield } from 'lucide-react';

const stats = [
  { icon: Video, value: '50,000+', label: 'Videos Generated' },
  { icon: Users, value: '12,000+', label: 'Active Users' },
  { icon: UserCheck, value: '8,500+', label: 'Avatars Created' },
  { icon: Shield, value: '99.9%', label: 'Uptime' },
];

const testimonials = [
  {
    quote: "AvatarClone cut our video production time by 80%. We now create training content in minutes instead of days.",
    name: 'Sarah Chen',
    role: 'Head of L&D, TechCorp',
    initials: 'SC',
  },
  {
    quote: "The voice cloning quality is incredible. Our customers can't tell the difference between the avatar and real footage.",
    name: 'Marcus Rivera',
    role: 'Content Director, MediaFlow',
    initials: 'MR',
  },
  {
    quote: "Finally a tool that respects consent and privacy while delivering studio-quality AI avatars.",
    name: 'Priya Sharma',
    role: 'CEO, EduVerse',
    initials: 'PS',
  },
];

const partnerLogos = [
  'TechCorp', 'MediaFlow', 'EduVerse', 'CloudScale', 'DataBridge',
];

const TrustSignalsSection = () => {
  const { ref: statsRef, isVisible: statsVisible, getDelay: getStatDelay } = useStaggerReveal(stats.length);
  const { ref: testimonialRef, isVisible: testimonialVisible, getDelay: getTestimonialDelay } = useStaggerReveal(testimonials.length);
  const { ref: partnerRef, isVisible: partnerVisible } = useScrollReveal();

  return (
    <section className="section-padding" aria-label="Trust signals and testimonials">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto mb-20"
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

        {/* Testimonials */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-10">
            <p className="text-sm text-primary font-semibold mb-3 tracking-wide uppercase">What People Say</p>
            <h2 className="section-heading">Trusted by Creators Worldwide</h2>
          </div>
          <div
            ref={testimonialRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            role="list"
            aria-label="Customer testimonials"
          >
            {testimonials.map((t, i) => (
              <blockquote
                key={t.name}
                role="listitem"
                className="bg-card p-6 rounded-xl border border-border transition-all duration-500 ease-out"
                style={{
                  opacity: testimonialVisible ? 1 : 0,
                  transform: testimonialVisible ? 'translateY(0)' : 'translateY(20px)',
                  ...getTestimonialDelay(i),
                }}
              >
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {t.initials}
                  </div>
                  <div>
                    <cite className="text-sm font-semibold text-foreground not-italic block">{t.name}</cite>
                    <span className="text-xs text-muted-foreground">{t.role}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Partner logos */}
        <div
          ref={partnerRef}
          className="text-center transition-all duration-700 ease-out"
          style={{
            opacity: partnerVisible ? 1 : 0,
            transform: partnerVisible ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12" role="list" aria-label="Partner companies">
            {partnerLogos.map((name) => (
              <span
                key={name}
                role="listitem"
                className="text-base font-semibold text-muted-foreground/50 tracking-wide"
              >
                {name}
              </span>
            ))}
          </div>

          {/* Privacy badge */}
          <div className="mt-10 inline-flex items-center gap-2 bg-accent/8 border border-accent/20 rounded-full px-5 py-2.5 text-sm text-accent">
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">SOC 2 Compliant · GDPR Ready · Consent-First AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
