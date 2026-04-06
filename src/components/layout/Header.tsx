import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoIcon from '@/assets/logo-icon.png';

interface HeaderProps {
  isLoggedIn?: boolean;
}

const Header = ({ isLoggedIn = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = isLoggedIn
    ? [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Create Avatar', href: '/create' },
        { label: 'Docs', href: '/docs' },
      ]
    : [];


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'shadow-sm border-b border-gray-200/60'
          : 'border-b border-transparent'
      }`}
      style={{
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      role="banner"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5" aria-label="AvatarClone home">
            <img src={logoIcon} alt="" className="h-9 w-auto" aria-hidden="true" />
            <span className="font-bold text-lg tracking-tight" style={{ color: '#1E293B' }}>
              Avatar<span style={{ color: '#4F46E5' }}>Clone</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                aria-current={location.pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/pricing"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/pricing'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <Link to="/settings" aria-label="Account settings">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                  A
                </div>
              </Link>
            ) : (
              <>
                <Link to="/docs">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800 font-medium">Docs</Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900 font-medium">Pricing</Button>
                </Link>
                <Link to="/auth" aria-label="Sign in to your account">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900 font-medium">Sign In</Button>
                </Link>
                <Link to="/auth?mode=signup" aria-label="Create a free account">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm shadow-indigo-200 px-5">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-gray-100 bg-white animate-fade-in" role="navigation" aria-label="Mobile navigation">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 min-h-[44px] flex items-center font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/pricing"
                className="py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 min-h-[44px] flex items-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              {!isLoggedIn && (
                <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-100">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full min-h-[44px]">Sign In</Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full min-h-[44px] bg-indigo-600 hover:bg-indigo-700 text-white">Get Started</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
