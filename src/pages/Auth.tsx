import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Github, Mail, Lock, User, AlertCircle } from 'lucide-react';
import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Separate state for each mode so they don't overwrite each other
  const [signInData, setSignInData] = useState({ email: '', password: '', rememberMe: false });
  const [signUpData, setSignUpData] = useState({ fullName: '', email: '', password: '', confirmPassword: '', consent: false });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          signUpData.email,
          signUpData.password
        );
        await updateProfile(userCredential.user, {
          displayName: signUpData.fullName,
        });
        setSignUpData({ fullName: '', email: '', password: '', confirmPassword: '', consent: false });
        switchMode('signin');
      } else {
        await signInWithEmailAndPassword(auth, signInData.email, signInData.password);
        navigate('/home');
      }
    } catch (error: any) {
      const code = error.code || '';
      if (mode === 'signin') {
        if (code === 'auth/user-not-found') {
          setErrors({ email: 'No account found with this email' });
        } else if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
          setErrors({ password: 'Incorrect email or password' });
        } else if (code === 'auth/too-many-requests') {
          setErrors({ email: 'Too many attempts. Please try again later.' });
        } else {
          setErrors({ email: error.message });
        }
      } else {
        if (code === 'auth/email-already-in-use') {
          setErrors({ email: 'An account with this email already exists' });
        } else if (code === 'auth/weak-password') {
          setErrors({ password: 'Password is too weak' });
        } else {
          setErrors({ email: error.message });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <img src={logo} alt="AvatarClone" className="h-12 w-auto" />
            <span className="font-semibold text-xl">AvatarClone</span>
          </div>

          <div className="card-simple p-6 lg:p-8">
            <div className="flex mb-6 p-1 bg-muted rounded-lg">
              <button
                onClick={() => switchMode('signin')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  mode === 'signin' ? 'bg-background shadow-sm' : 'text-muted-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  mode === 'signup' ? 'bg-background shadow-sm' : 'text-muted-foreground'
                }`}
              >
                Sign Up
              </button>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-border hover:bg-muted transition-colors mb-4">
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">Continue with GitHub</span>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-card text-xs text-muted-foreground">or</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={signUpData.fullName}
                      onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                      className="input-field pl-10"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={mode === 'signin' ? signInData.password : signUpData.password}
                    onChange={(e) =>
                      mode === 'signin'
                        ? setSignInData({ ...signInData, password: e.target.value })
                        : setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    className="input-field pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === 'signup' && signUpData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full ${
                            getPasswordStrength() >= level ? strengthColors[getPasswordStrength()] : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {strengthLabels[getPasswordStrength()] || 'Enter password'}
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      className="input-field pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

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
                  <a href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
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
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.consent}
                    </p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
