import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import GallerySection from '@/components/landing/GallerySection';
import CTASection from '@/components/landing/CTASection';

const Landing = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleTheme={toggleTheme} isDark={isDark} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <GallerySection />
        <CTASection />
      </main>
      <Footer />

      {/* Cookie Banner */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 glass-card p-4 animate-fade-in-up">
        <p className="text-sm text-muted-foreground mb-3">
          We use cookies to improve your experience. By continuing, you agree to our{' '}
          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
        </p>
        <div className="flex gap-2">
          <button className="btn-primary text-sm px-4 py-2">Accept</button>
          <button className="btn-ghost text-sm px-4 py-2">Customize</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
