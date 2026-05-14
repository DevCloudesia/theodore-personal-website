import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Terminal, Activity, Database, Cpu } from 'lucide-react';

const projects = [
  {
    id: "101",
    title: "Real Neptwo Survival",
    scratchId: "1184013969",
    status: "OPTIMIZED",
    version: "2.4.1",
    description: "An Undertale-inspired survival engine where you navigate complex bullet patterns. Features high-intensity combat mechanics and rhythmic movement challenges."
  },
  {
    id: "102",
    title: "Planet Laser Fight",
    scratchId: "1178758905",
    status: "STABLE",
    version: "1.0.8",
    description: "A large-scale orbital simulation involving multiple celestial bodies from our Solar System engaged in tactical laser combat. Features physics-based movements and planetary gravity effects."
  }
];

export const Projects: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3 uppercase tracking-[0.3em]">Project Terminal</h2>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto rounded-full" />
        <p className="mt-4 text-blue-400/60 text-xs font-mono uppercase">Accessing secure code repositories...</p>
      </div>

      <div className="flex flex-col gap-16">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Project Header Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 px-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Terminal className="text-blue-400" size={16} />
                  <span className="text-blue-500/80 text-[10px] font-mono tracking-widest uppercase">Project_Module_{project.id}</span>
                </div>
                <h3 className="text-4xl font-black text-white tracking-tight">{project.title}</h3>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <span className="block text-[8px] text-blue-500/50 uppercase font-bold tracking-tighter text-right">Status</span>
                  <span className="text-blue-400 text-xs font-mono flex items-center gap-1">
                    <Activity size={10} className="animate-pulse" /> {project.status}
                  </span>
                </div>
                <div className="text-right border-l border-blue-900/50 pl-4">
                  <span className="block text-[8px] text-blue-500/50 uppercase font-bold tracking-tighter text-right">Firmware</span>
                  <span className="text-blue-400 text-xs font-mono">v{project.version}</span>
                </div>
              </div>
            </div>
            
            {/* Main Terminal Frame */}
            <div className="p-2 md:p-6 rounded-[40px] bg-blue-950/20 border border-blue-500/20 backdrop-blur-sm shadow-2xl relative group">
              {/* Scratch Embed Container */}
              <div className="aspect-video w-full bg-black rounded-[24px] border border-blue-900/50 overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] relative">
                <iframe
                  title={project.title}
                  src={`https://scratch.mit.edu/projects/${project.scratchId}/embed`}
                  width="100%"
                  height="100%"
                  scrolling="no"
                  allowFullScreen
                  className="w-full h-full relative z-10 border-0"
                />
                
                {/* CRT Scanline Overlay Effect */}
                <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
              </div>

              {/* Description & Metadata Footer */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                <div className="md:col-span-2">
                  <h4 className="text-[10px] text-blue-500/50 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Database size={10} /> Data Log
                  </h4>
                  <p className="text-blue-200/70 text-sm leading-relaxed font-light italic">
                    "{project.description}"
                  </p>
                </div>
                <div className="flex flex-col justify-end items-end gap-4">
                  <a 
                    href={`https://scratch.mit.edu/projects/${project.scratchId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 group"
                  >
                    DEPLOY FULLSCREEN <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <span className="text-[9px] text-blue-500/40 font-mono">LINK_ADDR: SCRATCH_ID_{project.scratchId}</span>
                </div>
              </div>

              {/* Decorative Corner Brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-500/30 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-500/30 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-500/30 rounded-br-xl pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-xl mx-auto p-6 rounded-[32px] bg-blue-600/5 border border-dashed border-blue-500/20 text-center">
        <Cpu className="mx-auto text-blue-500/40 mb-3" size={20} />
        <p className="text-blue-400/60 text-[10px] uppercase tracking-widest font-mono">
          System Standby... Awaiting further deployment cycles from Sector Scratch.mit.edu
        </p>
      </div>
    </div>
  );
};