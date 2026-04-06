import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import logoIcon from '@/assets/logo-icon.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16" style={{ background: '#0F172A' }} role="contentinfo">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4" aria-label="AvatarClone home">
              <img src={logoIcon} alt="" className="h-10 w-auto" aria-hidden="true" />
              <span className="font-bold text-lg text-white tracking-tight">
                Avatar<span style={{ color: '#818CF8' }}>Clone</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-[220px]">
              Create AI avatars with your voice and face. Professional quality, zero effort.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/products/avatar-video" className="hover:text-white transition-colors">Avatar Video</Link></li>
              <li><Link to="/products/voice-cloning" className="hover:text-white transition-colors">Voice Cloning</Link></li>
              <li><Link to="/products/text-to-speech" className="hover:text-white transition-colors">Text to Speech</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="mailto:support@avatarclone.ai" className="hover:text-white transition-colors">Support</a></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex justify-center">
          <p className="text-sm text-slate-500">
            © {currentYear} AvatarClone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
