import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const ComparisonSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();

  return (
    <section className="py-20 lg:py-28" aria-label="Avatar comparison" style={{ background: '#F8FAFC' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={headingRef}
          className="text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ease-out"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-sm font-semibold mb-3 tracking-wide uppercase" style={{ color: '#4F46E5' }}>
            Why AvatarClone
          </p>
          <h2 className="text-2xl lg:text-4xl font-bold mb-4" style={{ color: '#0F172A' }}>
            Not All AI Avatars Are Created Equal
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            Most AI tools generate static, robotic avatars with basic lip syncing. AvatarClone creates lifelike digital twins with natural expressions, realistic head movement, and emotionally expressive voice cloning that feels genuinely human.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: cardsVisible ? 1 : 0,
            transform: cardsVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E7EB', background: '#FFFFFF' }}>
            <div className="relative aspect-video" style={{ background: '#1E293B' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ background: '#334155', border: '2px solid #475569' }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-1 rounded-full bg-slate-600 animate-pulse" />
                    <div className="w-12 h-1 rounded-full bg-slate-600 animate-pulse" style={{ animationDelay: '0.3s' }} />
                    <div className="w-6 h-1 rounded-full bg-slate-600 animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </div>
                  <p className="text-slate-500 text-xs">Static lip sync only</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <h3 className="font-semibold text-gray-900">Other AI Avatar Tools</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Basic lip syncing on a static face. No real emotion, no head movement, and robotic voice synthesis that sounds unnatural and impersonal.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid #6366F1', background: '#FFFFFF', boxShadow: '0 8px 40px rgba(99,102,241,0.1)' }}>
            <div className="relative aspect-video" style={{ background: 'linear-gradient(135deg, #312E81, #4338CA)' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', border: '2px solid #818CF8' }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E0E7FF" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => (
                          <div
                            key={i}
                            className="w-0.5 bg-indigo-300 rounded-full animate-pulse"
                            style={{ height: `${8 + Math.random() * 10}px`, animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1,2,3,4,5,6,7].map(i => (
                      <div
                        key={i}
                        className="w-1 bg-indigo-400 rounded-full animate-pulse"
                        style={{ height: `${4 + Math.random() * 12}px`, animationDelay: `${i * 0.1}s`, animationDuration: '0.6s' }}
                      />
                    ))}
                  </div>
                  <p className="text-indigo-200 text-xs">Lifelike expression & voice</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <h3 className="font-semibold text-gray-900">AvatarClone</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Full facial expression mapping, natural head movement, and emotionally expressive voice cloning. Every video feels like a real person speaking directly to the viewer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
