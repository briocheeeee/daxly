import React, { useState, useEffect } from 'react';
import { ExternalLink, Plus, PanelLeft } from 'lucide-react';
import ChatPanel from './ChatPanel';

const Header = () => {
  const [showChatPanel, setShowChatPanel] = useState(false);

  // Mouse hover detection for left edge
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show panel when mouse is within 10px of left edge
      if (e.clientX <= 10) {
        setShowChatPanel(true);
      }
    };

    // Add event listener
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="h-16 fixed left-4 top-0 z-10 flex items-center gap-3 md:left-12">
        <a className="flex items-center group" href="/">
          <div style={{ opacity: 1 }} className="transition-all duration-200 group-hover:scale-105">
            <span className="font-display text-foreground text-2xl">Daxly</span>
          </div>
        </a>
        <button 
          onClick={() => setShowChatPanel(!showChatPanel)}
          className="btn-premium relative inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm transition-all duration-200 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent/50 hover:text-foreground active:bg-accent hover:border-border/50 border border-transparent text-foreground size-8 shrink-0 rounded-lg shadow-premium hover-lift"
        >
          <PanelLeft className="size-4" />
        </button>
      </div>

      {/* Chat Panel */}
      <ChatPanel isOpen={showChatPanel} onClose={() => setShowChatPanel(false)} />
    </>
  );
};

export default Header;