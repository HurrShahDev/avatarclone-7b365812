import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isLoggedIn?: boolean;
  onToggleTheme?: () => void;
  isDark?: boolean;
}

const Header = ({ isLoggedIn = false, onToggleTheme, isDark = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = isLoggedIn
    ? [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Create Avatar', href: '/create' },
        { label: 'Docs', href: '/docs' },
      ]
    : [
        { label: 'How it works', href: '/#how-it-works' },
        { label: 'Features', href: '/#features' },
        { label: 'Docs', href: '/docs' },
      ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:block">
              <span className="gradient-text">Avatar</span>
              <span className="text-foreground">Clone</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link font-medium ${
                  location.pathname === link.href ? 'active text-foreground' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onToggleTheme}
              className="btn-ghost p-2 rounded-xl"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/settings">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                    A
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/auth" className="btn-ghost">
                  Sign in
                </Link>
                <Link to="/auth?mode=signup" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden glass-card border-t border-border/50 animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-medium text-lg py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-border my-2" />
              <div className="flex items-center gap-4">
                <button
                  onClick={onToggleTheme}
                  className="btn-ghost p-2"
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
              {!isLoggedIn && (
                <div className="flex flex-col gap-3 mt-4">
                  <Link to="/auth" className="btn-secondary text-center">
                    Sign in
                  </Link>
                  <Link to="/auth?mode=signup" className="btn-primary text-center">
                    Get Started
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
