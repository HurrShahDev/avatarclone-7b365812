import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ShieldCheck, Cpu, Heart, Users, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const values = [
  { icon: Heart, title: 'Consent-first', desc: 'You can only clone yourself. Explicit consent at every step.' },
  { icon: ShieldCheck, title: 'Privacy focused', desc: 'Your face and voice are processed for your avatar only — never shared.' },
  { icon: Cpu, title: 'State-of-the-art AI', desc: 'Facial synthesis, voice cloning and natural speech in one pipeline.' },
  { icon: Zap, title: 'Fast & accessible', desc: 'A professional video studio in your browser — no rigs, no edits.' },
];

const stats = [
  { value: '60s', label: 'Voice sample needed' },
  { value: '1', label: 'Photo to clone yourself' },
  { value: '4', label: 'Steps to finished video' },
  { value: '1080p', label: 'Export resolution' },
];

const About = () => {
  const { user } = useAuth();
  const ctaHref = user ? '/create' : '/auth?mode=signup';

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 50%, #FFFFFF 100%)' }}>
      <Header />

      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-indigo-100 shadow-sm mb-5">
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#6366F1' }} />
            <span className="text-xs font-semibold tracking-wide" style={{ color: '#4F46E5' }}>ABOUT AVATARCLONE</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-[1.1]" style={{ color: '#0F172A' }}>
            Building the future of <span style={{ color: '#4F46E5' }}>AI-powered communication</span>
          </h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            AvatarClone makes professional video content accessible to everyone through cutting-edge AI avatar and voice cloning — no studio, no camera, no edits.
          </p>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 lg:px-8 max-w-5xl mt-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-indigo-100/70 px-5 py-6 text-center shadow-sm">
                <div className="text-3xl font-bold" style={{ color: '#4F46E5' }}>{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="container mx-auto px-4 lg:px-8 max-w-3xl mt-20 space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#0F172A' }}>Our mission</h2>
            <p className="text-slate-600 leading-relaxed">
              Everyone deserves access to professional-quality video content without the barriers of expensive equipment, studio time or on-camera anxiety. AvatarClone democratizes content creation by putting generative AI in your hands.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#0F172A' }}>What we do</h2>
            <p className="text-slate-600 leading-relaxed">
              Our platform uses advanced generative AI to create lifelike digital avatars that look and sound like you. From business presentations to educational content and social media videos — write a script, and your digital twin delivers it.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#0F172A' }}>Our technology</h2>
            <p className="text-slate-600 leading-relaxed">
              Built on state-of-the-art deep learning, AvatarClone combines facial synthesis, voice cloning and natural language processing to produce videos that are nearly indistinguishable from real recordings. Our system continuously improves through research and user feedback.
            </p>
          </div>
        </section>

        {/* Values grid */}
        <section className="container mx-auto px-4 lg:px-8 max-w-5xl mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#0F172A' }}>What we stand for</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white border border-indigo-100/70 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #6366F1, #7C3AED)' }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 lg:px-8 max-w-3xl mt-20 text-center">
          <div className="rounded-3xl p-10 text-white shadow-xl" style={{ background: 'linear-gradient(135deg, #4338CA 0%, #6366F1 50%, #7C3AED 100%)' }}>
            <Users className="w-10 h-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">Ready to meet your digital twin?</h2>
            <p className="opacity-90 mb-6 max-w-md mx-auto">Create your first AI avatar in under five minutes.</p>
            <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold">
              <Link to={ctaHref}>
                Get Started Free <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
