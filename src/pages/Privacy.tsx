import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: '#0F172A' }}>Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: April 6, 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed text-[15px]">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly, including your name, email address, uploaded photos, voice recordings, and any content you create using our platform. We also automatically collect device information, usage data, and cookies to improve your experience.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p>Your information is used to create and maintain your AI avatar, process voice cloning requests, generate videos, provide customer support, and improve our services. We do not sell your personal data to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Storage & Security</h2>
              <p>All personal data, including biometric data used for avatar creation, is stored on encrypted servers. We implement industry-standard security measures including SSL encryption, access controls, and regular security audits to protect your information.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Retention</h2>
              <p>We retain your data for as long as your account is active. You may request deletion of your account and all associated data at any time. Upon deletion, your data will be permanently removed within 30 days.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. You may also request a copy of your data in a portable format. To exercise these rights, contact us at support@avatarclone.ai.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies</h2>
              <p>We use essential cookies to operate the platform and analytics cookies to understand usage patterns. You can manage cookie preferences through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:support@avatarclone.ai" className="text-indigo-600 hover:underline">support@avatarclone.ai</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
