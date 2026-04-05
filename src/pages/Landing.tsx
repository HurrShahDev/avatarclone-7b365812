import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import PromoSection from '@/components/landing/PromoSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import AvatarCarouselSection from '@/components/landing/AvatarCarouselSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';

const Landing = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <main>
        <HeroSection />
        <PromoSection />
        <FeaturesSection />
        <AvatarCarouselSection />
        <HowItWorksSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
