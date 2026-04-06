import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';

const Pricing = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <main className="pt-16">
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
