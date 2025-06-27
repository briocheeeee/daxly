/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        input: 'hsl(var(--input))',
        border: 'hsl(var(--border))',
        sidebar: 'hsl(var(--sidebar))',
      },
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
        heading: ['Lexend', 'sans-serif'],
        body: ['Lexend', 'sans-serif'],
      },
      fontWeight: {
        'display': '900',
        'heading': '800',
        'subheading': '700',
        'semibold': '600',
        'medium': '500',
        'body': '400',
        'light': '300',
        'extralight': '200',
        'thin': '100',
      },
      spacing: {
        '20.5': '5.125rem',
        '4.75': '1.1875rem',
        '0.25': '0.0625rem',
        '11.5': '2.875rem',
        '5.5': '1.375rem',
      },
      animation: {
        spinner: 'spinner 1.2s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        rainbow: 'rainbow 6s ease-in-out infinite',
      },
      keyframes: {
        spinner: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.15' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        rainbow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '200% 50%' },
          '75%': { backgroundPosition: '300% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.03em',
        'snug': '-0.02em',
        'normal': '-0.01em',
        'wide': '-0.005em',
      },
    },
  },
  plugins: [],
};