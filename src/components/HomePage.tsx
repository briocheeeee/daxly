import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import TopNavigation from './TopNavigation';
import HeroSection from './HeroSection';
import ProjectGrid from './ProjectGrid';

const HomePage = () => {
  return (
    <div className="dark" style={{ colorScheme: 'dark' }}>
      <div style={{ '--sidebar-width': '15rem', '--sidebar-width-icon': '3rem' }} className="group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex w-full h-full min-h-[calc(100vh-env(safe-area-inset-bottom)-env(safe-area-inset-top))] overflow-hidden" data-vaul-drawer-wrapper="true">
        <Sidebar />
        <main className="bg-background relative flex flex-1 flex-col peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm min-h-auto overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <div className="relative flex min-h-screen w-full">
              {/* Precise Background - No Color Changes */}
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
              
              <Header />
              <TopNavigation />
              
              <div className="relative flex-1 overflow-hidden" style={{ overflow: 'hidden auto', zIndex: 0, cursor: 'auto' }}>
                <HeroSection />
                <ProjectGrid />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;