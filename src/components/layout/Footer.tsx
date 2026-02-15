import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/60 border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src={logo} alt="AvatarClone" className="h-10 w-auto" />
              <span className="font-semibold">AvatarClone</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Create AI avatars with your voice and face.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-medium mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products/avatar-video" className="hover:text-foreground">Avatar Video Generation</Link></li>
              <li><Link to="/products/voice-cloning" className="hover:text-foreground">Voice Cloning</Link></li>
              <li><Link to="/products/text-to-speech" className="hover:text-foreground">Text to Speech</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:support@avatarclone.ai" className="hover:text-foreground">Support</a></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
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
