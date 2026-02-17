import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Play, Sparkles, Zap } from 'lucide-react';
import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const FloatingOrb = ({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) => (
  <div
    className="absolute rounded-full opacity-20 blur-xl"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: 'linear-gradient(135deg, hsl(220 60% 55%), hsl(270 60% 55%))',
      animation: `floatOrb ${6 + delay}s ease-in-out infinite ${delay}s`,
    }}
  />
);

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [signInData, setSignInData] = useState({ email: '', password: '', rememberMe: false });
  const [signUpData, setSignUpData] = useState({ fullName: '', email: '', password: '', confirmPassword: '', consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const m = searchParams.get('mode');
    if (m === 'signup') setMode('signup');
  }, [searchParams]);

  const switchMode = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const getPasswordStrength = () => {
    const password = mode === 'signup' ? signUpData.password : signInData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', 'bg-destructive', 'bg-yellow-500', 'bg-accent/70', 'bg-accent'];

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error: any) {
      setErrors({ email: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (mode === 'signup') {
      if (!signUpData.fullName.trim()) newErrors.fullName = 'Name is required';
      if (!signUpData.email.includes('@')) newErrors.email = 'Enter a valid email';
      if (signUpData.password !== signUpData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (getPasswordStrength() < 2) {
        newErrors.password = 'Use at least 8 characters with a number and special character';
      }
      if (!signUpData.consent) {
        newErrors.consent = 'Consent is required';
      }
    } else {
      if (!signInData.email.includes('@')) newErrors.email = 'Enter a valid email';
      if (!signInData.password) newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password);
        await updateProfile(userCredential.user, { displayName: signUpData.fullName });
        setSignUpData({ fullName: '', email: '', password: '', confirmPassword: '', consent: false });
        switchMode('signin');
      } else {
        await signInWithEmailAndPassword(auth, signInData.email, signInData.password);
        navigate('/');
      }
    } catch (error: any) {
      const code = error.code || '';
      if (mode === 'signin') {
        if (code === 'auth/user-not-found') setErrors({ email: 'No account found with this email' });
        else if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') setErrors({ password: 'Incorrect email or password' });
        else if (code === 'auth/too-many-requests') setErrors({ email: 'Too many attempts. Please try again later.' });
        else setErrors({ email: error.message });
      } else {
        if (code === 'auth/email-already-in-use') setErrors({ email: 'An account with this email already exists' });
        else if (code === 'auth/weak-password') setErrors({ password: 'Password is too weak' });
        else setErrors({ email: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Auth Form (40%) */}
      <div
        className={`w-full lg:w-[40%] flex flex-col justify-center p-6 lg:p-12 relative overflow-hidden transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
      >
        {/* Floating orbs background */}
        <FloatingOrb delay={0} size={120} x="10%" y="20%" />
        <FloatingOrb delay={2} size={80} x="70%" y="70%" />
        <FloatingOrb delay={4} size={60} x="50%" y="10%" />

        <div className="w-full max-w-md mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <img src={logo} alt="AvatarClone" className="h-10 w-auto" />
            <span className="font-semibold text-lg">AvatarClone</span>
          </div>

          <div className="card-simple p-6 lg:p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Animated border glow */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 pointer-events-none"
              style={{
                opacity: passwordFocused ? 0.6 : 0,
                boxShadow: `inset 0 0 20px hsl(220 60% 55% / 0.1), 0 0 40px hsl(220 60% 55% / 0.05)`,
              }}
            />

            {/* Tab switcher */}
            <div className="flex mb-6 p-1 bg-muted rounded-lg relative">
              <div
                className="absolute top-1 bottom-1 rounded-md bg-background shadow-sm transition-all duration-300 ease-out"
                style={{
                  width: 'calc(50% - 4px)',
                  left: mode === 'signin' ? '4px' : 'calc(50%)',
                }}
              />
              <button
                onClick={() => switchMode('signin')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors relative z-10 ${mode === 'signin' ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors relative z-10 ${mode === 'signup' ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Sign Up
              </button>
            </div>

            {/* Google auth */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-border hover:bg-muted transition-all duration-200 mb-4 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-card text-xs text-muted-foreground">or</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form fields with staggered animations */}
              <div className={`transition-all duration-500 ${mode === 'signup' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                    className="input-field pl-10"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1 animate-fade-in">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={mode === 'signin' ? signInData.email : signUpData.email}
                    onChange={(e) =>
                      mode === 'signin'
                        ? setSignInData({ ...signInData, email: e.target.value })
                        : setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    className="input-field pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1 animate-fade-in">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={mode === 'signin' ? signInData.password : signUpData.password}
                    onChange={(e) =>
                      mode === 'signin'
                        ? setSignInData({ ...signInData, password: e.target.value })
                        : setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="input-field pl-10 pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === 'signup' && signUpData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${strength >= level ? strengthColors[strength] : 'bg-muted'}`}
                          style={{ transitionDelay: `${level * 80}ms` }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {strength >= 3 && <Sparkles className="w-3 h-3 text-accent" />}
                      {strengthLabels[strength] || 'Enter password'}
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1 animate-fade-in">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </p>
                )}
              </div>

              <div className={`transition-all duration-500 ${mode === 'signup' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                    className="input-field pl-10 pr-10"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1 animate-fade-in">
                    <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                  </p>
                )}
              </div>

              {mode === 'signin' && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={signInData.rememberMe}
                      onChange={(e) => setSignInData({ ...signInData, rememberMe: e.target.checked })}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <a href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</a>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={signUpData.consent}
                      onChange={(e) => setSignUpData({ ...signUpData, consent: e.target.checked })}
                      className="w-4 h-4 rounded border-border mt-0.5"
                    />
                    <span className="text-sm text-muted-foreground">
                      I consent to the processing of my voice and photo.{' '}
                      <a href="/privacy" className="text-primary hover:underline">Privacy</a> &{' '}
                      <a href="/terms" className="text-primary hover:underline">Terms</a>
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1 animate-fade-in">
                      <AlertCircle className="w-3 h-3" /> {errors.consent}
                    </p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className="w-full relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  {isLoading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Promo (60%) */}
      <div
        className={`hidden lg:flex lg:w-[60%] relative overflow-hidden flex-col items-center justify-center transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
        style={{
          background: 'linear-gradient(135deg, hsl(220 25% 8%) 0%, hsl(240 20% 12%) 50%, hsl(220 30% 10%) 100%)',
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(hsl(220 60% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 60% 55%) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full opacity-20 blur-[100px]" style={{ background: 'hsl(220 80% 55%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-[80px]" style={{ background: 'hsl(270 60% 55%)' }} />

        {/* Content */}
        <div className="relative z-10 text-center px-8 max-w-2xl">
          <h2 className="text-3xl xl:text-4xl font-bold mb-3 leading-tight" style={{ color: 'hsl(0 0% 95%)' }}>
            CREATE PERSONALIZED<br />AI AVATAR VIDEOS
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: 'hsl(220 15% 65%)' }}>
            Transform your ideas, voice and face into<br />synchronized talking avatar videos
          </p>

          {/* Video Placeholder */}
          <div className="relative mx-auto w-full max-w-lg aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid hsl(220 20% 20%)' }}>
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, hsl(220 20% 14%) 0%, hsl(240 15% 18%) 100%)',
              }}
            />
            {/* Scan line animation */}
            <div
              className="absolute left-0 right-0 h-px opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(220 80% 60%), transparent)',
                animation: 'scanLine 4s linear infinite',
              }}
            />
            {/* Play icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, hsl(220 60% 50%), hsl(270 50% 50%))',
                  boxShadow: '0 0 30px hsl(220 60% 50% / 0.3)',
                }}
              >
                <Play className="w-6 h-6 ml-1" style={{ color: 'white' }} fill="white" />
              </div>
            </div>
            {/* Corner brackets */}
            <svg className="absolute top-3 left-3 w-6 h-6 opacity-30" viewBox="0 0 24 24" fill="none" stroke="hsl(220 60% 60%)" strokeWidth="1.5">
              <path d="M1 8V1h7" />
            </svg>
            <svg className="absolute top-3 right-3 w-6 h-6 opacity-30" viewBox="0 0 24 24" fill="none" stroke="hsl(220 60% 60%)" strokeWidth="1.5">
              <path d="M23 8V1h-7" />
            </svg>
            <svg className="absolute bottom-3 left-3 w-6 h-6 opacity-30" viewBox="0 0 24 24" fill="none" stroke="hsl(220 60% 60%)" strokeWidth="1.5">
              <path d="M1 16v7h7" />
            </svg>
            <svg className="absolute bottom-3 right-3 w-6 h-6 opacity-30" viewBox="0 0 24 24" fill="none" stroke="hsl(220 60% 60%)" strokeWidth="1.5">
              <path d="M23 16v7h-7" />
            </svg>
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'hsl(220 60% 60%)',
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              opacity: 0.3,
              animation: `floatOrb ${5 + i * 1.5}s ease-in-out infinite ${i * 0.8}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Auth;
