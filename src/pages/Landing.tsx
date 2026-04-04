import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import PromoSection from '@/components/landing/PromoSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import AvatarCarouselSection from '@/components/landing/AvatarCarouselSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';

const Landing = () => {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--gradient-bg)' }}>
      <Header />
      <main>
        <HeroSection />
        <PromoSection />
        <FeaturesSection />
        <AvatarCarouselSection />
        <HowItWorksSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
