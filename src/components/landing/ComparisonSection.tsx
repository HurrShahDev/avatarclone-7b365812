import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import otherToolsVideo from '@/assets/comparison-other-tools.mp4.asset.json';
import avatarCloneVideo from '@/assets/comparison-avatarclone.mp4.asset.json';

const ComparisonSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();
  const otherVideoRef = useRef<HTMLVideoElement>(null);
  const cloneVideoRef = useRef<HTMLVideoElement>(null);
  const [otherPlaying, setOtherPlaying] = useState(false);
  const [clonePlaying, setClonePlaying] = useState(false);

  const toggleOther = () => {
    if (!otherVideoRef.current) return;
    if (otherVideoRef.current.paused) { otherVideoRef.current.play(); setOtherPlaying(true); }
    else { otherVideoRef.current.pause(); setOtherPlaying(false); }
  };

  const toggleClone = () => {
    if (!cloneVideoRef.current) return;
    if (cloneVideoRef.current.paused) { cloneVideoRef.current.play(); setClonePlaying(true); }
    else { cloneVideoRef.current.pause(); setClonePlaying(false); }
  };

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
          {/* Other Tools Card */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E7EB', background: '#FFFFFF' }}>
            <div className="relative aspect-video cursor-pointer group" onClick={toggleOther} style={{ background: '#1E293B' }}>
              <video
                ref={otherVideoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={otherToolsVideo.url}
                playsInline
                loop
                muted
                preload="metadata"
              />
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: otherPlaying ? 0 : 1, pointerEvents: otherPlaying ? 'none' : 'auto' }}
              >
                <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>
              {otherPlaying && (
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Pause className="w-3 h-3 text-gray-800" />
                  </div>
                </div>
              )}
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

          {/* AvatarClone Card */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid #6366F1', background: '#FFFFFF', boxShadow: '0 8px 40px rgba(99,102,241,0.1)' }}>
            <div className="relative aspect-video cursor-pointer group" onClick={toggleClone} style={{ background: 'linear-gradient(135deg, #312E81, #4338CA)' }}>
              <video
                ref={cloneVideoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={avatarCloneVideo.url}
                playsInline
                loop
                muted
                preload="metadata"
              />
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: clonePlaying ? 0 : 1, pointerEvents: clonePlaying ? 'none' : 'auto' }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>
              {clonePlaying && (
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Pause className="w-3 h-3 text-gray-800" />
                  </div>
                </div>
              )}
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
