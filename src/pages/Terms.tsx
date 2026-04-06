import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: '#0F172A' }}>Terms of Service</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: April 6, 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed text-[15px]">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using AvatarClone, you agree to be bound by these Terms of Service. If you do not agree, you may not use the platform. We reserve the right to update these terms at any time.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Account Registration</h2>
              <p>You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Acceptable Use</h2>
              <p>You agree not to use AvatarClone to create content that is misleading, defamatory, illegal, or infringes on the rights of others. Creating deepfake content without consent of the depicted individual is strictly prohibited.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Intellectual Property</h2>
              <p>You retain ownership of all content you create using AvatarClone, including generated videos and cloned voices. The AvatarClone platform, its technology, and branding remain the intellectual property of AvatarClone.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Subscriptions & Payments</h2>
              <p>Paid plans are billed monthly. You may cancel at any time, and your access will continue until the end of the billing period. Refunds are not provided for partial months.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
              <p>AvatarClone is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Termination</h2>
              <p>We may suspend or terminate your account if you violate these terms. Upon termination, your right to use the platform ceases immediately and your data may be deleted.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact</h2>
              <p>For questions about these Terms, contact us at <a href="mailto:support@avatarclone.ai" className="text-indigo-600 hover:underline">support@avatarclone.ai</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
