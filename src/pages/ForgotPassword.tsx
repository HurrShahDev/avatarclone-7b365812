import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      // Detect how the account was created so we can guide the user.
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email.trim());
        if (methods.length > 0 && !methods.includes('password')) {
          // Account exists but uses a federated provider (e.g. google.com)
          const provider = methods[0].replace('.com', '');
          setInfo(
            `This account was created with ${provider.charAt(0).toUpperCase() + provider.slice(1)}. Please sign in using "Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}" on the sign-in page.`
          );
          setLoading(false);
          return;
        }
      } catch {
        /* ignore — fall through to send reset */
      }

      await sendPasswordResetEmail(auth, email.trim());
      setSent(true);
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/user-not-found') setError('No account found with this email.');
      else if (code === 'auth/invalid-email') setError('Please enter a valid email address.');
      else if (code === 'auth/too-many-requests') setError('Too many attempts. Please try again later.');
      else setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 50%, #E0E7FF 100%)' }}
    >
      <Link to="/auth" className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Sign In
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#0F172A' }}>Reset your password</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter the email associated with your account and we'll send you a link to reset your password.
        </p>

        {sent ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-500" />
            <p className="font-medium text-gray-900 mb-1">Check your inbox</p>
            <p className="text-sm text-gray-500 mb-6">
              We sent a password reset link to <strong>{email}</strong>.
            </p>
            <Link to="/auth">
              <Button className="w-full" style={{ background: 'linear-gradient(135deg, #4338CA, #4F46E5)' }}>
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1E293B' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
              {error && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {error}
                </p>
              )}
              {info && (
                <p className="mt-2 text-xs text-indigo-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {info}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              style={{ background: 'linear-gradient(135deg, #4338CA, #4F46E5)' }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
