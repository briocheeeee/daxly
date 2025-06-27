import React from 'react';
import { ArrowLeft, BookOpen, Code, Zap, Layers, Globe, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';

const DocsPage = () => {
  const sections = [
    {
      title: 'Getting Started',
      icon: <Zap className="size-5" />,
      items: [
        { title: 'Quick Start Guide', description: 'Get up and running in minutes' },
        { title: 'Your First Project', description: 'Build your first app with AI' },
        { title: 'Understanding Prompts', description: 'Learn how to communicate with AI' },
        { title: 'Project Structure', description: 'How Daxly organizes your code' }
      ]
    },
    {
      title: 'Core Concepts',
      icon: <Layers className="size-5" />,
      items: [
        { title: 'AI-Driven Development', description: 'How AI assists in coding' },
        { title: 'Component Architecture', description: 'Building modular applications' },
        { title: 'State Management', description: 'Managing application state' },
        { title: 'Styling & Theming', description: 'Creating beautiful interfaces' }
      ]
    },
    {
      title: 'Advanced Features',
      icon: <Code className="size-5" />,
      items: [
        { title: 'Custom Components', description: 'Building reusable components' },
        { title: 'API Integration', description: 'Connecting to external services' },
        { title: 'Database Setup', description: 'Working with Supabase' },
        { title: 'Authentication', description: 'User management and security' }
      ]
    },
    {
      title: 'Deployment',
      icon: <Globe className="size-5" />,
      items: [
        { title: 'Deploy to Production', description: 'Launch your app to the world' },
        { title: 'Custom Domains', description: 'Use your own domain name' },
        { title: 'Environment Variables', description: 'Managing configuration' },
        { title: 'Performance Optimization', description: 'Making your app fast' }
      ]
    }
  ];

  const quickLinks = [
    { title: 'API Reference', href: '#', icon: <Code className="size-4" /> },
    { title: 'Examples Gallery', href: '#', icon: <Sparkles className="size-4" /> },
    { title: 'Community Forum', href: '#', icon: <Globe className="size-4" /> },
    { title: 'GitHub Repository', href: '#', icon: <ExternalLink className="size-4" /> }
  ];

  return (
    <div className="dark" style={{ colorScheme: 'dark' }}>
      <div className="min-h-screen bg-background">
        {/* Precise Background */}
        <div className="fixed inset-0 z-0 bg-background">
          <div className="fixed inset-0 hidden bg-gradient-to-b from-black via-black to-black dark:block">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/15 via-transparent to-transparent opacity-30"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDEiLz48L3N2Zz4=')]"></div>
          </div>
          <div className="fixed inset-0 bg-gradient-to-b from-white via-white to-white dark:hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/20 via-transparent to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDEiLz48L3N2Zz4=')]"></div>
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
        <div className="relative z-10 px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="mx-auto w-20 h-20 glass rounded-2xl flex items-center justify-center mb-8 border border-border/30 shadow-premium">
                <BookOpen className="size-10 text-primary" />
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 text-shimmer">
                Documentation
              </h1>
              <p className="font-body text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
                Everything you need to build amazing web applications with AI. 
                From getting started to advanced deployment strategies.
              </p>
            </div>

            {/* Quick Links */}
            <div className="mb-16">
              <h2 className="font-heading text-2xl text-foreground mb-6 text-center">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="btn-premium glass border border-border/30 rounded-xl p-4 hover:bg-accent/30 transition-all duration-300 shadow-premium hover-lift-subtle group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-primary group-hover:scale-110 transition-transform">
                        {link.icon}
                      </div>
                      <span className="font-medium text-foreground">{link.title}</span>
                      <ChevronRight className="size-4 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Documentation Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="glass-strong border border-border/30 rounded-2xl p-6 shadow-premium-xl hover-lift-subtle"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-primary">
                      {section.icon}
                    </div>
                    <h3 className="font-heading text-xl text-foreground">{section.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <a
                        key={itemIndex}
                        href="#"
                        className="block p-3 glass border border-border/30 rounded-lg hover:bg-accent/30 transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {item.title}
                            </h4>
                            <p className="font-body text-muted-foreground text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all flex-shrink-0 mt-0.5" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Getting Help Section */}
            <div className="mt-16 text-center">
              <div className="glass-strong border border-border/30 rounded-2xl p-8 shadow-premium-xl max-w-2xl mx-auto">
                <h3 className="font-heading text-2xl text-foreground mb-4">Need Help?</h3>
                <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                  Can't find what you're looking for? Our community and support team are here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://discord.gg/uPHXE2JsK4"
                    className="btn-premium bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-premium hover-lift"
                  >
                    Join Discord Community
                  </a>
                  <a
                    href="#"
                    className="btn-premium glass border border-border/50 px-6 py-3 rounded-xl font-semibold text-foreground hover:bg-accent/30 transition-all duration-300 shadow-premium hover-lift-subtle"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;