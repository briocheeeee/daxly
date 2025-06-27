import React from 'react';
import { Shuffle, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  imageUrl: string;
  remixCount: number;
  style?: React.CSSProperties;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, imageUrl, remixCount, style }) => {
  return (
    <div style={style}>
      <div id={`card-${id}`} data-spring-card="true" className="group relative size-full overflow-hidden bg-transparent">
        <div data-mask="true" className="absolute inset-0 rounded-xl" style={{ opacity: 1 }}></div>
        <img 
          data-screenshot="true" 
          data-spring-card-item="true" 
          alt={title} 
          loading="lazy" 
          decoding="async" 
          className="size-full max-h-[70%] rounded-xl border border-border/30 object-cover object-top shadow-premium group-hover:shadow-premium-lg transition-all duration-300 hover-lift" 
          src={imageUrl} 
          style={{ display: 'flex' }}
        />
        
        {/* Buttons positioned above the title */}
        <div className="absolute top-[70%] left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button className="btn-premium relative inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 glass text-foreground hover:bg-accent/50 hover:-translate-y-1 hover:shadow-premium-lg px-3 py-2 h-8 flex-1 gap-2 rounded-lg border border-border/50 text-sm backdrop-blur-sm transform font-medium shadow-premium" data-interactive="true">
            <Shuffle className="size-3.5" />
            Remix
          </button>
          <button className="btn-premium relative inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-1 hover:shadow-premium-lg px-3 py-2 h-8 flex-1 gap-2 rounded-lg border border-primary/20 text-sm backdrop-blur-sm transform font-medium shadow-premium" data-interactive="true">
            <ArrowUpRight className="size-3.5" />
            See Project
          </button>
        </div>
        
        {/* Title positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="glass rounded-lg p-2 border border-border/30 shadow-premium">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium text-foreground truncate text-sm">{title}</h3>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Shuffle className="size-3" />
                <span className="text-xs font-medium">{remixCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;