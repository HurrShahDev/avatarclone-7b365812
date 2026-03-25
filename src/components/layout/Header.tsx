import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

interface HeaderProps {
  isLoggedIn?: boolean;
}

const Header = ({ isLoggedIn = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm shadow-sm border-b border-border'
          : 'bg-background border-b border-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2" aria-label="AvatarClone home">
            <img src={logo} alt="" className="h-8 w-auto" aria-hidden="true" />
            <span className="font-semibold text-foreground text-base">AvatarClone</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link text-sm py-1 ${
                  location.pathname === link.href ? 'active' : ''
                }`}
                aria-current={location.pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <Link to="/settings" aria-label="Account settings">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                  A
                </div>
              </Link>
            ) : (
              <>
                <Link to="/docs">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Docs</Button>
                </Link>
                <Link to="/auth" aria-label="Sign in to your account">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
                <Link to="/auth?mode=signup" aria-label="Create a free account">
                  <Button size="sm">Get Started</Button>
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
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background animate-fade-in" role="navigation" aria-label="Mobile navigation">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="py-2 text-foreground min-h-[44px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!isLoggedIn && (
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full min-h-[44px]">Sign In</Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full min-h-[44px]">Get Started</Button>
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
