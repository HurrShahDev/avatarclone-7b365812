import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import HeroTransition from '@/components/landing/HeroTransition';
import PromoSection from '@/components/landing/PromoSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import AvatarCarouselSection from '@/components/landing/AvatarCarouselSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TrustSignalsSection from '@/components/landing/TrustSignalsSection';
import CTASection from '@/components/landing/CTASection';

const Landing = () => {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--gradient-bg)' }}>
      <Header />
      <main>
        <HeroSection />
        <HeroTransition />
        <PromoSection />
        <FeaturesSection />
        <AvatarCarouselSection />
        <HowItWorksSection />
        <TrustSignalsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
