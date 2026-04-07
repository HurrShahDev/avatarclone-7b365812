import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoIcon from '@/assets/logo-icon.png';
import { useAuth } from '@/hooks/use-auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, getInitials } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-sm border-b border-gray-200/60' : 'border-b border-transparent'
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
            {/* Empty for non-logged-in, could add nav links */}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, #4338CA, #6366F1)' }}
                  >
                    {getInitials()}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {showProfileMenu && (
                  <div
                    className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in"
                    style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
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
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-fade-in" role="navigation">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-1">
              <Link to="/pricing" className="py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 min-h-[44px] flex items-center font-medium" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
              {user ? (
                <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-100">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 py-2.5 px-3 text-red-600 hover:bg-red-50 rounded-lg min-h-[44px]"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
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
