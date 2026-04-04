import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/10 py-14"
      style={{
        background: 'linear-gradient(135deg, #4F46E5, #6366F1, #7C3AED)',
      }}
      role="contentinfo"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="AvatarClone home">
              <img src={logo} alt="" className="h-8 w-auto brightness-0 invert" aria-hidden="true" />
              <span className="font-semibold text-white text-base">AvatarClone</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              Create AI avatars with your voice and face.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/products/avatar-video" className="hover:text-white transition-colors">Avatar Video Generation</Link></li>
              <li><Link to="/products/voice-cloning" className="hover:text-white transition-colors">Voice Cloning</Link></li>
              <li><Link to="/products/text-to-speech" className="hover:text-white transition-colors">Text to Speech</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="mailto:support@avatarclone.ai" className="hover:text-white transition-colors">Support</a></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 flex justify-center">
          <p className="text-sm text-white/60">
            © {currentYear} AvatarClone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
