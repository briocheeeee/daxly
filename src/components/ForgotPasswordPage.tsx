import React, { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        setError(error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(''); // Clear error when user types
  };

  const handleResendEmail = async () => {
    setError('');
    setLoading(true);

    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark" style={{ colorScheme: 'dark' }}>
      <div className="min-h-screen bg-background">
        {/* Background matching home page */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-background via-background to-background">
          <div className="fixed inset-0 hidden bg-gradient-to-b from-black via-[hsl(0,0%,9%)]/90 to-black dark:block">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-emerald-950/5 to-transparent opacity-25"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDIiLz48L3N2Zz4=')]"></div>
          </div>
          <div className="fixed inset-0 bg-gradient-to-b from-white via-[hsl(0,0%,98%)]/5 to-white dark:hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/30 via-amber-50/20 to-transparent opacity-70"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDIiLz48L3N2Zz4=')]"></div>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6">
          <a href="/login" className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors">
            <ArrowLeft className="size-5" />
            <span className="text-sm font-medium">Back to Login</span>
          </a>
          <a className="flex items-center" href="/">
            <span className="font-display text-foreground text-2xl">Daxly</span>
          </a>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <div className="w-full max-w-lg">
            {/* Forgot Password Form */}
            <div className="glass-strong border border-border/30 rounded-2xl p-8 shadow-premium-xl hover-lift-subtle">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-8">
                    <div className="mx-auto w-20 h-20 glass rounded-2xl flex items-center justify-center mb-6 border border-border/30 shadow-premium">
                      <Mail className="size-10 text-primary" />
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 text-shimmer">
                      Forgot password?
                    </h1>
                    <p className="font-body text-muted-foreground text-lg leading-relaxed">
                      No worries, we'll send you reset instructions
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 glass border border-red-500/30 rounded-xl">
                      <p className="text-red-400 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-3">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 glass border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 font-body shadow-premium focus-premium"
                        placeholder="Enter your email"
                        required
                        disabled={loading}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-premium w-full bg-primary text-primary-foreground py-4 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-premium hover-lift text-lg"
                    >
                      {loading && <Loader2 className="size-5 animate-spin" />}
                      {loading ? 'Sending...' : 'Reset password'}
                    </button>
                  </form>

                  <div className="text-center mt-8">
                    <a href="/login" className="font-body text-muted-foreground hover:text-foreground transition-colors">
                      ← Back to login
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="mx-auto w-20 h-20 glass rounded-2xl flex items-center justify-center mb-6 border border-green-500/30 shadow-premium bg-green-500/10">
                      <CheckCircle className="size-10 text-green-400" />
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 text-shimmer">
                      Check your email
                    </h1>
                    <p className="font-body text-muted-foreground text-lg leading-relaxed mb-4">
                      We sent a password reset link to
                    </p>
                    <p className="text-foreground font-semibold text-lg">{email}</p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 glass border border-red-500/30 rounded-xl">
                      <p className="text-red-400 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <button
                      onClick={handleResendEmail}
                      disabled={loading}
                      className="btn-premium w-full bg-primary text-primary-foreground py-4 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-premium hover-lift text-lg"
                    >
                      {loading && <Loader2 className="size-5 animate-spin" />}
                      {loading ? 'Sending...' : 'Resend email'}
                    </button>

                    <div className="text-center">
                      <a href="/login" className="font-body text-muted-foreground hover:text-foreground transition-colors">
                        ← Back to login
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary hover:underline font-medium transition-colors"
                  disabled={loading}
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;