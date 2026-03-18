import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Sparkles, Zap, ArrowLeft } from 'lucide-react';
import IntroVideoPlayer from '@/components/landing/IntroVideoPlayer';
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

/* Realistic eye inside password field — closes when typing */
const PasswordFieldEye = ({ isTyping }: { isTyping: boolean }) => (
  <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
    <div className="relative" style={{ width: 22, height: 14 }}>
      <div
        className="absolute inset-0 rounded-[50%] overflow-hidden transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, hsl(0 0% 98%) 0%, hsl(0 0% 90%) 100%)',
          border: '1.5px solid hsl(var(--muted-foreground) / 0.3)',
          transform: isTyping ? 'scaleY(0.08)' : 'scaleY(1)',
          boxShadow: isTyping ? '0 0 0 transparent' : '0 1px 3px hsl(0 0% 0% / 0.15), inset 0 -1px 2px hsl(0 0% 0% / 0.05)',
        }}
      >
        <div
          className="absolute rounded-full transition-all duration-300"
          style={{
            width: 8, height: 8,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle at 35% 35%, hsl(200 70% 50%), hsl(220 60% 30%))',
            opacity: isTyping ? 0 : 1,
          }}
        >
          <div className="absolute rounded-full" style={{ width: 4, height: 4, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'hsl(0 0% 5%)' }} />
          <div className="absolute rounded-full" style={{ width: 2, height: 2, top: 1, right: 1, background: 'hsl(0 0% 100%)' }} />
        </div>
      </div>
      {isTyping && (
        <div className="absolute w-full top-1/2 -translate-y-1/2">
          <div className="w-full h-px rounded-full animate-fade-in" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--muted-foreground) / 0.5), transparent)' }} />
          <div className="flex justify-center gap-[2px] -mt-[2px]">
            {[4, 5, 6, 5, 4].map((h, i) => (
              <div key={i} className="rounded-full animate-fade-in" style={{ width: 1, height: h, background: 'hsl(var(--muted-foreground) / 0.4)', animationDelay: `${i * 40}ms`, transform: `rotate(${(i - 2) * 12}deg)` }} />
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

/* Blue energy line orbiting around the card border */
const OrbitingLine = ({ cardRef }: { cardRef: React.RefObject<HTMLDivElement> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let rafId: number;
    let progress = 0;
    const speed = 0.002;
    const trailLength = 0.15; // 15% of perimeter

    const animate = () => {
      const card = cardRef.current;
      const canvas = canvasRef.current;
      if (!card || !canvas) { rafId = requestAnimationFrame(animate); return; }

      const w = card.offsetWidth;
      const h = card.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (w + 40) * dpr;
      canvas.height = (h + 40) * dpr;
      canvas.style.width = `${w + 40}px`;
      canvas.style.height = `${h + 40}px`;
      const ctx = canvas.getContext('2d')!;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w + 40, h + 40);

      const perimeter = 2 * (w + h);
      const radius = 8;
      const ox = 20, oy = 20;

      const getPoint = (p: number) => {
        const d = ((p % 1) + 1) % 1 * perimeter;
        if (d < w - radius) return { x: ox + radius + d, y: oy };
        if (d < w - radius + Math.PI * radius / 2) {
          const a = (d - (w - radius)) / radius;
          return { x: ox + w - radius + Math.sin(a) * radius, y: oy + radius - Math.cos(a) * radius };
        }
        const d2 = d - (w - radius + Math.PI * radius / 2);
        if (d2 < h - 2 * radius) return { x: ox + w, y: oy + radius + d2 };
        if (d2 < h - 2 * radius + Math.PI * radius / 2) {
          const a = (d2 - (h - 2 * radius)) / radius;
          return { x: ox + w - radius + Math.cos(a) * radius, y: oy + h - radius + Math.sin(a) * radius };
        }
        const d3 = d2 - (h - 2 * radius + Math.PI * radius / 2);
        if (d3 < w - 2 * radius) return { x: ox + w - radius - d3, y: oy + h };
        if (d3 < w - 2 * radius + Math.PI * radius / 2) {
          const a = (d3 - (w - 2 * radius)) / radius;
          return { x: ox + radius - Math.sin(a) * radius, y: oy + h - radius + Math.cos(a) * radius };
        }
        const d4 = d3 - (w - 2 * radius + Math.PI * radius / 2);
        if (d4 < h - 2 * radius) return { x: ox, y: oy + h - radius - d4 };
        const a = (d4 - (h - 2 * radius)) / radius;
        return { x: ox + radius - Math.cos(a) * radius, y: oy + radius - Math.sin(a) * radius };
      };

      // Draw trail
      const segments = 60;
      for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const p1 = getPoint(progress - t * trailLength);
        const p2 = getPoint(progress - (t + 1 / segments) * trailLength);
        const alpha = (1 - t) * 0.9;
        const lineWidth = (1 - t) * 3 + 0.5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `hsla(210, 100%, 60%, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Draw head glow
      const head = getPoint(progress);
      const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 12);
      glow.addColorStop(0, 'hsla(210, 100%, 70%, 0.8)');
      glow.addColorStop(0.5, 'hsla(210, 100%, 60%, 0.3)');
      glow.addColorStop(1, 'hsla(210, 100%, 60%, 0)');
      ctx.beginPath();
      ctx.arc(head.x, head.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Bright dot at head
      ctx.beginPath();
      ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(210, 100%, 85%)';
      ctx.fill();

      progress += speed;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [cardRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none z-30"
      style={{ left: -20, top: -20 }}
    />
  );
};

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  );
  const [showPassword, setShowPassword] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [typingTimeout, setTypingTimeoutState] = useState<ReturnType<typeof setTimeout> | null>(null);

  const [signInData, setSignInData] = useState({ email: '', password: '', rememberMe: false });
  const [signUpData, setSignUpData] = useState({ fullName: '', email: '', password: '', confirmPassword: '', consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { setMounted(true); }, []);

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

  const handlePasswordChange = (value: string, field: 'password' | 'confirmPassword' = 'password') => {
    setIsTypingPassword(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => setIsTypingPassword(false), 800);
    setTypingTimeoutState(timeout);

    if (field === 'confirmPassword') {
      setSignUpData({ ...signUpData, confirmPassword: value });
    } else if (mode === 'signin') {
      setSignInData({ ...signInData, password: value });
    } else {
      setSignUpData({ ...signUpData, password: value });
    }
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
      if (error.code !== 'auth/popup-closed-by-user') {
        setErrors({ email: error.message });
      }
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
      if (signUpData.password !== signUpData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (getPasswordStrength() < 2) newErrors.password = 'Use at least 8 characters with a number and special character';
      if (!signUpData.consent) newErrors.consent = 'Consent is required';
    } else {
      if (!signInData.email.includes('@')) newErrors.email = 'Enter a valid email';
      if (!signInData.password) newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Back arrow */}
      <div className="w-full px-4 lg:px-8 py-2 z-20 shrink-0">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left Side - Auth Form (40%) */}
        <div className={`w-full lg:w-[40%] flex flex-col items-center justify-center p-4 lg:p-6 relative overflow-visible transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <FloatingOrb delay={0} size={120} x="10%" y="20%" />
          <FloatingOrb delay={2} size={80} x="70%" y="70%" />
          <FloatingOrb delay={4} size={60} x="50%" y="10%" />

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: 'hsl(var(--primary))',
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 4) * 20}%`,
                opacity: 0.2,
                animation: `authParticle ${4 + i * 0.7}s ease-in-out infinite ${i * 0.5}s`,
              }}
            />
          ))}

          <div className="w-full max-w-md relative z-10">
            {/* Logo + site name centered */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src={logo} alt="AvatarClone" className="h-8 w-auto animate-fade-in" style={{ animationDelay: '0.1s' }} />
              <span className="font-bold text-lg tracking-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>AvatarClone</span>
            </div>

            <div ref={cardRef} className="card-simple p-5 lg:p-6 backdrop-blur-sm relative overflow-visible animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {/* Blue orbit line */}
              <OrbitingLine cardRef={cardRef} />

              {/* Glow on password focus */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 pointer-events-none"
                style={{
                  opacity: passwordFocused ? 0.6 : 0,
                  boxShadow: 'inset 0 0 20px hsl(220 60% 55% / 0.1), 0 0 40px hsl(220 60% 55% / 0.05)',
                }}
              />

              {/* Tab switcher */}
              <div className="flex mb-4 p-1 bg-muted rounded-lg relative">
                <div
                  className="absolute top-1 bottom-1 rounded-md bg-background shadow-sm transition-all duration-300 ease-out"
                  style={{ width: 'calc(50% - 4px)', left: mode === 'signin' ? '4px' : 'calc(50%)' }}
                />
                <button onClick={() => switchMode('signin')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors relative z-10 ${mode === 'signin' ? 'text-foreground' : 'text-muted-foreground'}`}>Sign In</button>
                <button onClick={() => switchMode('signup')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors relative z-10 ${mode === 'signup' ? 'text-foreground' : 'text-muted-foreground'}`}>Sign Up</button>
              </div>

              {/* Google auth */}
              <button onClick={handleGoogleSignIn} disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-border hover:bg-muted transition-all duration-200 mb-4 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-medium">Continue with Google</span>
              </button>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center"><span className="px-3 bg-card text-xs text-muted-foreground">or</span></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Full Name (signup only) */}
                <div className={`transition-all duration-500 ${mode === 'signup' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <label className="block text-sm font-medium mb-1.5">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <input type="text" placeholder="Your name" value={signUpData.fullName} onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })} className="input-field pl-10" />
                  </div>
                  {errors.fullName && <p className="text-xs text-destructive mt-1 flex items-center gap-1 animate-fade-in"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <input type="email" placeholder="you@example.com" value={mode === 'signin' ? signInData.email : signUpData.email} onChange={(e) => mode === 'signin' ? setSignInData({ ...signInData, email: e.target.value }) : setSignUpData({ ...signUpData, email: e.target.value })} className="input-field pl-10" />
                  </div>
                  {errors.email && <p className="text-xs text-destructive mt-1 flex items-center gap-1 animate-fade-in"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={mode === 'signin' ? signInData.password : signUpData.password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => { setPasswordFocused(false); setIsTypingPassword(false); }}
                      className="input-field pl-10 pr-16"
                    />
                    <PasswordFieldEye isTyping={isTypingPassword} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {mode === 'signup' && signUpData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div key={level} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${strength >= level ? strengthColors[strength] : 'bg-muted'}`} style={{ transitionDelay: `${level * 80}ms` }} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {strength >= 3 && <Sparkles className="w-3 h-3 text-accent" />}
                        {strengthLabels[strength] || 'Enter password'}
                      </p>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-destructive mt-1 flex items-center gap-1 animate-fade-in"><AlertCircle className="w-3 h-3" /> {errors.password}</p>}
                </div>

                <div className={`transition-all duration-500 ${mode === 'signup' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <input type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" value={signUpData.confirmPassword} onChange={(e) => handlePasswordChange(e.target.value, 'confirmPassword')} className="input-field pl-10 pr-10" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-destructive mt-1 flex items-center gap-1 animate-fade-in"><AlertCircle className="w-3 h-3" /> {errors.confirmPassword}</p>}
                </div>

                {mode === 'signin' && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={signInData.rememberMe} onChange={(e) => setSignInData({ ...signInData, rememberMe: e.target.checked })} className="w-4 h-4 rounded border-border" />
                      <span className="text-sm text-muted-foreground">Remember me</span>
                    </label>
                    <a href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</a>
                  </div>
                )}

                {mode === 'signup' && (
                  <div>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" checked={signUpData.consent} onChange={(e) => setSignUpData({ ...signUpData, consent: e.target.checked })} className="w-4 h-4 rounded border-border mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        I consent to the processing of my voice and photo.{' '}
                        <a href="/privacy" className="text-primary hover:underline">Privacy</a> &{' '}
                        <a href="/terms" className="text-primary hover:underline">Terms</a>
                      </span>
                    </label>
                    {errors.consent && <p className="text-xs text-destructive mt-1 flex items-center gap-1 animate-fade-in"><AlertCircle className="w-3 h-3" /> {errors.consent}</p>}
                  </div>
                )}

                <Button type="submit" className="w-full relative overflow-hidden group" disabled={isLoading}>
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <Zap className="w-4 h-4" />}
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
          style={{ background: 'linear-gradient(135deg, hsl(220 25% 8%) 0%, hsl(240 20% 12%) 50%, hsl(220 30% 10%) 100%)' }}
        >
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(hsl(220 60% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 60% 55%) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full opacity-20 blur-[100px]" style={{ background: 'hsl(220 80% 55%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-[80px]" style={{ background: 'hsl(270 60% 55%)' }} />

          <div className="relative z-10 text-center px-8 max-w-2xl w-full">
            <h2 className="text-3xl xl:text-4xl font-bold mb-6 leading-tight" style={{ color: 'hsl(0 0% 95%)' }}>
              CREATE PERSONALIZED<br />AI AVATAR VIDEOS
            </h2>

            <div className="relative mx-auto w-full max-w-lg aspect-video shadow-2xl">
              <IntroVideoPlayer />
            </div>
          </div>

          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 rounded-full" style={{ background: 'hsl(220 60% 60%)', left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%`, opacity: 0.3, animation: `floatOrb ${5 + i * 1.5}s ease-in-out infinite ${i * 0.8}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auth;
