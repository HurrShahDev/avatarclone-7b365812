import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <p className="text-sm font-semibold mb-3 tracking-wide uppercase" style={{ color: '#4F46E5' }}>About Us</p>
          <h1 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#0F172A' }}>
            Building the Future of AI-Powered Communication
          </h1>
          <p className="text-lg text-gray-500 mb-12 leading-relaxed">
            AvatarClone is on a mission to make professional video content accessible to everyone through cutting-edge AI avatar and voice cloning technology.
          </p>

          <div className="space-y-8 text-gray-600 leading-relaxed text-[15px]">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h2>
              <p>We believe everyone deserves access to professional-quality video content without the barriers of expensive equipment, studio time, or on-camera anxiety. AvatarClone democratizes content creation by putting the power of AI in your hands.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What We Do</h2>
              <p>Our platform uses advanced generative AI to create lifelike digital avatars that look and sound like you. From business presentations to educational content to social media videos, AvatarClone handles it all — with just a text input and your digital twin.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Technology</h2>
              <p>Built on state-of-the-art deep learning models, AvatarClone combines facial synthesis, voice cloning, and natural language processing to produce videos that are nearly indistinguishable from real recordings. Our system continuously improves through research and user feedback.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Ethics & Responsibility</h2>
              <p>We take AI ethics seriously. AvatarClone is built with consent-first principles — you can only create avatars of yourself. We actively work to prevent misuse and maintain strict content guidelines to ensure our technology is used responsibly.</p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 btn-glow group">
              <Link to="/auth?mode=signup">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
