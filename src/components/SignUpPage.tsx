import React, { useState } from 'react';
import { ArrowLeft, Github, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, formData.username);
      
      if (error) {
        setError(error.message);
      } else {
        // Success - redirect to home
        navigate('/');
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
          <a href="/" className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors">
            <ArrowLeft className="size-5" />
            <span className="text-sm font-medium">Back to Daxly</span>
          </a>
          <a className="flex items-center" href="/">
            <span className="font-display text-foreground text-2xl">Daxly</span>
          </a>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
          <div className="w-full max-w-lg">
            {/* Sign Up Form */}
            <div className="glass-strong border border-border/30 rounded-2xl p-8 shadow-premium-xl hover-lift-subtle">
              <div className="text-center mb-8">
                <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 text-shimmer">
                  Join Daxly
                </h1>
                <p className="font-body text-muted-foreground text-lg leading-relaxed">
                  Start building amazing web apps with AI
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 glass border border-red-500/30 rounded-xl">
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Social Sign Up */}
              <div className="space-y-3 mb-8">
                <button 
                  disabled={loading}
                  className="btn-premium w-full flex items-center justify-center gap-3 px-6 py-4 glass border border-border/50 rounded-xl hover:bg-accent/30 transition-all duration-300 text-foreground disabled:opacity-50 disabled:cursor-not-allowed shadow-premium hover-lift-subtle"
                >
                  <Github className="size-5" />
                  <span className="font-medium">Continue with GitHub</span>
                </button>
                <button 
                  disabled={loading}
                  className="btn-premium w-full flex items-center justify-center gap-3 px-6 py-4 glass border border-border/50 rounded-xl hover:bg-accent/30 transition-all duration-300 text-foreground disabled:opacity-50 disabled:cursor-not-allowed shadow-premium hover-lift-subtle"
                >
                  <Mail className="size-5" />
                  <span className="font-medium">Continue with Google</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-6 glass rounded-full py-2 text-muted-foreground font-medium border border-border/30">
                    or continue with email
                  </span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-foreground mb-3">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 glass border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 font-body shadow-premium focus-premium"
                    placeholder="Choose a username"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-3">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 glass border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 font-body shadow-premium focus-premium"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 pr-14 glass border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 font-body shadow-premium focus-premium"
                      placeholder="Create a password"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-accent/30"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-foreground mb-3">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 glass border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 font-body shadow-premium focus-premium"
                    placeholder="Confirm your password"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1.5 size-5 rounded-lg border-border/50 glass text-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    required
                    disabled={loading}
                  />
                  <label htmlFor="agreeToTerms" className="font-body text-muted-foreground leading-relaxed">
                    I agree to the{' '}
                    <a href="/terms" className="text-primary hover:underline font-medium transition-colors">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-primary hover:underline font-medium transition-colors">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-premium w-full bg-primary text-primary-foreground py-4 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-premium hover-lift text-lg"
                >
                  {loading && <Loader2 className="size-5 animate-spin" />}
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              {/* Sign In Link */}
              <div className="text-center mt-8">
                <p className="font-body text-muted-foreground">
                  Already have an account?{' '}
                  <a href="/login" className="text-primary hover:underline font-semibold transition-colors">
                    Sign in
                  </a>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                By signing up, you agree to our Terms of Service and Privacy Policy. 
                We'll help you build amazing web apps with AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;