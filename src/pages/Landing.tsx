import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import PromoSection from '@/components/landing/PromoSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import AvatarCarouselSection from '@/components/landing/AvatarCarouselSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CTASection from '@/components/landing/CTASection';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PromoSection />
        <FeaturesSection />
        <AvatarCarouselSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
