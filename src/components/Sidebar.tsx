import React, { useState, useRef, useEffect } from 'react';
import { Plus, LogIn, User, LogOut, Settings, HelpCircle, Crown, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
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
    <div className="text-foreground group peer hidden md:block" data-state="collapsed" data-collapsible="offcanvas" data-variant="sidebar" data-side="left">
      <div className="w-(--sidebar-width) relative h-svh bg-transparent transition-[width] duration-200 group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180 group-data-[collapsible=icon]:w-(--sidebar-width-icon)"></div>
      <div className="w-(--sidebar-width) fixed inset-y-0 z-20 hidden h-svh transition-[left,right,width] duration-100 md:flex left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r border-border/30 pb-3">
        <div data-sidebar="sidebar" className="bg-sidebar/50 backdrop-blur-xl group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-premium">
          <div data-sidebar="header" className="flex flex-col gap-3 p-3 px-0 pt-0">
            <div className="mb-3 mt-8 flex h-[16px] items-center justify-center">
              <a className="flex items-center group" href="/">
                <div style={{ opacity: 1 }} className="transition-all duration-200 group-hover:scale-105">
                  <span className="font-display text-foreground text-2xl">Daxly</span>
                </div>
              </a>
            </div>
            <div className="mb-2 flex flex-col items-center justify-center px-4">
              <a href="/" className="btn-premium relative inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm transition-all duration-200 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent/50 active:bg-accent px-3 py-2 bg-input/50 border border-border/50 group aspect-square shadow-premium size-10 rounded-lg hover-lift" data-state="closed">
                <div>
                  <Plus className="size-4" />
                </div>
              </a>
            </div>
          </div>
          
          <div data-sidebar="content" className="flex h-[calc(100vh-var(--header-height)-var(--footer-height))] flex-col gap-3 flex-1 overflow-y-auto overflow-x-hidden px-4">
            <div className="mb-4 glass rounded-lg border border-border/50 mx-auto flex flex-col items-center p-2 shadow-premium">
              <div className="flex flex-col items-center gap-1">
                <a href="https://x.com/daxlydev" target="_blank" rel="noopener noreferrer" className="hover:bg-accent/50 flex items-center justify-center rounded-lg p-1.5 transition-all duration-200 hover-lift" data-state="closed">
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                <a href="https://discord.gg/tHh9k2kyF6" target="_blank" rel="noopener noreferrer" className="hover:bg-accent/50 flex items-center justify-center rounded-lg p-1.5 transition-all duration-200 hover-lift" data-state="closed">
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.977-.608 1.414a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.415.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"></path>
                  </svg>
                </a>
                <a href="#" className="hover:bg-accent/50 flex items-center justify-center rounded-lg p-1.5 transition-all duration-200 hover-lift" data-state="closed">
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 0 0 .193-.066l2.378-1.388a.544.544 0 0 1 .261-.074c.05 0 .099.008.146.023a9.312 9.312 0 0 0 2.646.387c.446 0 .882-.04 1.309-.109-.41-.965-.647-2.022-.647-3.142 0-4.057 3.894-7.345 8.698-7.345.328 0 .65.019.968.05C18.197 3.764 13.933 2.188 8.691 2.188zm.134 3.219a1.031 1.031 0 0 1 1.036 1.022c0 .565-.461 1.022-1.036 1.022-.573 0-1.035-.457-1.035-1.022 0-.564.462-1.022 1.035-1.022zm4.342 0a1.03 1.03 0 0 1 1.035 1.022c0 .565-.462 1.022-1.035 1.022-.574 0-1.036-.457-1.036-1.022 0-.564.462-1.022 1.036-1.022zm5.177 2.126c-4.244 0-7.691 2.897-7.691 6.456 0 3.559 3.447 6.455 7.691 6.455.446 0 .88-.035 1.308-.103a.423.423 0 0 1 .351.057c.099.068.205.122.313.174l1.89 1.06a.25.25 0 0 0 .15.041c.15 0 .28-.13.28-.285v-.09c0-.065-.02-.13-.02-.196l-.337-1.333a.541.541 0 0 1 .205-.56c1.629-1.192 2.731-2.95 2.731-4.95 0-3.559-3.447-6.456-7.691-6.456h-.18zm-2.953 3.181a.93.93 0 0 1 .925.917c0 .508-.413.917-.925.917-.51 0-.924-.409-.924-.917 0-.508.413-.917.924-.917zm6.079 0a.93.93 0 0 1 .924.917c0 .508-.413.917-.924.917-.512 0-.925-.409-.925-.917 0-.508.413-.917.925-.917z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div data-sidebar="footer" className="flex flex-col items-center justify-center gap-2 px-3">
            {!loading && (
              <>
                {user ? (
                  <div className="flex flex-col items-center gap-2 w-full relative" ref={menuRef}>
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center gap-2 px-3 py-2 glass rounded-lg border border-border/50 w-full hover:bg-accent/30 transition-all duration-200 shadow-premium hover-lift"
                    >
                      <div className="w-7 h-7 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="size-3.5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground truncate flex-1 text-left text-sm">
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
                        
                        <div className="absolute bottom-full left-3 right-3 mb-2 glass border border-border/50 rounded-lg shadow-premium-lg p-2 z-50">
                          <div className="px-3 py-2 border-b border-border/30">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-primary/20 rounded-lg flex items-center justify-center">
                                <User className="size-3.5 text-primary" />
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
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50 rounded-md transition-all duration-200 font-medium"
                            >
                              <LayoutDashboard className="size-3.5" />
                              Dashboard
                            </button>

                            <button
                              onClick={() => {
                                setShowProfileMenu(false);
                                console.log('Navigate to Upgrade');
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50 rounded-md transition-all duration-200 font-medium"
                            >
                              <Crown className="size-3.5" />
                              Upgrade
                            </button>

                            <button
                              onClick={() => {
                                setShowProfileMenu(false);
                                console.log('Navigate to Settings');
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50 rounded-md transition-all duration-200 font-medium"
                            >
                              <Settings className="size-3.5" />
                              Settings
                            </button>

                            <button
                              onClick={() => {
                                setShowProfileMenu(false);
                                console.log('Navigate to Help');
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/50 rounded-md transition-all duration-200 font-medium"
                            >
                              <HelpCircle className="size-3.5" />
                              Help
                            </button>
                          </div>

                          <div className="border-t border-border/30 my-1"></div>

                          <div className="py-1">
                            <button
                              onClick={handleSignOut}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md transition-all duration-200 font-medium"
                            >
                              <LogOut className="size-3.5" />
                              Sign out
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <a className="btn-premium relative inline-flex items-center justify-center whitespace-nowrap text-sm transition-all duration-200 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 mx-1 mb-4 w-full gap-2 rounded-lg font-medium shadow-premium hover-lift" href="/signup">
                    Sign Up
                    <LogIn className="size-4" />
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;