import React, { useState, useRef, useEffect } from 'react';
import { Briefcase as BriefcaseBusiness, BookText, User, LogOut, Settings, HelpCircle, Crown, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const TopNavigation = () => {
  const { user, signOut, loading } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-16 fixed right-4 z-10 flex items-center gap-2 text-sm md:right-12">
      <a 
        rel="noopener noreferrer" 
        className="btn-premium relative inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent/50 hover:text-foreground active:bg-accent hover:border-border/50 border border-transparent px-3 py-1.5 h-8 rounded-lg text-sm shadow-premium w-8 overflow-hidden md:w-auto text-white font-medium hover-lift" 
        href="/careers"
      >
        <BriefcaseBusiness className="size-4 md:hidden" />
        <span className="hidden font-medium md:inline">Careers</span>
      </a>
      <a 
        className="btn-premium relative inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent/50 hover:text-foreground active:bg-accent hover:border-border/50 border border-transparent px-3 py-1.5 h-8 rounded-lg text-sm shadow-premium w-8 overflow-hidden md:w-auto text-white font-medium hover-lift" 
        href="/docs"
      >
        <BookText className="size-4 md:hidden" />
        <span className="hidden font-medium md:inline">Docs</span>
      </a>
      
      {!loading && (
        <>
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-2.5 py-1.5 glass rounded-lg border border-border/50 hover:bg-accent/30 transition-all duration-200 shadow-premium hover-lift"
              >
                <div className="w-6 h-6 bg-primary/20 rounded-md flex items-center justify-center">
                  <User className="size-3 text-primary" />
                </div>
                <span className="font-medium text-foreground text-sm">
                  {user.user_metadata?.username || user.email?.split('@')[0] || 'User'}
                </span>
                <ChevronDown className={`size-3 text-muted-foreground transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {showProfileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowProfileMenu(false)}
                  ></div>
                  
                  <div className="absolute top-full right-0 mt-2 glass border border-border/50 rounded-xl shadow-premium-lg p-2 min-w-[200px] z-50">
                    <div className="px-3 py-2.5 border-b border-border/30">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <User className="size-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate text-sm">
                            {user.user_metadata?.username || user.email?.split('@')[0] || 'User'}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          console.log('Navigate to Dashboard');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 font-medium"
                      >
                        <LayoutDashboard className="size-4" />
                        Dashboard
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          console.log('Navigate to Upgrade');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 font-medium"
                      >
                        <Crown className="size-4" />
                        Upgrade
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          console.log('Navigate to Settings');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 font-medium"
                      >
                        <Settings className="size-4" />
                        Settings
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          console.log('Navigate to Help');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 font-medium"
                      >
                        <HelpCircle className="size-4" />
                        Help
                      </button>
                    </div>

                    <div className="border-t border-border/30 my-1"></div>

                    <div className="py-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 font-medium"
                      >
                        <LogOut className="size-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <a className="btn-premium relative inline-flex items-center justify-center gap-1 whitespace-nowrap transition-all duration-200 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent/50 hover:text-foreground active:bg-accent hover:border-border/50 border border-transparent px-3 py-1.5 h-8 rounded-lg text-sm font-medium shadow-premium text-white hover-lift" href="/login">
                Log in
              </a>
              <a className="btn-premium relative inline-flex items-center justify-center gap-1 whitespace-nowrap transition-all duration-200 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 h-8 rounded-lg text-sm font-medium shadow-premium hover-lift" href="/signup">
                Sign up
              </a>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TopNavigation;