import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectGrid = () => {
  const projects = [
    {
      id: 'b90rdpka816',
      title: 'exness broker platform',
      imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
      remixCount: 0
    },
    {
      id: 'sr6ir948dx7',
      title: 'video editing platform',
      imageUrl: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400',
      remixCount: 0
    },
    {
      id: '055osvtvhwr',
      title: 'secureme cyber hygiene',
      imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
      remixCount: 0
    },
    {
      id: '8jy48gsf76y',
      title: 'keymote app website',
      imageUrl: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
      remixCount: 1
    },
    {
      id: 'd38xgtqaneg',
      title: 'wordle game clone',
      imageUrl: 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=400',
      remixCount: 2
    },
    {
      id: '167u8gwrli7',
      title: 'game vault platform',
      imageUrl: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
      remixCount: 0
    },
    {
      id: 'wq5f8gapnoa',
      title: 'taskminter presale landing',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      remixCount: 0
    },
    {
      id: 'k0wk3r2pfg5',
      title: 'deriv lite tools',
      imageUrl: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
      remixCount: 0
    },
    {
      id: 'ccs3vb5ct8n',
      title: 'how can i help?',
      imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      remixCount: 1
    }
  ];

  return (
    <div className="relative mt-[450px] px-4 pb-16">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground mb-3">
            Recent Projects
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Explore what others have built with Daxly
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div key={project.id} className="w-full h-72">
              <ProjectCard
                id={project.id}
                title={project.title}
                imageUrl={project.imageUrl}
                remixCount={project.remixCount}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;