import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border py-14">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="AvatarClone" className="h-8 w-auto" />
              <span className="font-semibold text-foreground">AvatarClone</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create AI avatars with your voice and face.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/products/avatar-video" className="hover:text-foreground transition-colors">Avatar Video Generation</Link></li>
              <li><Link to="/products/voice-cloning" className="hover:text-foreground transition-colors">Voice Cloning</Link></li>
              <li><Link to="/products/text-to-speech" className="hover:text-foreground transition-colors">Text to Speech</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="mailto:support@avatarclone.ai" className="hover:text-foreground transition-colors">Support</a></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex justify-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AvatarClone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;